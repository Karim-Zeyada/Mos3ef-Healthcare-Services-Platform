/** @format */

import {
  MapPinIcon,
  PhoneIcon,
  ScaleIcon,
  Share2Icon,
  Star,
  Loader2,
} from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { ButtonTextAndIcon } from "./ButtonTextAndIcon";
import { RatingOfServices } from "./RatingOfServices";
import { HeartButton } from "./HeartButton";
import { Online } from "./Online";
import { ReviewCard } from "./ReviewCard";
import { useHospital } from "../hooks/useHospital.js";
import { useAuth } from "../hooks/useAuth.js";
import { getServiceImage } from "../utils/imageHelper.js";
import axios from "axios";

const photoGallery = [
  {
    src: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&auto=format&fit=crop",
    alt: "Medical facility",
  },
  {
    src: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&auto=format&fit=crop",
    alt: "Hospital ward",
  },
];

const detailsSections = [
  {
    title: "التخصصات الرئيسية",
    content:
      "الباطنة، الجراحة العامة، العظام، أمراض الكلى والمسالك البولية، القلب والأوعية الدموية.",
  },
  {
    title: "خدمات إضافية",
    content:
      "قسم أشعة متكامل (رنين مغناطيسي، مقطعية)، معمل تحاليل مركزي، صيدلية 24 ساعة.",
  },
];

