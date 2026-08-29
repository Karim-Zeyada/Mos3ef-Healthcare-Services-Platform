/** @format */

import axios from "axios";

const getGeminiApiUrl = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("VITE_GEMINI_API_KEY is not configured in .env file.");
    return null;
  }
  return `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
};

const SYSTEM_INSTRUCTION = `
أنت "مسعف AI" (Mos3ef AI)، المساعد الطبي الذكي لمنصة الرعاية الصحية المصرية "مسعف (Mos3ef)".

مهمتك ومسؤولياتك:
1. الاستماع للأعراض التي يذكرها المريض وتحليلها بدقة وسرعة.
2. تقييم درجة الخطورة والفرز الطبي (Medical Triage):
   - [حالة طوارئ قصوى 🔴]: مثل ألم الصدر الشديد، اشتباه الجلطات (أعراض FAST)، النزيف الحاد، صعوبة التنفس الشديدة، فقدان الوعي، تسمم دوائي. (وجّه المريض فوراً للاتصال بـ 123 الإسعاف أو التوجه لأقرب قسم طوارئ).
   - [رعاية عاجلة 🟡]: مثل الكسور، آلام البطن الحادة، الحمى المرتفعة، الجروح العميقة.
   - [استشارة روتينية 🟢]: مثل الفحوصات الدورية، الاستشارات العامة، الأدوية، والتحاليل.
3. توجيه المريض للتخصص الطبي المناسب من بين الـ 18 تخصصاً المتوفرة في منصة مسعف:
   (غرفة الطوارئ ER، العناية المركزة ICU، حضانة الأطفال NICU، بنك الدم، العمليات، قسم الولادة، قسم الأطفال، الأشعة، المعمل، الصيدلية، العيادات الخارجية، الإسعاف، العلاج الطبيعي، الأسنان، أمراض القلب، الغسيل الكلوي).
4. تقديم خطوات إسعافات أولية مبسطة وعملية إذا كان الموقف يتطلب ذلك.
5. أسلوبك: دافئ، مطمئن، احترافي، وموجز، باللغة العربية الفصحى المبسطة مع استخدام النقاط لسهولة القراءة في نافذة المحادثة.
6. اختتم دائماً بتنبيه لطيف: "هذه الإرشادات للتوجيه الطبي السريع ولا تغني عن استشارة الطبيب المختص أو الاتصال بالإسعاف 123 في الطوارئ".
`;

/**
 * Send messages history to Gemini 2.5 Flash API
 * @param {Array<{role: string, text: string}>} history
 * @returns {Promise<string>}
 */
export async function sendChatMessageToGemini(history) {
  try {
    const apiUrl = getGeminiApiUrl();
    if (!apiUrl) {
      return "عذراً، لم يتم ضبط مفتاح الذكاء الاصطناعي (VITE_GEMINI_API_KEY). يرجى إضافته في ملف .env بالواجهة الأمامية.";
    }

    const formattedContents = [
      {
        role: "user",
        parts: [{ text: `[System Medical Instructions]: ${SYSTEM_INSTRUCTION}` }],
      },
      {
        role: "model",
        parts: [
          {
            text: "أهلاً بك! أنا مسعف AI، مساعدك الطبي الذكي. أنا هنا لمساعدتك في تقييم الأعراض وتوجيهك للتخصص الطبي المناسب أو خطوات الإسعافات الأولية. كيف يمكنني مساعدتك اليوم؟",
          },
        ],
      },
      ...history.map((msg) => ({
        role: msg.from === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      })),
    ];

    const response = await axios.post(
      apiUrl,
      {
        contents: formattedContents,
        generationConfig: {
          temperature: 0.4,
          topP: 0.9,
          maxOutputTokens: 800,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const candidates = response.data?.candidates;
    if (candidates && candidates.length > 0) {
      const reply = candidates[0].content?.parts?.[0]?.text;
      return (
        reply ||
        "عذراً، لم أتمكن من معالجة الرد حالياً. يرجى إعادة المحاولة أو الاتصال بالطوارئ 123 إن كانت حالتك حرجة."
      );
    }

    return "عذراً، حدث خطأ أثناء الاتصال بالمساعد الطبي.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    if (error.response?.status === 400 || error.response?.status === 403) {
      return "عذراً، هناك مشكلة في مفتاح الاتصال بخدمة الذكاء الاصطناعي. يمكنك تصفح دليل الخدمات أو الاتصال بـ 123 للطوارئ.";
    }
    return "عذراً، تعذر الاتصال بالمساعد الطبي حالياً. يرجى التحقق من اتصال الإنترنت أو المحاولة لاحقاً.";
  }
}
