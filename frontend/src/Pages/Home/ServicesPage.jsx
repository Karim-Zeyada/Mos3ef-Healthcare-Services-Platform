/** @format */

import React, { useState, useEffect } from "react";
import { SearchSection } from "../../components/SearchSection";
import { HospitalCard } from "../../components/HospitalCard";
import { Button } from "../../components/ui/button";
import { Loader2, Stethoscope } from "lucide-react";
import axios from "axios";

export const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/Services", {
        params: { pageNumber: page, pageSize },
      });
      setServices(res.data.data || []);
    } catch (err) {
      console.error("Error fetching services:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [page]);

  return (
    <div className="pt-28 pb-16 w-full max-w-7xl mx-auto px-4 md:px-8">
      {/* Header Title */}
      <div className="text-center mb-8 [direction:rtl]">
        <h1 className="font-Cairo font-bold text-Blue-900 text-3xl md:text-4xl mb-3">
          دليل الخدمات الطبية
        </h1>
        <p className="font-Cairo text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          ابحث وقارن بين كافة الخدمات الطبية المتاحة في المستشفيات والمراكز المتخصصة
        </p>
      </div>

      {/* Search and Category Filters */}
      <div className="flex justify-center mb-12">
        <SearchSection />
      </div>

      {/* All Services Grid */}
      <div className="w-full [direction:rtl]">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-Blue" />
            <h2 className="font-Cairo font-bold text-Blue-900 text-xl md:text-2xl">
              جميع الخدمات الطبية
            </h2>
          </div>
          <span className="font-Cairo text-gray-500 text-sm">
            عرض {services.length} خدمة
          </span>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-Blue mb-3" />
            <p className="font-Cairo text-Blue-900 text-lg">جاري تحميل الخدمات...</p>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-16 font-Cairo text-gray-500">
            لا توجد خدمات متاحة حالياً
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {services.map((item, index) => (
                <div key={item.serviceId || index} className="flex justify-center">
                  <HospitalCard item={item} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-4 mt-12 [direction:ltr]">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="font-Cairo border-Blue-900 text-Blue-900 px-5 rounded-xl"
              >
                السابق
              </Button>
              <span className="font-Cairo text-Blue-900 text-sm font-semibold">
                صفحة {page}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={services.length < pageSize}
                onClick={() => setPage((p) => p + 1)}
                className="font-Cairo border-Blue-900 text-Blue-900 px-5 rounded-xl"
              >
                التالي
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
