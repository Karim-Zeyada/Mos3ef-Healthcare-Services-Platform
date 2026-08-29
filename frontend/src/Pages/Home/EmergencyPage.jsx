/** @format */

import React, { useState, useEffect, useRef } from "react";
import {
  PhoneCall,
  MapPin,
  Share2,
  Navigation,
  HeartPulse,
  Flame,
  ShieldAlert,
  Baby,
  Activity,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Play,
  Square,
  Stethoscope,
  Clock,
  Hospital,
  Compass,
  Zap,
  CheckCircle2,
  XCircle,
  ExternalLink,
  RotateCcw,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import axios from "axios";
import { Link } from "react-router-dom";

// Navigation Tabs with Lucide Icons
const navTabs = [
  { id: "radar", label: "أقرب طوارئ", icon: MapPin },
  { id: "hotlines", label: "أرقام الطوارئ", icon: PhoneCall },
  { id: "firstaid", label: "الإسعافات الأولية", icon: HeartPulse },
  { id: "triage", label: "فرز الأعراض", icon: Activity },
];

// Egyptian Emergency Hotlines Data
const emergencyHotlines = [
  {
    id: "ambulance",
    number: "123",
    title: "هيئة الإسعاف المصرية",
    subtitle: "Ambulance Authority",
    description: "للحالات الحرجة، الحوادث، ونقل الحالات الطارئة بسيارات مجهزة بالعناية المركزة",
    tag: "طوارئ عامة",
    icon: PhoneCall,
    color: "text-rose-600 bg-rose-50 border-rose-100",
  },
  {
    id: "moh-emergency",
    number: "137",
    title: "طوارئ الصحة وغرف الرعاية والحضانات",
    subtitle: "MOH Critical Care & ICU",
    description: "البحث عن أسرّة رعاية مركزة شاغرة، حضانات أطفال مبتسرين، وبنوك الدم على مستوى الجمهورية",
    tag: "رعاية مركزة وحضانات",
    icon: Activity,
    color: "text-blue-600 bg-blue-50 border-blue-100",
  },
  {
    id: "poison-center",
    number: "16328",
    title: "مركز علاج التسمم وعضات الحيوانات",
    subtitle: "Poison Control Center",
    description: "استشارات التسمم الدوائي والغذائي، لدغات العقارب والثعابين، وتوفر الأمصال فوراً",
    tag: "تسمم وأمصال",
    icon: ShieldAlert,
    color: "text-amber-600 bg-amber-50 border-amber-100",
  },
  {
    id: "children-emergency",
    number: "126",
    title: "طوارئ ومستشفيات الأطفال",
    subtitle: "Pediatric Emergency",
    description: "طوارئ طب الأطفال، التشنجات الحرارية، وصعوبات التنفس الحادة للأطفال والرضع",
    tag: "طوارئ الأطفال",
    icon: Baby,
    color: "text-teal-600 bg-teal-50 border-teal-100",
  },
  {
    id: "civil-defense",
    number: "180",
    title: "المطافئ والحماية المدنية",
    subtitle: "Civil Defense & Fire",
    description: "حوادث الحريق، انهيارات المباني، والإنقاذ النهري والبري في حالات الكوارث",
    tag: "إنقاذ وحرائق",
    icon: Flame,
    color: "text-orange-600 bg-orange-50 border-orange-100",
  },
  {
    id: "police-emergency",
    number: "122",
    title: "شرطة النجدة",
    subtitle: "Emergency Police",
    description: "للبلاغات الأمنية الطارئة، الحوادث الجنائية، وفتح الطرق لسيارات الإسعاف",
    tag: "أمن ونجدة",
    icon: ShieldCheck,
    color: "text-slate-600 bg-slate-50 border-slate-100",
  },
];

// First Aid Life Saving Guides
const firstAidGuides = [
  {
    id: "cpr",
    title: "الإنعاش القلبي (CPR)",
    shortDesc: "توقف النبض والتنفس المفاجئ",
    icon: HeartPulse,
    badge: "إنقاذ حياة فوري",
    isMetronomeCapable: true,
    steps: [
      {
        num: 1,
        title: "فحص الاستجابة والتنفس",
        desc: "تأكد من أمان المكان، اضرب برفق على كتف المصاب. إذا لم يستجب ولا يتنفس، اطلب الإسعاف 123 فوراً.",
      },
      {
        num: 2,
        title: "وضع اليدين في منتصف الصدر",
        desc: "ضع كعب يدك في منتصف القفص الصدري، وشبك أصابع اليد الأخرى فوقها مع استقامة الذراعين تماماً.",
      },
      {
        num: 3,
        title: "الضغط المتواصل (100 - 120 ضغطة/دقيقة)",
        desc: "اضغط بعمق 5-6 سم بقوة وسرعة. نفّذ 30 ضغطة متتالية تليها نفستان إنقاذيتان، أو استمر بالضغط المستمر.",
      },
    ],
    dos: [
      "استمر في الضغط دون توقف حتى وصول الإسعاف أو استعادة المصاب للوعي.",
      "اضغط بمعدل إيقاع ثابت بين 100 إلى 120 ضغطة في الدقيقة.",
    ],
    donts: [
      "لا تتردد في بدء الضغطات — كل ثانية تصنع فارقاً حاسماً لخلايا المخ.",
      "لا تثنِ مرفقيك أثناء الضغط، بل استخدم ثقل جذعك العلوي.",
    ],
  },
  {
    id: "choking",
    title: "الغصة والاختناق",
    shortDesc: "انسداد مجرى الهواء بجسم غريب",
    icon: Activity,
    badge: "مناورة هايمليخ",
    isMetronomeCapable: false,
    steps: [
      {
        num: 1,
        title: "تشجيع السعال أولاً",
        desc: "إذا كان المصاب قادراً على السعال أو الكلام، شجعه على الاستمرار. إذا كان يمسك بحلقه وعاجزاً عن التنفس، تدخل فوراً.",
      },
      {
        num: 2,
        title: "5 ضربات بين الكتفين",
        desc: "أمِل المصاب للأمام واضربه 5 ضربات حازمة بكعب يدك بين لوحي الكتف.",
      },
      {
        num: 3,
        title: "5 ضغطات بطنية سريعة",
        desc: "قف خلفه، ضع قبضة يدك فوق السرة مباشرة، وأمسكها باليد الأخرى واضغط للداخل وللأعلى بقوة.",
      },
    ],
    dos: [
      "كرر التناوب بين 5 ضربات ظهر و 5 ضغطات بطن حتى يخرج الجسم الغريب.",
      "للرضيع: اضغط بإصبعين فقط في منتصف الصدر مع دعم رأسه لأسفل.",
    ],
    donts: [
      "لا تدخل أصابعك في حلق المصاب عشوائياً إذا لم يكن الجسم مرئياً بوضوح.",
    ],
  },
  {
    id: "bleeding",
    title: "النزيف الحاد",
    shortDesc: "نزف مستمر وجروح عميقة",
    icon: AlertCircle,
    badge: "ضغط مباشر",
    isMetronomeCapable: false,
    steps: [
      {
        num: 1,
        title: "الضغط المباشر الثابت",
        desc: "ضع قطعة قماش نظيفة أو شاش معقم واضغط بقوة مستمرة على موضع النزيف دون إرخاء.",
      },
      {
        num: 2,
        title: "رفع العضو المصاب",
        desc: "ارفع الذراع أو الساق المصابة أعلى من مستوى القلب لتقليل تدفق الدم، إن لم يكن هناك كسر.",
      },
      {
        num: 3,
        title: "عدم نزع الضمادات المشبعة",
        desc: "إذا امتلأت الضمادة بالدم، لا تنزعها مطلقاً بل ضع ضمادة إضافية فوقها واستمر بالضغط.",
      },
    ],
    dos: [
      "حافظ على دفء المصاب بتغطيته لتقليل خطر حدوث صدمة هبوط الدورة الدموية.",
    ],
    donts: [
      "لا تنزع أي جسم كبير مغروز بالجرح (كالزجاج أو السكين) بل ثبته بالضمادات حوله.",
    ],
  },
  {
    id: "burns",
    title: "الحروق",
    shortDesc: "إصابات الحرارة والمواد الكيميائية",
    icon: Flame,
    badge: "ماء فاتر فقط",
    isMetronomeCapable: false,
    steps: [
      {
        num: 1,
        title: "التبريد الفوري بالماء الفاتر",
        desc: "عرّض موضع الحرق لماء جارٍ فاتر (غير مثلج) لمدة 10 إلى 15 دقيقة متواصلة لوقف تلف الأنسجة.",
      },
      {
        num: 2,
        title: "نزع الإكسسوارات والملابس الفضفاضة",
        desc: "انزع الخواتم والساعات والملابس غير الملتصقة بسرعة قبل حدوث أي انتفاخ.",
      },
      {
        num: 3,
        title: "تغطية الحرق بغطاء معقم",
        desc: "غطِّ الحرق بشاش معقم غير لاصق أو كيس بلاستيكي نظيف لحمايته وتخفيف الألم.",
      },
    ],
    dos: [
      "اطلب الطوارئ 123 فوراً إذا كان الحرق يشمل الوجه، المفاصل، أو مساحة واسعة.",
    ],
    donts: [
      "لا تضع الثلج، معجون الأسنان، الزيوت، أو الدقيق نهائياً لتجنب حبس الحرارة والالتهابات.",
      "لا تفقع الفقاعات الجلدية لأنها حماية طبيعية ضد العدوى.",
    ],
  },
  {
    id: "stroke",
    title: "السكتة الدماغية",
    shortDesc: "اختبار FAST للجلطات",
    icon: Stethoscope,
    badge: "الوقت حاسم",
    isMetronomeCapable: false,
    steps: [
      {
        num: 1,
        title: "F - الوجه (Face)",
        desc: "اطلب منه الابتسام: هل هناك ميل أو ارتخاء في جانب من الوجه؟",
      },
      {
        num: 2,
        title: "A - الذراعين (Arms)",
        desc: "اطلب منه رفع كلتا يديه: هل تسقط إحدى الذراعين لأسفل أو يشعر بضعف؟",
      },
      {
        num: 3,
        title: "S - النطق (Speech)",
        desc: "اطلب منه تكرار جملة: هل كلامه ثقيل، متلعثم، أو غير مفهوم؟",
      },
      {
        num: 4,
        title: "T - الوقت (Time)",
        desc: "اتصل بـ 123 فوراً وسجل وقت ظهور الأعراض، فالعلاج الفعال يكون في الساعات الأولى.",
      },
    ],
    dos: [
      "سجل الدقيقة التي بدأت فيها الأعراض بدقة وأبلغ بها الطبيب فوراً.",
    ],
    donts: [
      "لا تعطِ المصاب أسبرين أو طعاماً أو شراباً قبل الفحص بالأشعة المقطعية.",
    ],
  },
  {
    id: "seizures",
    title: "التشنجات والصرع",
    shortDesc: "حركات لا إرادية وفقدان وعي",
    icon: Activity,
    badge: "حماية الرأس",
    isMetronomeCapable: false,
    steps: [
      {
        num: 1,
        title: "تأمين المحيط وحماية الرأس",
        desc: "أبعد الأجسام الصلبة والحادة، وضع وسادة أو قماشاً ناعماً تحت رأس المصاب.",
      },
      {
        num: 2,
        title: "حساب مدة النوبة بالساعة",
        desc: "إذا استمر التشنج أكثر من 5 دقائق، اتصل بالإسعاف 123 فوراً.",
      },
      {
        num: 3,
        title: "وضع الإفاقة بعد انتهاء النوبة",
        desc: "أدر المصاب بلطف على جانبه لضمان بقاء مجرى الهواء مفتوحاً.",
      },
    ],
    dos: [
      "فك الأزرار والملابس الضيقة حول الرقبة لتسهيل التنفس.",
    ],
    donts: [
      "لا تضع أي شيء في فم المصاب نهائياً (لن يبلع لسانه، ووضع شيء قد يكسر أسنانه).",
      "لا تقيد حركته أو تضغط على أطرافه أثناء النوبة.",
    ],
  },
];

// Quick Symptom Triage Data
const triageSymptoms = [
  {
    id: "chest-pain",
    label: "ألم ضاغط في الصدر مع ضيق تنفس وتعرق",
    level: "red",
    recommendation: "اشتباه أزمة قلبية حادة! اتصل بـ 123 فوراً وتوجه لأقرب طوارئ قسطرة قلبية.",
    urgencyText: "طوارئ قصوى",
  },
  {
    id: "stroke-signs",
    label: "ثقل مفاجئ بالنطق، ميل بالوجه، أو ضعف باليد",
    level: "red",
    recommendation: "اشتباه سكتة دماغية! توجه فوراً لأقرب مركز طوارئ مجهز بأشعة مقطعية ومذيبات الجلطة.",
    urgencyText: "طوارئ قصوى",
  },
  {
    id: "severe-bleed",
    label: "نزيف حاد مستمر لا يتوقف بالضغط أو قيء دموي",
    level: "red",
    recommendation: "نزيف حاد! اضغط على الجرح واطلب الإسعاف 123 فوراً لنقلك لأقرب بنك دم وجراحة.",
    urgencyText: "طوارئ قصوى",
  },
  {
    id: "infant-fever",
    label: "حمى شديدة لرضيع (أقل من 3 أشهر) مع خمول أو تشنج",
    level: "red",
    recommendation: "طوارئ أطفال مبتسرين! اتصل بـ 126 أو 137 لنقله لأقرب مستشفى أطفال وحضانات.",
    urgencyText: "طوارئ أطفال",
  },
  {
    id: "fracture",
    label: "اشتباه كسر عظمي مع ألم شديد وتورم في الطرف",
    level: "yellow",
    recommendation: "تثبيت الطرف بجبيرة مؤقتة والتوجه لقسم طوارئ العظام والأشعة.",
    urgencyText: "رعاية عاجلة",
  },
  {
    id: "abdominal-pain",
    label: "ألم بطني مفاجئ حاد ومستمر (اشتباه زائدة دودية)",
    level: "yellow",
    recommendation: "اشتباه التهاب زائدة أو مغص كلوي! امتنع عن الأكل وتوجه لجراحة الطوارئ.",
    urgencyText: "رعاية عاجلة",
  },
];

export const EmergencyPage = () => {
  // Navigation Tabs State
  const [activeTab, setActiveTab] = useState("radar");

  // GPS Location State
  const [coords, setCoords] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [copiedLocation, setCopiedLocation] = useState(false);
  const [copiedHotline, setCopiedHotline] = useState(null);

  // Nearby ER Hospitals State
  const [emergencyHospitals, setEmergencyHospitals] = useState([]);
  const [erLoading, setErLoading] = useState(false);

  // First Aid State
  const [selectedGuideId, setSelectedGuideId] = useState("cpr");
  const [isMetronomeActive, setIsMetronomeActive] = useState(false);
  const [beatCount, setBeatCount] = useState(0);
  const [audioMuted, setAudioMuted] = useState(false);

  // Triage State
  const [selectedTriage, setSelectedTriage] = useState(null);

  // Audio Context for CPR Metronome Beeps
  const audioContextRef = useRef(null);
  const metronomeIntervalRef = useRef(null);

  // Fetch Current GPS Coordinates
  const fetchCurrentLocation = () => {
    if (!navigator.geolocation) return;

    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setCoords({ lat, lon });
        setLocationLoading(false);
        fetchNearbyEmergency(lat, lon);
      },
      () => {
        setLocationLoading(false);
        fetchNearbyEmergency();
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  // Fetch Nearby Emergency Rooms
  const fetchNearbyEmergency = async (lat, lon) => {
    try {
      setErLoading(true);
      const params = { category: "EmergencyRoom" };
      if (lat && lon) {
        params.lat = lat;
        params.lon = lon;
      }

      const res = await axios.get("http://localhost:5000/api/Services/search", {
        params,
      });

      const list = res.data?.data || [];
      list.sort((a, b) => (a.distanceKm || 999) - (b.distanceKm || 999));
      setEmergencyHospitals(list.slice(0, 6));
    } catch (err) {
      console.error("Error fetching ER services:", err);
    } finally {
      setErLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentLocation();
  }, []);

  // CPR Metronome Beep
  const playBeep = () => {
    if (audioMuted) return;
    try {
      if (!audioContextRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) audioContextRef.current = new AudioContext();
      }
      const ctx = audioContextRef.current;
      if (ctx && ctx.state === "suspended") ctx.resume();
      if (ctx) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      }
    } catch (e) {
      console.log("Audio play error", e);
    }
  };

  // CPR Metronome Interval
  useEffect(() => {
    if (isMetronomeActive) {
      const intervalMs = Math.round(60000 / 110);
      metronomeIntervalRef.current = setInterval(() => {
        setBeatCount((prev) => (prev >= 30 ? 1 : prev + 1));
        playBeep();
      }, intervalMs);
    } else {
      if (metronomeIntervalRef.current) clearInterval(metronomeIntervalRef.current);
      setBeatCount(0);
    }

    return () => {
      if (metronomeIntervalRef.current) clearInterval(metronomeIntervalRef.current);
    };
  }, [isMetronomeActive, audioMuted]);

  // Copy GPS SOS message
  const handleCopyLocation = () => {
    const lat = coords?.lat || "31.2001";
    const lon = coords?.lon || "29.9187";
    const mapUrl = `https://maps.google.com/?q=${lat},${lon}`;
    const sosMessage = `نداء استغاثة عاجل عبر منصة مسعف: أنا بحاجة لمساعدة طبية طارئة. موقعي على الخريطة: ${mapUrl}`;

    navigator.clipboard.writeText(sosMessage);
    setCopiedLocation(true);
    setTimeout(() => setCopiedLocation(false), 2500);
  };

  // Share via WhatsApp
  const handleShareWhatsApp = () => {
    const lat = coords?.lat || "31.2001";
    const lon = coords?.lon || "29.9187";
    const mapUrl = `https://maps.google.com/?q=${lat},${lon}`;
    const sosMessage = encodeURIComponent(
      `نداء استغاثة عاجل عبر منصة مسعف: أنا بحاجة لمساعدة طبية طارئة. موقعي على الخريطة: ${mapUrl}`
    );
    window.open(`https://wa.me/?text=${sosMessage}`, "_blank");
  };

  // Copy hotline number
  const handleCopyNumber = (num, id) => {
    navigator.clipboard.writeText(num);
    setCopiedHotline(id);
    setTimeout(() => setCopiedHotline(null), 2000);
  };

  const selectedGuide = firstAidGuides.find((g) => g.id === selectedGuideId) || firstAidGuides[0];

  return (
    <div className="pt-24 pb-20 w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 font-Cairo [direction:rtl]">
      {/* 🌟 Top Clean Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold mb-3">
          <HeartPulse className="w-3.5 h-3.5" />
          <span>مركز الاستجابة الطبية السريعة</span>
        </div>
        <h1 className="text-2xl md:text-4xl font-bold text-Blue-900 mb-2">
          طوارئ مسعف
        </h1>
        <p className="text-gray-500 text-sm md:text-base leading-relaxed">
          خط المساعدة الفوري للحالات الحرجة، رادار المستشفيات القريبة، ودليل الإسعافات الأولية
        </p>
      </div>

      {/* 🚀 2 Instant Priority Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Call Ambulance 123 */}
        <div className="relative bg-gradient-to-br from-rose-600 to-red-700 rounded-3xl p-6 text-white shadow-sm flex items-center justify-between gap-4 overflow-hidden">
          <div className="relative z-10">
            <span className="text-xs font-medium text-rose-100 mb-1 inline-block">
              الخط الساخن المباشر 24/7
            </span>
            <h2 className="text-xl md:text-2xl font-bold mb-1">
              هيئة الإسعاف المصرية
            </h2>
            <p className="text-xs text-rose-100/90 mb-4 max-w-xs">
              للحالات الحرجة ونقل المصابين بسيارات مجهزة بالعناية المركزة
            </p>
            <a
              href="tel:123"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-white text-rose-700 hover:bg-rose-50 font-bold text-base shadow-xs transition-all active:scale-95"
            >
              <PhoneCall className="w-4 h-4 text-rose-600" />
              <span>اتصل الآن (123)</span>
            </a>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
            <PhoneCall className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Share GPS Location SOS */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-xs font-semibold text-Blue">
                مشاركة موقع الاستغاثة (Live GPS)
              </span>
              <button
                onClick={fetchCurrentLocation}
                disabled={locationLoading}
                className="text-xs text-gray-400 hover:text-Blue flex items-center gap-1 transition-colors"
              >
                <RotateCcw className={`w-3.5 h-3.5 ${locationLoading ? "animate-spin" : ""}`} />
                تحديث
              </button>
            </div>
            <h2 className="text-lg md:text-xl font-bold text-Blue-900 mb-1">
              إرسال إحداثياتك للمسعف
            </h2>
            <p className="text-xs text-gray-500 mb-4">
              مشاركة موقعك المباشر برابط خريطة دقيق لاختصار وقت وصول النجدة
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleShareWhatsApp}
              className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-2xl py-2.5 text-sm font-bold shadow-xs"
            >
              <Share2 className="w-4 h-4 ml-1.5" />
              واتساب SOS
            </Button>
            <Button
              variant="outline"
              onClick={handleCopyLocation}
              className="px-4 border-slate-200 text-slate-700 hover:bg-slate-50 rounded-2xl py-2.5 text-sm font-semibold"
            >
              {copiedLocation ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600 ml-1" />
                  تم النسخ
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 ml-1" />
                  نسخ الرابط
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* 🧭 Professional Vector Segmented Control */}
      <div className="flex items-center justify-center p-1.5 bg-slate-100/90 rounded-2xl mb-8 max-w-2xl mx-auto border border-slate-200/80 shadow-xs">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs md:text-sm font-semibold transition-all duration-200 ${
                isSelected
                  ? "bg-white text-Blue-900 shadow-xs font-bold scale-[1.01]"
                  : "text-slate-600 hover:text-Blue-900 hover:bg-white/50"
              }`}
            >
              <Icon className={`w-4 h-4 transition-colors ${isSelected ? "text-Blue" : "text-slate-400"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 📑 Tab Content Area */}
      <div className="transition-all duration-300">
        {/* TAB 1: 📍 Nearest ER Radar */}
        {activeTab === "radar" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-Blue-900 text-lg md:text-xl">
                  المستشفيات المجهزة بالطوارئ الأقرب إليك
                </h3>
                <p className="text-xs text-gray-500">
                  مرتبة حسب المسافة الجغرافية من موقعك الحالي
                </p>
              </div>
              <Link
                to="/services"
                className="text-xs font-semibold text-Blue hover:underline inline-flex items-center gap-1"
              >
                <span>جميع الخدمات</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            {erLoading ? (
              <div className="py-16 text-center text-Blue text-sm font-semibold">
                جاري البحث عن أقرب أقسام طوارئ...
              </div>
            ) : emergencyHospitals.length === 0 ? (
              <div className="py-12 text-center text-gray-500 bg-white rounded-3xl border border-slate-200">
                لا توجد أقسام طوارئ مسجلة حالياً. اتصل بالإسعاف 123 فوراً.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {emergencyHospitals.map((item, idx) => (
                  <Card
                    key={item.serviceId || idx}
                    className="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[11px] font-bold">
                          طوارئ 24 ساعة
                        </span>
                        {item.distanceKm && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-50 px-2 py-0.5 rounded-md">
                            <MapPin className="w-3 h-3 text-rose-500" />
                            {item.distanceKm.toFixed(1)} كم
                          </span>
                        )}
                      </div>

                      <h4 className="font-bold text-Blue-900 text-base mb-1 line-clamp-1">
                        {item.hospitalName || "مستشفى الطوارئ"}
                      </h4>
                      <p className="text-gray-500 text-xs mb-3 line-clamp-1">
                        {item.name || "قسم الاستقبال والطوارئ"}
                      </p>

                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
                        <Clock className="w-3.5 h-3.5 text-emerald-600" />
                        <span>متاح على مدار الساعة</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                      {item.hospitalPhone || item.phone_Number ? (
                        <a
                          href={`tel:${item.hospitalPhone || item.phone_Number}`}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          <span>اتصال</span>
                        </a>
                      ) : null}

                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                          item.hospitalName || "Hospital"
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                        title="الاتجاهات"
                      >
                        <Navigation className="w-3.5 h-3.5 text-Blue" />
                        <span>خريطة</span>
                      </a>

                      <Link
                        to={`/service-details/${item.serviceId}`}
                        className="inline-flex items-center justify-center px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-semibold transition-colors"
                      >
                        تفاصيل
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: 📞 Official Egyptian Hotlines */}
        {activeTab === "hotlines" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {emergencyHotlines.map((hotline) => {
              const Icon = hotline.icon;
              const isCopied = copiedHotline === hotline.id;

              return (
                <Card
                  key={hotline.id}
                  className="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">
                        {hotline.tag}
                      </span>
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center border ${hotline.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h4 className="font-bold text-Blue-900 text-base mb-0.5">
                      {hotline.title}
                    </h4>
                    <p className="text-[11px] text-gray-400 font-medium mb-2 [direction:ltr] text-right">
                      {hotline.subtitle}
                    </p>
                    <p className="text-gray-600 text-xs leading-relaxed mb-4 line-clamp-2">
                      {hotline.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                    <a
                      href={`tel:${hotline.number}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-2xl bg-Blue-900 hover:bg-Blue text-white font-bold text-base shadow-xs transition-colors"
                    >
                      <PhoneCall className="w-4 h-4 text-emerald-300" />
                      <span className="[direction:ltr]">{hotline.number}</span>
                    </a>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleCopyNumber(hotline.number, hotline.id)}
                      className="w-10 h-10 rounded-2xl border-slate-200 text-slate-600 hover:bg-slate-50"
                      title="نسخ الرقم"
                    >
                      {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* TAB 3: 🩺 First Aid & CPR */}
        {activeTab === "firstaid" && (
          <div className="space-y-6">
            {/* Guide Pills with Vector Icons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center">
              {firstAidGuides.map((guide) => {
                const isSelected = guide.id === selectedGuideId;
                const Icon = guide.icon;

                return (
                  <button
                    key={guide.id}
                    onClick={() => {
                      setSelectedGuideId(guide.id);
                      if (guide.id !== "cpr") setIsMetronomeActive(false);
                    }}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs md:text-sm font-semibold whitespace-nowrap transition-all border ${
                      isSelected
                        ? "bg-Blue-900 text-white border-Blue-900 shadow-xs font-bold"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? "text-emerald-300" : "text-Blue"}`} />
                    <span>{guide.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Guide Details Container */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700">
                      {selectedGuide.badge}
                    </span>
                    <h3 className="font-bold text-Blue-900 text-xl md:text-2xl">
                      {selectedGuide.title}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-500">
                    {selectedGuide.shortDesc}
                  </p>
                </div>

                {/* CPR Metronome Box */}
                {selectedGuide.isMetronomeCapable && (
                  <div className="flex items-center gap-2 bg-rose-50 border border-rose-100 rounded-2xl p-2.5">
                    <div className="text-center px-2">
                      <div className="text-[10px] text-rose-800 font-bold">إيقاع CPR (110 BPM)</div>
                      <div className="text-xs font-bold text-rose-900">
                        {beatCount} / 30
                      </div>
                    </div>

                    <Button
                      size="sm"
                      onClick={() => setIsMetronomeActive(!isMetronomeActive)}
                      className={`rounded-xl text-xs font-bold ${
                        isMetronomeActive
                          ? "bg-rose-700 text-white animate-pulse"
                          : "bg-rose-600 text-white"
                      }`}
                    >
                      {isMetronomeActive ? (
                        <>
                          <Square className="w-3.5 h-3.5 ml-1" />
                          إيقاف
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 ml-1" />
                          تشغيل
                        </>
                      )}
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setAudioMuted(!audioMuted)}
                      className="w-8 h-8 text-rose-700 hover:bg-rose-100 rounded-xl"
                    >
                      {audioMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </Button>
                  </div>
                )}
              </div>

              {/* Steps */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                {selectedGuide.steps.map((step) => (
                  <div
                    key={step.num}
                    className="bg-slate-50/70 rounded-2xl p-4 border border-slate-100 flex flex-col gap-2"
                  >
                    <div className="w-7 h-7 rounded-xl bg-Blue-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {step.num}
                    </div>
                    <h5 className="font-bold text-Blue-900 text-sm">{step.title}</h5>
                    <p className="text-gray-600 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>

              {/* Do & Don't */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>ما يجب فعله (Do)</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-emerald-950 font-medium">
                    {selectedGuide.dos.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-rose-50/50 rounded-2xl p-4 border border-rose-100">
                  <div className="flex items-center gap-1.5 text-rose-800 font-bold text-xs mb-2">
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>ما يجب تجنبه (Don't)</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-rose-950 font-medium">
                    {selectedGuide.donts.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ⚡ Quick Symptom Triage */}
        {activeTab === "triage" && (
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xs">
            <div className="text-center max-w-xl mx-auto mb-6">
              <h3 className="font-bold text-Blue-900 text-xl mb-1">
                فرز الأعراض وتقدير الخطورة
              </h3>
              <p className="text-xs text-gray-500">
                اختر العَرَض الرئيسي لتحديد مستوى الاستجابة والتصرف الأنسب
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto mb-6">
              {triageSymptoms.map((sym) => {
                const isSelected = selectedTriage?.id === sym.id;

                return (
                  <button
                    key={sym.id}
                    onClick={() => setSelectedTriage(sym)}
                    className={`p-3.5 rounded-2xl text-right transition-all border flex items-center justify-between gap-3 ${
                      isSelected
                        ? "bg-Blue-900 text-white border-Blue-900 shadow-sm"
                        : "bg-slate-50 text-slate-800 border-slate-200/70 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex-1">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold mb-1 ${
                          sym.level === "red"
                            ? isSelected
                              ? "bg-rose-500 text-white"
                              : "bg-rose-100 text-rose-800"
                            : isSelected
                            ? "bg-amber-400 text-slate-950"
                            : "bg-amber-100 text-amber-900"
                        }`}
                      >
                        {sym.urgencyText}
                      </span>
                      <p className="text-xs font-semibold leading-snug">{sym.label}</p>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? "border-white bg-white text-Blue-900" : "border-slate-300"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedTriage && (
              <div className="max-w-xl mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center">
                <div className="text-xs font-bold text-slate-500 mb-1">
                  التوصية الطبية المقترحة:
                </div>
                <p className="text-sm md:text-base font-bold text-Blue-900 mb-4 leading-relaxed">
                  {selectedTriage.recommendation}
                </p>

                <div className="flex items-center justify-center gap-2">
                  {selectedTriage.level === "red" && (
                    <a
                      href="tel:123"
                      className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>اتصال بالإسعاف (123)</span>
                    </a>
                  )}
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-Blue-900 hover:bg-Blue text-white font-bold text-xs shadow-xs"
                  >
                    <Hospital className="w-3.5 h-3.5" />
                    <span>مراكز الطوارئ المتاحة</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyPage;
