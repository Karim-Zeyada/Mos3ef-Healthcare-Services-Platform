/** @format */

import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import {
  HeartPulse,
  PhoneCall,
  MapPin,
  Hospital,
  ShieldCheck,
  Stethoscope,
  ArrowUpLeft,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-Blue-50/60 to-[#e9f5fb] border-t border-Blue-100/70 [direction:rtl] text-Blue-900 font-Cairo mt-16">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Column 1: Brand & Mission (5 cols) */}
          <div className="lg:col-span-4 flex flex-col items-start gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={assets.logo}
                className="w-10 h-10 object-contain"
                alt="Mos3ef Logo"
              />
              <div className="flex flex-col">
                <span className="font-Lateef text-Blue-900 text-3xl font-bold leading-none">
                  مسعف
                </span>
                <span className="text-[10px] text-gray-500 font-semibold tracking-wider">
                  HEALTHCARE PLATFORM
                </span>
              </div>
            </Link>

            <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
              المنصة المتكاملة الأولى في مصر لاكتشاف ومقارنة الخدمات الطبية، العناية المركزة، وحالات الطوارئ الفورية بأعلى معايير السرعة والشفافية.
            </p>

            {/* Quick 24/7 Hotline Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white border border-rose-100 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-gray-400 font-medium">خط الطوارئ القومي السريع</div>
                <a
                  href="tel:123"
                  className="font-bold text-rose-700 text-sm hover:underline flex items-center gap-1"
                >
                  <span>123 — هيئة الإسعاف المصرية</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Platform Links (2 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-base font-bold text-Blue-900 mb-4 pb-2 border-b border-Blue-200/50 flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-Blue" />
              <span>استكشاف المنصة</span>
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-600 font-medium">
              <li>
                <Link
                  to="/"
                  className="hover:text-Blue transition-colors flex items-center gap-1.5"
                >
                  <ArrowUpLeft className="w-3.5 h-3.5 text-Blue-300" />
                  <span>الصفحة الرئيسية</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-Blue transition-colors flex items-center gap-1.5"
                >
                  <ArrowUpLeft className="w-3.5 h-3.5 text-Blue-300" />
                  <span>دليل الخدمات الطبية</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/hospitals"
                  className="hover:text-Blue transition-colors flex items-center gap-1.5"
                >
                  <ArrowUpLeft className="w-3.5 h-3.5 text-Blue-300" />
                  <span>دليل المستشفيات والمراكز</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/emergency"
                  className="hover:text-rose-700 transition-colors flex items-center gap-1.5 font-semibold text-rose-700"
                >
                  <HeartPulse className="w-3.5 h-3.5 text-rose-500" />
                  <span>مركز الطوارئ المنقذ</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-Blue transition-colors flex items-center gap-1.5"
                >
                  <ArrowUpLeft className="w-3.5 h-3.5 text-Blue-300" />
                  <span>عن مسعف وفريق التطوير</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Emergency & Critical Services (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-base font-bold text-Blue-900 mb-4 pb-2 border-b border-Blue-200/50 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-Blue" />
              <span>خدمات الطوارئ الرسمية</span>
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-600 font-medium">
              <li>
                <a
                  href="tel:123"
                  className="hover:text-Blue transition-colors flex items-center justify-between"
                >
                  <span>هيئة الإسعاف المصرية</span>
                  <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">123</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:137"
                  className="hover:text-Blue transition-colors flex items-center justify-between"
                >
                  <span>طوارئ الصحة والحضانات</span>
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">137</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:16328"
                  className="hover:text-Blue transition-colors flex items-center justify-between"
                >
                  <span>المركز القومي للسموم</span>
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">16328</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:126"
                  className="hover:text-Blue transition-colors flex items-center justify-between"
                >
                  <span>طوارئ ومستشفيات الأطفال</span>
                  <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">126</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Join & Partners (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-base font-bold text-Blue-900 mb-4 pb-2 border-b border-Blue-200/50 flex items-center gap-2">
              <Hospital className="w-4 h-4 text-Blue" />
              <span>انضم للمنصة</span>
            </h3>
            <div className="flex flex-col gap-3">
              <Link
                to="/SignUp-Hospital"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl bg-Blue-900 hover:bg-Blue text-white text-xs font-bold transition-all shadow-xs"
              >
                <Hospital className="w-3.5 h-3.5" />
                <span>انضم كشريك طبي</span>
              </Link>
              <Link
                to="/SignUp"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl bg-white hover:bg-slate-50 border border-Blue-200/80 text-Blue-900 text-xs font-bold transition-all"
              >
                <span>حساب مريض جديد</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Clean Vector Social Links */}
        <div className="mt-12 pt-6 border-t border-Blue-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p className="text-center sm:text-right">
            © {new Date().getFullYear()} <strong>مسعف (Mos3ef)</strong> — منصة الرعاية الصحية والخدمات الطبية. جميع الحقوق محفوظة.
          </p>

          <div className="flex items-center gap-2">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white hover:bg-Blue-900 text-gray-600 hover:text-white border border-Blue-100 flex items-center justify-center transition-all shadow-xs"
              title="Facebook"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* X / Twitter */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white hover:bg-Blue-900 text-gray-600 hover:text-white border border-Blue-100 flex items-center justify-center transition-all shadow-xs"
              title="X"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/Karim-Zeyada/Mos3ef-Healthcare-Services-Platform"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white hover:bg-Blue-900 text-gray-600 hover:text-white border border-Blue-100 flex items-center justify-center transition-all shadow-xs"
              title="GitHub Repository"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
