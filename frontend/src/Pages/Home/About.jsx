/** @format */

import React from "react";
import { assets } from "../../assets/assets";

export const About = () => {
  return (
    <div className="pt-28 pb-16 w-full max-w-5xl mx-auto px-4 md:px-8 flex flex-col items-center">
      {/* Top Header - "من نحن" */}
      <div className="text-center mb-12 [direction:rtl]">
        <h1 className="font-Cairo font-bold text-Blue-900 text-4xl md:text-5xl mb-4">
          من نحن
        </h1>
        <p className="font-Cairo text-gray-700 text-base md:text-xl leading-relaxed max-w-3xl mx-auto">
          هذا المشروع تم تطويره بواسطة فريق مسعف التقني، لنقدم لكم أفضل تجربة استخدام
        </p>
      </div>

      {/* Team Subheader - "فريق التطوير" */}
      <h2 className="font-Cairo font-bold text-Blue-900 text-2xl md:text-3xl text-center mb-8 [direction:rtl]">
        فريق التطوير
      </h2>

      {/* Developer Card - Centered */}
      <div className="w-full flex justify-center mb-16 [direction:rtl]">
        <div className="bg-Blue-50/70 hover:bg-Blue-50 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md border border-Blue-100/60 flex flex-col items-center gap-5 max-w-sm w-full transition-all duration-300">
          {/* Avatar Photo */}
          <div className="w-36 h-36 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-Blue/20 shadow-md bg-white">
            <img
              src={assets.karim}
              alt="كريم زيادة"
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Name & Role */}
          <div className="text-center">
            <h3 className="font-Cairo font-bold text-Blue-900 text-2xl md:text-3xl">
              كريم زيادة
            </h3>
            <p className="font-Cairo text-gray-600 text-base md:text-lg font-medium mt-1">
              Full Stack Developer
            </p>
          </div>

          {/* GitHub Link */}
          <a
            href="https://github.com/Karim-Zeyada"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-Blue-900 text-white hover:bg-Blue transition-colors font-Cairo text-sm shadow-sm"
            title="Karim Zeyada GitHub"
          >
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            <span>Karim-Zeyada</span>
          </a>
        </div>
      </div>

      {/* Mission Banner matching bottom design */}
      <div className="w-full bg-[#A8D6F0]/50 border border-Blue-200/80 rounded-3xl p-8 md:p-10 text-center [direction:rtl] shadow-sm">
        <h3 className="font-Cairo font-bold text-Blue-900 text-2xl md:text-3xl mb-3">
          رسالتنا
        </h3>
        <p className="font-Cairo text-Blue-900/90 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          هدفنا هو تطوير مشروع مسعف بأعلى جودة مع تجربة مستخدم سلسة وواجهة جذابة لخدمة وتسهيل الرعاية الصحية للجميع.
        </p>
      </div>
    </div>
  );
};
export default About;
