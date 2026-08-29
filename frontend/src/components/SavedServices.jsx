/** @format */

import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "./ui/card";
import { HospitalCard } from "./HospitalCard";
import { Button } from "./ui/button";
import { Loader2, Heart } from "lucide-react";
import axios from "axios";

export const SavedServices = () => {
  const [savedServices, setSavedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const baseUrl = "http://localhost:5000/api/";

  const fetchSavedServices = useCallback(async (pageNumber = 1) => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("يجب تسجيل الدخول أولاً");
        return;
      }

      const res = await axios.get(
        `${baseUrl}Patients/my-saved-services?pageNumber=${pageNumber}&pageSize=8`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = res.data.data;
      setSavedServices(data.items || []);
      setTotalPages(data.totalPages || 1);
      setPage(pageNumber);
    } catch (err) {
      console.error("Error fetching saved services:", err);
      setError("فشل في جلب الخدمات المحفوظة");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSavedServices(1);
  }, [fetchSavedServices]);

  const handleUnsave = async (serviceId) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${baseUrl}Patients/my-saved-services/${serviceId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Remove from local state
      setSavedServices((prev) =>
        prev.filter((s) => s.serviceId !== serviceId)
      );
    } catch (err) {
      console.error("Error unsaving service:", err);
    }
  };

  return (
    <Card className="flex flex-col w-full items-center bg-white rounded-[20px] shadow-[0px_2px_4px_-2px_#0000001a,0px_4px_6px_-1px_#0000001a] border-0 min-h-[456px] animate-fade-in [--animation-delay:200ms]">
      <CardContent className="flex flex-col items-center gap-7 px-8 py-6 w-full flex-1">
        <div className="justify-end px-8 py-1 flex items-center gap-1 w-full">
          <h1 className="w-fit font-Cairo font-bold text-Blue-900 text-xl leading-6 whitespace-nowrap [direction:rtl] tracking-[0]">
            الخدمات المحفوظة
          </h1>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 w-full flex-1">
            <Loader2 className="w-8 h-8 animate-spin text-Blue" />
          </div>
        ) : error ? (
          <div className="text-red-500 font-Cairo text-center py-12 w-full flex-1 [direction:rtl]">
            {error}
          </div>
        ) : savedServices.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 w-full flex-1 text-center [direction:rtl]">
            <div className="w-16 h-16 rounded-full bg-Blue-50 flex items-center justify-center text-Blue-900 mb-4">
              <Heart className="w-8 h-8 text-Blue" />
            </div>
            <p className="font-Cairo font-semibold text-lg text-gray-700">لا توجد خدمات محفوظة بعد</p>
            <p className="font-Cairo text-sm text-gray-500 mt-1">
              يمكنك حفظ الخدمات من صفحة تفاصيل الخدمة
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-center gap-8 w-full">
              {savedServices.map((item) => (
                <div key={item.serviceId} className="relative group">
                  <HospitalCard item={item} />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUnsave(item.serviceId);
                    }}
                    className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    title="إزالة من المحفوظات"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center gap-3 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => fetchSavedServices(page - 1)}
                  className="font-Cairo"
                >
                  السابق
                </Button>
                <span className="font-Cairo text-Blue-900 text-sm">
                  {page} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => fetchSavedServices(page + 1)}
                  className="font-Cairo"
                >
                  التالي
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
