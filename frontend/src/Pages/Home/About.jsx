/** @format */

import React from "react";
import { assets } from "../../assets/assets";

const teamMembers = [
  {
    id: 1,
    name: "Karim Zeyada",
    arabicName: "كريم زيادة",
    role: "Back-end Developer",
    image: assets.karim,
    github: "https://github.com/Karim-Zeyada",
    githubUsername: "Karim-Zeyada",
  },
    {
    id: 2,
    name: "Mai Atef",
    arabicName: "مي عاطف",
    role: "Back-end Developer",
    image: assets.mai_atef,
    github: "https://github.com/maiatef18",
    githubUsername: "maiatef18",
  },

    {
    id: 3,
    name: "Shahd AbdElghany",
    arabicName: "شهد عبد الغني",
    role: "Front-end Developer",
    image: assets.shahd,
    github: "https://github.com/Shahd-Abdalghn",
    githubUsername: "Shahd-Abdalghn",
  },
  {
    id: 4,
    name: "Mostafa Tamer",
    arabicName: "مصطفى تامر",
    role: "Back-end Developer",
    image: assets.mostafa_tamer,
    github: "https://github.com/Mostafa-Zhran",
    githubUsername: "Mostafa-Zhran",
  },
  {
    id: 5,
    name: "Mostafa Nour Elden",
    arabicName: "مصطفى نور الدين",
    role: "UI/UX Designer",
    image: assets.mostafa_nour,
    github: "https://github.com",
    githubUsername: "GitHub",
  },

  {
    id: 6,
    name: "Malk Hisham",
    arabicName: "ملك هشام",
    role: "AI Developer",
    image: assets.malk_hisham,
    github: "https://github.com",
    githubUsername: "GitHub",
  },
];

export const About = () => {
  return (
    <div className="pt-28 pb-16 w-full max-w-6xl mx-auto px-4 md:px-8 flex flex-col items-center">
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
      <div className="text-center mb-10 [direction:rtl]">
        <h2 className="font-Cairo font-bold text-Blue-900 text-2xl md:text-3xl">
          فريق التطوير
        </h2>
        <p className="font-Cairo text-gray-500 text-sm md:text-base mt-1">
          Development Team
        </p>
      </div>

      {/* Team Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="relative bg-gradient-to-b from-white to-Blue-50/70 hover:to-Blue-50 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl border border-Blue-100/70 transition-all duration-300 flex flex-col items-center justify-between text-center group"
          >
            {/* Avatar Photo */}
            <div className="w-36 h-36 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-Blue/20 group-hover:ring-Blue/40 shadow-md bg-white transition-all duration-300 mb-4 mt-2">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Name & Arabic Name */}
            <div className="text-center mb-3">
              <h3 className="font-Cairo font-bold text-Blue-900 text-xl md:text-2xl leading-snug">
                {member.name}
              </h3>
              <p className="font-Cairo text-gray-500 text-sm md:text-base font-medium">
                {member.arabicName}
              </p>
            </div>

            {/* Role Badge */}
            <div className="w-full flex flex-col items-center gap-1.5 mt-auto pt-2">
              <span className="inline-block px-4 py-1.5 rounded-xl bg-Blue-900 text-white font-Cairo font-semibold text-sm shadow-sm tracking-wide">
                {member.role}
              </span>

              {/* GitHub Link if available */}
              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-Blue/10 hover:bg-Blue text-Blue hover:text-white transition-all duration-200 font-Cairo text-xs font-medium shadow-xs"
                  title={`${member.name} GitHub`}
                >
                  <svg
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                  <span>{member.githubUsername}</span>
                </a>
              )}
            </div>
          </div>
        ))}
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
