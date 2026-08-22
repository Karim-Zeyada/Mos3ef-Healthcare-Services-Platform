/** @format */

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";

const ServiceModal = ({ service, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    categoryId: 1,
    description: "",
    availability: "متاح",
    workingHours: "24 ساعة",
  });

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // لحساب تأثير الفتح

  useEffect(() => {
    // تأثير الفتح عند ظهور المودال
    setTimeout(() => setIsOpen(true), 10);

    if (service) {
      setFormData({
        name: service.name || "",
        price: service.price || "",
        categoryId: service.categoryId || 1,
        description: service.description || "",
        availability: service.availability || "متاح",
        workingHours: service.workingHours || "24 ساعة",
      });
    } else {
      setFormData({
        name: "",
        price: "",
        categoryId: 1,
        description: "",
        availability: "متاح",
        workingHours: "24 ساعة",
      });
    }
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("الرجاء إدخال اسم الخدمة");
      return;
    }

    if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
      alert("الرجاء إدخال سعر صحيح");
      return;
    }

    setLoading(true);

    try {
      await onSave(formData);
      // إغلاق المودال تلقائياً بعد النجاح
      setTimeout(() => {
        setIsOpen(false);
        setTimeout(() => onClose(), 300); // تأخير للإغلاق بعد انتهاء animation
      }, 1000);
    } catch (error) {
      console.error("Error saving service:", error);
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => onClose(), 300);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto [direction:rtl]">
      {/* Overlay شفاف مع تأثير بلور */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Container للمودال في المركز */}
      <div className="flex min-h-full items-center justify-center p-4">
        {/* المودال نفسه */}
        <div
          className={`relative w-full max-w-md transform rounded-2xl bg-white shadow-2xl transition-all duration-300 ${
            isOpen
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-4 opacity-0 scale-95"
          }`}
          onClick={(e) => e.stopPropagation()} // منع الإغلاق عند النقر داخل المودال
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl">
            <div className="flex items-center gap-3">
            
              <h3 className="font-Cairo text-xl font-bold text-gray-900">
                {service ? "تعديل الخدمة" : "إضافة خدمة جديدة"}
              </h3>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
              disabled={loading}
              aria-label="إغلاق"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* اسم الخدمة */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-Cairo text-sm font-semibold text-gray-700">
                    اسم الخدمة
                  </label>
                  <span className="text-xs text-red-500 font-Cairo">
                    مطلوب *
                  </span>
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-right font-Cairo placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  placeholder="أدخل اسم الخدمة..."
                  required
                  disabled={loading}
                />
              </div>

              {/* السعر */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-Cairo text-sm font-semibold text-gray-700">
                    السعر
                  </label>
                  <span className="text-xs text-red-500 font-Cairo">
                    مطلوب *
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-right font-Cairo placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    placeholder="أدخل السعر بالجنيه..."
                    required
                    min="1"
                    disabled={loading}
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-Cairo">
                    جنيه
                  </span>
                </div>
              </div>

              {/* الفئة */}
              <div className="space-y-2">
                <label className="font-Cairo text-sm font-semibold text-gray-700">
                  الفئة
                </label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-right font-Cairo focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-white appearance-none"
                  disabled={loading}
                >
                  <option value="1"> طوارئ</option>
                  <option value="2"> عناية مركزة</option>
                  <option value="17"> حضانة أطفال</option>
                  <option value="18"> بنك دم</option>
                </select>
              </div>

              {/* الحالة */}
              <div className="space-y-2">
                <label className="font-Cairo text-sm font-semibold text-gray-700">
                  حالة الخدمة
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, availability: "متاح" }))
                    }
                    className={`px-4 py-3 rounded-xl border font-Cairo transition-all ${
                      formData.availability === "متاح"
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                    disabled={loading}
                  >
                     متاح
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        availability: "غير متاح",
                      }))
                    }
                    className={`px-4 py-3 rounded-xl border font-Cairo transition-all ${
                      formData.availability === "غير متاح"
                        ? "border-red-500 bg-red-50 text-red-700"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                    disabled={loading}
                  >
                     غير متاح
                  </button>
                </div>
              </div>

              {/* ساعات العمل */}
              <div className="space-y-2">
                <label className="font-Cairo text-sm font-semibold text-gray-700">
                  ساعات العمل
                </label>
                <input
                  type="text"
                  name="workingHours"
                  value={formData.workingHours}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-right font-Cairo placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  placeholder="مثال: 24 ساعة أو 8 صباحاً - 10 مساءً"
                  disabled={loading}
                />
              </div>

              {/* الوصف */}
              <div className="space-y-2">
                <label className="font-Cairo text-sm font-semibold text-gray-700">
                  وصف إضافي (اختياري)
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-right font-Cairo placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                  placeholder="أدخل وصف مفصل للخدمة..."
                  disabled={loading}
                />
              </div>

              {/* أزرار */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={loading}
                  className="flex-1 py-3 font-Cairo border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                >
                  إلغاء
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 font-Cairo bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-200 hover:shadow-green-300"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      جاري الحفظ...
                    </div>
                  ) : service ? (
                    "تحديث الخدمة"
                  ) : (
                    "إضافة الخدمة"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
