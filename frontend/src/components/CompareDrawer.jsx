/** @format */

import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { X, ScaleIcon, Loader2, Star } from "lucide-react";
import useCompare from "../hooks/useCompare";

const CompareDrawer = () => {
  const {
    compareItems,
    compareResult,
    showCompareModal,
    loading,
    removeFromCompare,
    clearCompare,
    executeCompare,
    setShowCompareModal,
  } = useCompare();

  // Don't render if no items
  if (compareItems.length === 0) return null;

  return (
    <>
      {/* Floating Compare Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-Blue-900 text-white px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.3)] animate-slide-up">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 [direction:rtl]">
            <ScaleIcon className="w-5 h-5" />
            <span className="font-Cairo text-sm">
              المقارنة ({compareItems.length}/2)
            </span>
            <div className="flex gap-2 flex-1">
              {compareItems.map((item) => (
                <div
                  key={item.serviceId}
                  className="bg-Blue/50 rounded-lg px-3 py-1 flex items-center gap-2 font-Cairo text-xs"
                >
                  <span>{item.name || item.hospitalName}</span>
                  <button
                    onClick={() => removeFromCompare(item.serviceId)}
                    className="hover:text-red-300 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={clearCompare}
              className="border-white/30 text-white hover:bg-white/10 font-Cairo text-xs"
            >
              مسح
            </Button>
            <Button
              size="sm"
              onClick={executeCompare}
              disabled={compareItems.length < 2 || loading}
              className="bg-Green hover:bg-Green-600 text-white font-Cairo text-xs"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "قارن الآن"
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Compare Results Modal */}
      {showCompareModal && compareResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => setShowCompareModal(false)}
                  className="hover:bg-gray-100 p-1 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <h2 className="font-Cairo font-bold text-Blue-900 text-xl [direction:rtl]">
                  نتيجة المقارنة
                </h2>
              </div>

              <div className="grid grid-cols-3 gap-4 [direction:rtl]">
                {/* Header Row */}
                <div className="font-Cairo font-semibold text-Blue-900 text-sm text-center">
                  المعيار
                </div>
                <div className="font-Cairo font-semibold text-Blue text-sm text-center bg-Blue-50 rounded-lg p-2">
                  {compareResult.service1?.name || "الخدمة الأولى"}
                </div>
                <div className="font-Cairo font-semibold text-Blue text-sm text-center bg-Blue-50 rounded-lg p-2">
                  {compareResult.service2?.name || "الخدمة الثانية"}
                </div>

                {/* Hospital */}
                <div className="font-Cairo text-sm text-gray-600 flex items-center justify-center">
                  المستشفى
                </div>
                <div className="font-Cairo text-sm text-center p-2">
                  {compareResult.service1?.hospitalName || "—"}
                </div>
                <div className="font-Cairo text-sm text-center p-2">
                  {compareResult.service2?.hospitalName || "—"}
                </div>

                {/* Price */}
                <div className="font-Cairo text-sm text-gray-600 flex items-center justify-center">
                  السعر
                </div>
                <div className="font-Cairo text-sm text-center p-2 font-bold">
                  {compareResult.service1?.price || 0} ج.م
                </div>
                <div className="font-Cairo text-sm text-center p-2 font-bold">
                  {compareResult.service2?.price || 0} ج.م
                </div>

                {/* Rating */}
                <div className="font-Cairo text-sm text-gray-600 flex items-center justify-center">
                  التقييم
                </div>
                <div className="flex items-center justify-center gap-1 p-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-Cairo text-sm">
                    {compareResult.service1?.averageRating?.toFixed(1) || "—"}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-1 p-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-Cairo text-sm">
                    {compareResult.service2?.averageRating?.toFixed(1) || "—"}
                  </span>
                </div>

                {/* Availability */}
                <div className="font-Cairo text-sm text-gray-600 flex items-center justify-center">
                  الحالة
                </div>
                <div className="font-Cairo text-sm text-center p-2">
                  {compareResult.service1?.availability || "—"}
                </div>
                <div className="font-Cairo text-sm text-center p-2">
                  {compareResult.service2?.availability || "—"}
                </div>

                {/* Category */}
                <div className="font-Cairo text-sm text-gray-600 flex items-center justify-center">
                  القسم
                </div>
                <div className="font-Cairo text-sm text-center p-2">
                  {compareResult.service1?.categoryName || "—"}
                </div>
                <div className="font-Cairo text-sm text-center p-2">
                  {compareResult.service2?.categoryName || "—"}
                </div>

                {/* Working Hours */}
                <div className="font-Cairo text-sm text-gray-600 flex items-center justify-center">
                  ساعات العمل
                </div>
                <div className="font-Cairo text-sm text-center p-2">
                  {compareResult.service1?.working_Hours || "—"}
                </div>
                <div className="font-Cairo text-sm text-center p-2">
                  {compareResult.service2?.working_Hours || "—"}
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <Button
                  onClick={() => {
                    setShowCompareModal(false);
                    clearCompare();
                  }}
                  className="bg-Blue hover:bg-Blue-900 text-white font-Cairo px-8"
                >
                  إغلاق
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default CompareDrawer;
