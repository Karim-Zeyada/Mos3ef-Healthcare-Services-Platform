/** @format */

import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "./ui/card";
import { Loader2, Star } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

const HospitalReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useAuth();
  const baseUrl = "http://localhost:5000/api/";

  const fetchReviews = useCallback(async () => {
    if (!user?.hospitalId) return;
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("authToken");

      const res = await axios.get(
        `${baseUrl}Hospital/GetServicesReviews/${user.hospitalId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setReviews(res.data.data || []);
    } catch (err) {
      console.error("Error fetching hospital reviews:", err);
      setError("فشل في جلب التقييمات");
    } finally {
      setLoading(false);
    }
  }, [user?.hospitalId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="flex flex-col flex-1 min-w-0">
      <header className="flex items-center justify-end gap-4 px-8 py-6 bg-white w-full min-h-20">
        <h1 className="font-Cairo font-bold text-Blue-900 text-xl [direction:rtl]">
          تقييمات الخدمات
        </h1>
      </header>

      <div className="flex flex-col flex-1 w-full max-w-[863.2px] mx-auto gap-6 px-2 py-3 md:p-8 overflow-x-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-Blue" />
          </div>
        ) : error ? (
          <div className="text-red-500 font-Cairo text-center py-8 [direction:rtl]">
            {error}
          </div>
        ) : reviews.length === 0 ? (
          <Card className="border-0 shadow-sm">
            <CardContent className="py-16">
              <div className="text-gray-500 font-Cairo text-center [direction:rtl]">
                <p className="text-lg">لا توجد تقييمات بعد</p>
                <p className="text-sm mt-2">
                  سيظهر هنا تقييمات المرضى على خدمات المستشفى
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col gap-4">
            {/* Summary */}
            <Card className="bg-Blue-50 border-0 shadow-sm rounded-2xl">
              <CardContent className="p-5 flex items-center justify-between [direction:rtl]">
                <span className="font-Cairo font-semibold text-Blue-900">
                  إجمالي التقييمات: {reviews.length}
                </span>
                <span className="font-Cairo text-sm text-gray-600">
                  متوسط التقييم:{" "}
                  {(
                    reviews.reduce((sum, r) => sum + r.rating, 0) /
                    reviews.length
                  ).toFixed(1)}{" "}
                  ⭐
                </span>
              </CardContent>
            </Card>

            {/* Reviews List */}
            {reviews.map((review) => (
              <Card
                key={review.reviewId}
                className="border border-gray-100 shadow-sm rounded-xl hover:shadow-md transition-shadow"
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4 [direction:rtl]">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-Cairo font-semibold text-Blue-900 text-sm">
                          مريض #{review.patientId}
                        </span>
                        {renderStars(review.rating)}
                        <span className="font-Cairo text-xs text-gray-400">
                          خدمة #{review.serviceId}
                        </span>
                      </div>

                      <p className="font-Cairo text-sm text-gray-700 mt-1">
                        {review.comment || "بدون تعليق"}
                      </p>

                      <p className="font-Cairo text-xs text-gray-400 mt-2">
                        {new Date(review.review_Date).toLocaleDateString(
                          "ar-EG",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>

                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-Blue-50">
                      <span className="font-Cairo font-bold text-Blue text-lg">
                        {review.rating}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HospitalReviews;