export const ServiceCard = () => {
  const { id } = useParams();
  const { getServiceById } = useHospital();
  const { user, role } = useAuth();
  const availableKeywords = ["available", "متاح", "yes", "نعم"];
  const baseUrl = "http://localhost:5000/api/";

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Reviews state
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(null);

  // Fetch service details
  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const result = await getServiceById(id);

        if (result.success || result.isSuccess) {
          setService(result.data || result.data?.data);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError("حدث خطأ في جلب بيانات الخدمة");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchService();
    }
  }, [id, getServiceById]);

  // Fetch reviews for this service
  const fetchReviews = useCallback(async () => {
    if (!id) return;
    try {
      setReviewsLoading(true);
      const res = await axios.get(`${baseUrl}Services/${id}/reviews`);
      setReviews(res.data.data || []);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setReviewsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // Submit a new review
  const handleSubmitReview = async () => {
    if (!newReviewText.trim()) return;
    if (!user?.patientId) {
      setReviewSuccess("يجب تسجيل الدخول كمريض لإضافة تقييم");
      return;
    }

    try {
      setSubmittingReview(true);
      const token = localStorage.getItem("authToken");
      await axios.post(
        `${baseUrl}Review`,
        {
          rating: newReviewRating,
          comment: newReviewText,
          serviceId: parseInt(id),
          patientId: user.patientId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setNewReviewText("");
      setNewReviewRating(5);
      setReviewSuccess("تم إضافة التقييم بنجاح!");
      setTimeout(() => setReviewSuccess(null), 3000);
      // Refresh reviews
      await fetchReviews();
    } catch (err) {
      console.error("Error submitting review:", err);
      setReviewSuccess("فشل في إضافة التقييم");
      setTimeout(() => setReviewSuccess(null), 3000);
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-Blue-900 font-Cairo text-xl">
          جاري تحميل البيانات...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-8 mx-auto px-3 md:px-6 lg:px-36">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 my-8 md:my-11">
          <div className="text-red-800 font-Cairo text-center text-lg">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="pt-8 mx-auto px-3 md:px-6 lg:px-36">
        <div className="text-gray-500 text-center py-8 my-8 md:my-11 font-Cairo">
          لم يتم العثور على الخدمة
        </div>
      </div>
    );
  }

  return (
    <div className="pt-30  mx-auto px-3 md:px-4 lg:px-6 xl:px-36">
      <div className="flex flex-col w-full items-center gap-4 md:gap-6 px-1 py-2 bg-white rounded-[20px] border border-Blue-900 my-4 md:my-8">
        <Card className="flex flex-col w-full p-0 items-center gap-3 md:gap-4 shadow-none border-0">
          <CardContent className="w-full p-0">
            <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[428px] rounded-2xl overflow-hidden shadow-[0px_4px_4px_#7cc1e9] bg-cover bg-center">
              <img
                src={getServiceImage(service.hospitalImage, service.category)}
                alt={service.name || "صورة الخدمة"}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-[-51px] left-0 w-full h-[479px] bg-[linear-gradient(180deg,rgba(217,217,217,0)_0%,rgba(84,172,225,1)_100%)]" />

              <div className="inline-flex items-center justify-end gap-1 md:gap-2 absolute top-[180px] sm:top-[220px] md:top-[250px] lg:top-[312px] left-[10px] md:left-[15px] lg:left-[25px]">
                <div className="relative w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] md:w-[80px] md:h-[80px] lg:w-[99.83px] lg:h-[97.83px]">
                  <img
                    className="absolute hidden md:inline-block top-0 -left-1 w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] md:w-[80px] md:h-[80px] lg:w-[106px] lg:h-[106px] rounded-xl object-cover"
                    alt="More"
                    src="https://c.animaapp.com/mi7g3z3l51WlVC/img/more.png"
                  />
                  <div className="absolute hidden md:inline-block top-[12px] sm:top-[15px] md:top-[20px] lg:top-[25px] left-[8px] sm:left-[10px] md:left-[15px] lg:left-[19px] w-[25px] sm:w-[30px] md:w-[40px] lg:w-[46px] font-Cairo font-bold text-[#e9f5fb] text-sm sm:text-base md:text-lg lg:text-2xl text-right tracking-[0] leading-[normal]">
                    +14
                  </div>
                </div>

                {photoGallery.map((photo, index) => (
                  <img
                    key={index}
                    className="relative w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] md:w-[80px] md:h-[80px] lg:w-[105px] lg:h-[106px] hidden md:inline-block rounded-xl object-cover"
                    alt={photo.alt}
                    src={photo.src}
                  />
                ))}
              </div>

              <Online
                isOnline={availableKeywords.includes(service.availability)}
              />

              <HeartButton serviceId={parseInt(id)} />

              <div className="flex flex-col w-full xs:w-[300px] sm:w-[350px] md:w-[400px] lg:w-[531px] items-end gap-1 absolute top-[80px] xs:top-[100px] sm:top-[120px] md:top-[150px] lg:top-[201px] right-[8px] xs:right-[10px] sm:right-[12px] md:right-[15px] lg:right-[18px]">
                <div className="inline-flex items-center justify-center gap-1 xs:gap-2 sm:gap-3 md:gap-4 flex-wrap">
                  <div className="w-fit text-[#152211] text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-Cairo font-bold tracking-[0] leading-[normal] [direction:rtl]">
                    {service.name || "اسم الخدمة"}
                  </div>
                  <div className="w-[2px] xs:w-[3px] sm:w-[4px] md:w-[5px] h-[20px] xs:h-[25px] sm:h-[30px] md:h-[37px] font-Cairo font-bold text-[#e9f5fb] text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-right tracking-[0] leading-[normal] hidden xs:block">
                    |
                  </div>
                  <div className="inline-flex items-center justify-center gap-1">
                    <div className="inline-flex flex-col items-center gap-1">
                      <RatingOfServices
                        rating={service.averageRating || "4.5"}
                      />
                      <div className="w-fit font-Cairo font-normal text-Blue-900 text-xs tracking-[0] leading-[normal] [direction:rtl]">
                        بناء على 4500 مراجعة
                      </div>
                    </div>
                  </div>
                </div>

                <h1 className="self-stretch h-auto font-Cairo font-bold text-Blue-900 text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[32px] tracking-[0] leading-tight [direction:rtl] mt-1 xs:mt-2">
                  {service.hospitalName || "اسم المستشفى"}
                </h1>

                <div className="inline-flex items-center justify-center gap-1 xs:gap-2 mt-1 xs:mt-2 flex-wrap">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="px-2 xs:px-3 py-0.5 xs:py-1 h-auto rounded-3xl text-xs"
                  >
                    <Share2Icon className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </Button>
                  <ButtonTextAndIcon
                    text={"اضف للمقارنة"}
                    icon={
                      <ScaleIcon className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    }
                    className="text-xs"
                  />
                  <ButtonTextAndIcon
                    text={"أتصل بالمستشفى"}
                    icon={
                      <PhoneIcon className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    }
                    className="text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row w-full px-2 items-center justify-between mt-3 md:mt-4 gap-2 md:gap-4">
              <div className="flex items-center justify-end gap-2 md:gap-4 flex-wrap">
                <div className="inline-flex items-center justify-center gap-1">
                  <div className="w-fit font-Cairo font-normal text-Blue-900 text-xs md:text-sm lg:text-base tracking-[0] leading-[normal] [direction:rtl]">
                    قسم {service.categoryName || "غير محدد"}
                  </div>
                </div>
                <div className="inline-flex items-center justify-center gap-1">
                  <div className="w-fit font-Cairo font-normal text-Blue-900 text-xs md:text-sm lg:text-base tracking-[0] leading-[normal] [direction:rtl]">
                    تبعد {service.distanceKm || "0.0"} كم
                  </div>
                  <MapPinIcon className="w-4 h-4 xs:w-5 xs:h-5 md:w-6 md:h-6" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <hr className="text-gray-300 my-2 w-[90%]" />

        <div className="flex flex-col lg:flex-row justify-center items-center gap-4 md:gap-6 lg:gap-8 w-full px-3 md:px-4">
          <div className="flex flex-col items-center gap-4 md:gap-6 w-full lg:w-1/2">
            <div className="flex flex-col gap-4 md:gap-6 w-full">
              <div className="flex flex-col sm:flex-row gap-2 md:gap-4 items-center [direction:rtl]">
                <div className="font-Cairo font-semibold text-black text-sm md:text-[15px] tracking-[0] leading-[normal] [direction:rtl] whitespace-nowrap">
                  سعر الخدمة:
                </div>
                <div className="flex flex-col w-full sm:w-[250px] md:w-[300px] lg:w-[350px] xl:w-[463px] items-end gap-2 md:gap-4">
                  <Card className="inline-flex items-center justify-center gap-2 md:gap-3 p-2 md:p-3 bg-[#e9f5fb] rounded-[18px] md:rounded-[22px] border-0 shadow-none w-full">
                    <CardContent className="p-0 flex items-center w-full justify-center gap-2 md:gap-3">
                      <div className="w-fit font-Cairo font-semibold text-black text-sm md:text-[15px] tracking-[0] leading-[normal] [direction:rtl]">
                        {service.price || "0"} $
                      </div>
                      <div className="w-fit font-Cairo font-bold text-[#294521] text-lg md:text-xl lg:text-2xl xl:text-[28px] tracking-[0] leading-[normal] whitespace-nowrap [direction:rtl]">
                        جنيها
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 md:gap-4 items-center [direction:rtl]">
                <div className="font-Cairo font-semibold text-black text-sm md:text-[15px] tracking-[0] leading-[normal] [direction:rtl] whitespace-nowrap">
                  ساعات العمل:
                </div>
                <div className="flex flex-col w-full sm:w-[250px] md:w-[300px] lg:w-[350px] xl:w-[463px] items-end gap-2 md:gap-4">
                  <Card className="inline-flex items-center justify-center gap-2 md:gap-3 p-2 md:p-3 bg-[#e9f5fb] rounded-[18px] md:rounded-[22px] border-0 shadow-none w-full">
                    <CardContent className="p-0 flex items-center w-full justify-center gap-2 md:gap-3">
                      <div className="w-fit font-Cairo font-semibold text-black text-sm md:text-[15px] tracking-[0] leading-[normal] [direction:rtl]">
                        {service.working_Hours || "غير محدد"}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 md:gap-4 items-center [direction:rtl]">
                <div className="font-Cairo font-semibold text-black text-sm md:text-[15px] tracking-[0] leading-[normal] [direction:rtl] whitespace-nowrap">
                  حالة الخدمة:
                </div>
                <div className="flex flex-col w-full sm:w-[250px] md:w-[300px] lg:w-[350px] xl:w-[463px] items-end gap-2 md:gap-4">
                  <Card
                    className={`inline-flex items-center justify-center gap-2 md:gap-3 p-2 md:p-3 rounded-[18px] md:rounded-[22px] border-0 shadow-none w-full ${
                      service.availability === "YES"
                        ? "bg-green-100"
                        : "bg-red-100"
                    }`}
                  >
                    <CardContent className="p-0 flex items-center w-full justify-center gap-2 md:gap-3">
                      <div
                        className={`w-fit font-Cairo font-semibold text-sm md:text-[15px] tracking-[0] leading-[normal] [direction:rtl] ${
                          service.availability === "YES"
                            ? "text-green-800"
                            : "text-red-800"
                        }`}
                      >
                        {service.availability === "YES" ? "متاحة" : "غير متاحة"}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[359px] h-[200px] sm:h-[250px] md:h-[300px] lg:h-[255px] mt-4 lg:mt-0">
            <div className="w-full h-full bg-[#e9f5fb] rounded-[30px] md:rounded-[40px] overflow-hidden border-2 border-solid border-[#071e2c]">
              <img
                className="w-full h-full object-cover"
                alt={service.name || "صورة الخدمة"}
                src={getServiceImage(service.hospitalImage, service.category)}
              />
            </div>
          </div>
        </div>

        <hr className="text-gray-300 my-2 w-[90%]" />

        <div className="w-full px-3 md:px-4 lg:px-6 flex flex-col gap-4 md:gap-6">
          <h2 className="font-Cairo font-bold text-black text-lg md:text-xl lg:text-2xl tracking-[0] leading-[normal] [direction:rtl] text-center md:text-right">
            التفاصيل:
          </h2>

          <div className="flex flex-col w-full gap-3 md:gap-4 lg:gap-[11px]">
            <div className="flex flex-col lg:flex-row justify-end gap-2 md:gap-3 lg:gap-5 w-full px-2 md:px-4">
              <div className="w-full lg:w-[577px] font-Cairo font-semibold text-black text-sm md:text-base lg:text-lg tracking-[0] leading-relaxed [direction:rtl]">
                {service.description}
              </div>
              <div className="w-full lg:w-[147px] text-black text-sm md:text-base lg:text-lg font-Cairo font-bold tracking-[0] leading-[normal] [direction:rtl] text-center lg:text-right">
                الوصف
              </div>
            </div>

            {detailsSections.map((section, index) => (
              <div
                key={index}
                className="flex flex-col lg:flex-row justify-end gap-2 md:gap-3 lg:gap-5 w-full px-2 md:px-4"
              >
                <div className="w-full lg:w-[577px] font-Cairo font-semibold text-black text-sm md:text-base lg:text-lg tracking-[0] leading-relaxed [direction:rtl]">
                  {section.content}
                </div>
                <div className="w-full lg:w-[147px] text-black text-sm md:text-base lg:text-lg font-Cairo font-bold tracking-[0] leading-[normal] [direction:rtl] text-center lg:text-right">
                  {section.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className="text-gray-300 my-2 w-[90%]" />

        <h2 className="self-stretch font-Cairo font-bold text-black text-lg md:text-xl lg:text-2xl text-center tracking-[0] leading-[normal] [direction:rtl]">
          التقييمات والمراجعات ({reviews.length})
        </h2>

        <div className="w-full px-3 md:px-4 lg:px-10">
          {reviewsLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-Blue" />
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-8 font-Cairo text-gray-500 [direction:rtl]">
              لا توجد تقييمات بعد. كن أول من يقيّم!
            </div>
          ) : (
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-4xl mx-auto"
            >
              <CarouselContent>
                {reviews.map((review) => (
                  <CarouselItem
                    key={review.reviewId}
                    className="basis-full xs:basis-1/2 sm:basis-1/2 lg:basis-1/3"
                  >
                    <ReviewCard
                      name={`مريض #${review.patientId}`}
                      describe={review.comment || "بدون تعليق"}
                      rating={review.rating}
                      date={review.review_Date}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          )}
        </div>

        {/* Review Submission Form */}
        {user && role === 0 && (
          <div className="flex flex-col w-full max-w-[280px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[447px] items-center gap-3 md:gap-4 lg:gap-[9px] px-3 md:px-4">
            <div className="w-fit font-Cairo font-semibold text-black text-sm md:text-base lg:text-lg tracking-[0] leading-[normal] [direction:rtl]">
              تحدث عن تجربتك
            </div>

            {reviewSuccess && (
              <div className={`font-Cairo text-sm px-3 py-1.5 rounded-lg ${
                reviewSuccess.includes("بنجاح") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}>
                {reviewSuccess}
              </div>
            )}

            {/* Star Rating Selector */}
            <div className="flex flex-col w-28 md:w-32 gap-1 p-1">
              <div className="flex h-5 md:h-6 items-center justify-center w-full gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 md:w-6 md:h-6 cursor-pointer transition-colors ${
                      star <= newReviewRating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300 hover:text-yellow-300"
                    }`}
                    onClick={() => setNewReviewRating(star)}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col w-full">
              <div className="relative h-[130px] md:h-[150px] lg:h-[172px] bg-white rounded-[15px_15px_0px_15px] md:rounded-[20px_20px_0px_20px] overflow-hidden border border-solid border-[#cccccc]">
                <Textarea
                  placeholder="أضف مراجعتك هنا..."
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  className="absolute top-2.5 right-[8px] md:right-[10px] lg:right-[19px] w-[calc(100%-16px)] md:w-[calc(100%-20px)] lg:w-[92%] h-[calc(100%-20px)] border-0 resize-none font-Cairo font-normal text-[#1a1a1a] text-xs md:text-sm lg:text-base [direction:rtl] focus-visible:ring-0"
                />
              </div>

              <div className="flex items-center justify-between w-full mt-2 md:mt-3">
                <Button
                  onClick={handleSubmitReview}
                  disabled={submittingReview || !newReviewText.trim()}
                  className="bg-Blue hover:bg-Blue-900 text-white font-Cairo px-6 py-2 rounded-2xl"
                >
                  {submittingReview ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "إرسال التقييم"
                  )}
                </Button>
                <div className="font-Cairo font-normal text-[#b3b3b3] text-xs [direction:rtl]">
                  سوف تظهر مراجعتك لزوار مسعف
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
