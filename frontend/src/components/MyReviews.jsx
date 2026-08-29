/** @format */

import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Loader2, Star, Trash2, Pen } from "lucide-react";
import { Textarea } from "./ui/textarea";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingReview, setEditingReview] = useState(null);
  const [editComment, setEditComment] = useState("");
  const [editRating, setEditRating] = useState(5);

  const { user } = useAuth();
  const baseUrl = "http://localhost:5000/api/";

  // There's no direct "get my reviews" endpoint, so we'll need to use
  // the patient's saved services or iterate. For now, we fetch reviews
  // for each saved service. A simpler approach: we store reviews locally
  // from each service page visit, or we add a backend endpoint.
  // Since the backend doesn't have a dedicated "my reviews" endpoint,
  // we'll show a placeholder message guiding users.

  const fetchMyReviews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("يجب تسجيل الدخول أولاً");
        return;
      }

      // Try fetching saved services first to get serviceIds, then get reviews
      // This is a workaround since there's no "get-my-reviews" endpoint
      const savedRes = await axios.get(
        `${baseUrl}Patients/my-saved-services?pageNumber=1&pageSize=100`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const savedItems = savedRes.data.data?.items || [];
      const allReviews = [];

      // For each service, fetch its reviews and filter by current patient
      for (const service of savedItems) {
        try {
          const reviewRes = await axios.get(
            `${baseUrl}Services/${service.serviceId}/reviews`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const serviceReviews = reviewRes.data.data || [];
          // Filter reviews by current patient
          const myReviews = serviceReviews
            .filter((r) => r.patientId === user?.patientId)
            .map((r) => ({
              ...r,
              serviceName: service.name,
            }));
          allReviews.push(...myReviews);
        } catch {
          // Skip if service reviews fail
        }
      }

      setReviews(allReviews);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setError("فشل في جلب التقييمات");
    } finally {
      setLoading(false);
    }
  }, [user?.patientId]);

  useEffect(() => {
    fetchMyReviews();
  }, [fetchMyReviews]);

  const handleDelete = async (reviewId) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا التقييم؟")) return;

    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${baseUrl}Review/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews((prev) => prev.filter((r) => r.reviewId !== reviewId));
    } catch (err) {
      console.error("Error deleting review:", err);
    }
  };

  const handleStartEdit = (review) => {
    setEditingReview(review.reviewId);
    setEditComment(review.comment || "");
    setEditRating(review.rating);
  };

  const handleCancelEdit = () => {
    setEditingReview(null);
    setEditComment("");
    setEditRating(5);
  };

  const handleSaveEdit = async (reviewId) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.put(
        `${baseUrl}Review/${reviewId}`,
        {
          reviewId: reviewId,
          rating: editRating,
          comment: editComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setReviews((prev) =>
        prev.map((r) =>
          r.reviewId === reviewId
            ? { ...r, comment: editComment, rating: editRating }
            : r
        )
      );
      handleCancelEdit();
    } catch (err) {
      console.error("Error updating review:", err);
    }
  };

  const renderStars = (rating, interactive = false, onChange = null) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            } ${interactive ? "cursor-pointer" : ""}`}
            onClick={() => interactive && onChange && onChange(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="flex flex-col w-full items-center bg-white rounded-[20px] shadow-[0px_2px_4px_-2px_#0000001a,0px_4px_6px_-1px_#0000001a] border-0 min-h-[456px] animate-fade-in [--animation-delay:200ms]">
      <CardContent className="flex flex-col items-center gap-7 px-8 py-6 w-full flex-1">
        <div className="justify-end px-8 py-1 flex items-center gap-1 w-full">
          <h1 className="w-fit font-Cairo font-bold text-Blue-900 text-xl leading-6 whitespace-nowrap [direction:rtl] tracking-[0]">
            تقييماتي
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
        ) : reviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 w-full flex-1 text-center [direction:rtl]">
            <div className="w-16 h-16 rounded-full bg-Blue-50 flex items-center justify-center text-Blue-900 mb-4">
              <Star className="w-8 h-8 text-Blue" />
            </div>
            <p className="font-Cairo font-semibold text-lg text-gray-700">لا توجد تقييمات بعد</p>
            <p className="font-Cairo text-sm text-gray-500 mt-1">
              يمكنك إضافة تقييم من صفحة تفاصيل الخدمة
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full">
            {reviews.map((review) => (
              <Card
                key={review.reviewId}
                className="border border-gray-100 shadow-sm"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4 [direction:rtl]">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-Cairo font-semibold text-Blue-900 text-sm">
                          {review.serviceName || "خدمة"}
                        </span>
                        {renderStars(review.rating)}
                      </div>

                      {editingReview === review.reviewId ? (
                        <div className="flex flex-col gap-3 mt-2">
                          <div className="flex items-center gap-2">
                            <span className="font-Cairo text-sm text-gray-600">
                              التقييم:
                            </span>
                            {renderStars(editRating, true, setEditRating)}
                          </div>
                          <Textarea
                            value={editComment}
                            onChange={(e) => setEditComment(e.target.value)}
                            className="font-Cairo text-sm [direction:rtl] resize-none"
                            rows={3}
                          />
                          <div className="flex gap-2 justify-end">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={handleCancelEdit}
                              className="font-Cairo"
                            >
                              إلغاء
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleSaveEdit(review.reviewId)}
                              className="font-Cairo bg-Blue hover:bg-Blue-900 text-white"
                            >
                              حفظ
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p className="font-Cairo text-sm text-gray-700 mt-1">
                          {review.comment || "بدون تعليق"}
                        </p>
                      )}

                      <p className="font-Cairo text-xs text-gray-400 mt-2">
                        {new Date(review.review_Date).toLocaleDateString(
                          "ar-EG"
                        )}
                      </p>
                    </div>

                    {editingReview !== review.reviewId && (
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleStartEdit(review)}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1 h-8 w-8"
                        >
                          <Pen className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(review.reviewId)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1 h-8 w-8"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MyReviews;
