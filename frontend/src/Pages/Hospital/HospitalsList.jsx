/** @format */

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Loader2,
  Building2,
  MapPin,
  Phone,
  Globe,
  Search,
  Stethoscope,
  Heart,
  UserCheck,
  Hospital as HospitalIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getServiceImage } from "../../utils/imageHelper";
import axios from "axios";

export const HospitalsList = () => {
  const { user, role } = useAuth();

  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [viewMode, setViewMode] = useState("all"); // 'all' or 'myHospitals'
  const [interactedHospitalNames, setInteractedHospitalNames] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseUrl = "http://localhost:5000/api/";

  // Fetch all hospitals (Public for guests and logged in users)
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        setLoading(true);
        setError(null);

        // Public request - no auth mandatory
        const res = await axios.get(`${baseUrl}Hospital/GetAll`);
        const list = res.data?.data || [];
        setHospitals(list);
        setFilteredHospitals(list);
      } catch (err) {
        console.error("Error fetching hospitals:", err);
        setError("فشل في جلب قائمة المستشفيات، يرجى المحاولة مرة أخرى.");
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  // For logged-in patients (role === 0), fetch their saved services to detect interacted hospitals
  useEffect(() => {
    const fetchPatientInteractions = async () => {
      const token = localStorage.getItem("authToken");
      if (!token || !user || role !== 0) return;

      try {
        const savedRes = await axios.get(
          `${baseUrl}Patients/my-saved-services?pageNumber=1&pageSize=100`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const savedItems = savedRes.data.data?.items || [];
        const interactedNames = new Set(
          savedItems.map((item) => item.hospitalName).filter(Boolean)
        );
        setInteractedHospitalNames(interactedNames);

        // If patient has interacted hospitals, default to 'myHospitals' tab
        if (interactedNames.size > 0) {
          setViewMode("myHospitals");
        }
      } catch (err) {
        console.error("Error fetching patient interactions:", err);
      }
    };

    fetchPatientInteractions();
  }, [user, role]);

  // Apply filters
  useEffect(() => {
    let result = hospitals;

    // View mode filter (My Hospitals vs All Hospitals)
    if (user && viewMode === "myHospitals") {
      result = result.filter(
        (h) =>
          interactedHospitalNames.has(h.name) ||
          interactedHospitalNames.has(h.hospitalName)
      );
    }

    // Search keyword filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (h) =>
          h.name?.toLowerCase().includes(term) ||
          h.address?.toLowerCase().includes(term) ||
          h.region?.toLowerCase().includes(term) ||
          h.description?.toLowerCase().includes(term)
      );
    }

    // Region filter
    if (selectedRegion !== "all") {
      result = result.filter((h) => h.region === selectedRegion);
    }

    setFilteredHospitals(result);
  }, [searchTerm, selectedRegion, viewMode, hospitals, interactedHospitalNames, user]);

  const uniqueRegions = Array.from(
    new Set(hospitals.map((h) => h.region).filter(Boolean))
  );

  const isInteracted = (hospitalName) => {
    return interactedHospitalNames.has(hospitalName);
  };

  return (
    <div className="pt-28 pb-16 w-full max-w-7xl mx-auto px-4 md:px-8">
      {/* Header Banner */}
      <div className="text-center mb-8 [direction:rtl]">
        <h1 className="font-Cairo font-bold text-Blue-900 text-3xl md:text-4xl mb-3">
          دليل المستشفيات والمراكز الطبية
        </h1>
        <p className="font-Cairo text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          استكشف المستشفيات الشريكة وتعرف على خدماتها وأرقام التواصل ومواقعها الجغرافية
        </p>
      </div>

      {/* Guest Mode Informational Banner */}
      {!user && (
        <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-Blue-50 via-white to-Blue-50 border border-Blue-200 flex flex-col sm:flex-row items-center justify-between gap-4 [direction:rtl]">
          <div className="flex items-center gap-3">
            <HospitalIcon className="w-6 h-6 text-Blue shrink-0" />
            <p className="font-Cairo text-Blue-900 text-sm md:text-base">
              أنت تتصفح جميع المستشفيات كزائر. سجل دخولك لمتابعة مستشفياتك المفضلة والخدمات المحفوظة.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link to="/SignUp-Hospital">
              <Button size="sm" variant="outline" className="border-Blue-900/30 text-Blue-900 hover:bg-Blue-100/60 font-Cairo rounded-xl">
                انضم كشريك طبي
              </Button>
            </Link>
            <Link to="/LogIn">
              <Button size="sm" className="bg-Blue text-white hover:bg-Blue-900 font-Cairo rounded-xl">
                تسجيل الدخول
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Logged-in Mode Tabs Toggle */}
      {user && role === 0 && (
        <div className="flex justify-center mb-8 [direction:rtl]">
          <div className="bg-Blue-50 p-1.5 rounded-2xl border border-Blue-200 flex gap-2">
            <button
              onClick={() => setViewMode("myHospitals")}
              className={`px-5 py-2 rounded-xl font-Cairo text-sm md:text-base transition-all duration-200 flex items-center gap-2 ${
                viewMode === "myHospitals"
                  ? "bg-Blue text-white shadow-sm font-semibold"
                  : "text-Blue-900 hover:bg-white/60"
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>مستشفياتي التي تعاملت معها</span>
              {interactedHospitalNames.size > 0 && (
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  viewMode === "myHospitals" ? "bg-white/20 text-white" : "bg-Blue text-white"
                }`}>
                  {interactedHospitalNames.size}
                </span>
              )}
            </button>

            <button
              onClick={() => setViewMode("all")}
              className={`px-5 py-2 rounded-xl font-Cairo text-sm md:text-base transition-all duration-200 flex items-center gap-2 ${
                viewMode === "all"
                  ? "bg-Blue text-white shadow-sm font-semibold"
                  : "text-Blue-900 hover:bg-white/60"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>جميع المستشفيات المتاحة</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                viewMode === "all" ? "bg-white/20 text-white" : "bg-Blue-200 text-Blue-900"
              }`}>
                {hospitals.length}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between [direction:rtl]">
        <div className="relative w-full md:w-96">
          <Input
            placeholder="ابحث باسم المستشفى أو العنوان..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="font-Cairo pr-10 pl-4 py-2 border-Blue/30 rounded-2xl focus:border-Blue"
          />
          <Search className="w-5 h-5 text-Blue absolute right-3 top-1/2 -translate-y-1/2" />
        </div>

        {uniqueRegions.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            <Button
              size="sm"
              variant={selectedRegion === "all" ? "default" : "outline"}
              onClick={() => setSelectedRegion("all")}
              className={`font-Cairo rounded-xl ${
                selectedRegion === "all" ? "bg-Blue text-white" : "border-Blue/30 text-Blue-900"
              }`}
            >
              الكل
            </Button>
            {uniqueRegions.map((region) => (
              <Button
                key={region}
                size="sm"
                variant={selectedRegion === region ? "default" : "outline"}
                onClick={() => setSelectedRegion(region)}
                className={`font-Cairo rounded-xl whitespace-nowrap ${
                  selectedRegion === region ? "bg-Blue text-white" : "border-Blue/30 text-Blue-900"
                }`}
              >
                {region}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Loading / Error States */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-Blue mb-3" />
          <p className="font-Cairo text-Blue-900 text-lg">جاري تحميل المستشفيات...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl text-center font-Cairo max-w-xl mx-auto [direction:rtl]">
          <p className="font-bold text-lg mb-2">{error}</p>
        </div>
      ) : filteredHospitals.length === 0 ? (
        <div className="text-center py-16 font-Cairo text-gray-500 [direction:rtl] bg-white rounded-3xl border border-gray-100 p-8">
          <Building2 className="w-16 h-16 mx-auto text-gray-300 mb-3" />
          {user && viewMode === "myHospitals" ? (
            <div>
              <p className="text-xl font-semibold text-Blue-900 mb-2">
                لم تقم بالتعامل مع مستشفيات بعد
              </p>
              <p className="text-sm text-gray-500 mb-4">
                عندما تقوم بحفظ خدمات أو تقييمها ستظهر المستشفيات المعنية هنا.
              </p>
              <Button
                onClick={() => setViewMode("all")}
                className="bg-Blue hover:bg-Blue-900 text-white font-Cairo rounded-xl"
              >
                عرض جميع المستشفيات
              </Button>
            </div>
          ) : (
            <p className="text-xl font-semibold">لم يتم العثور على أي مستشفيات مطابقة للبحث</p>
          )}
        </div>
      ) : (
        /* Hospital Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 [direction:rtl]">
          {filteredHospitals.map((hospital, index) => {
            const hasInteracted = isInteracted(hospital.name);
            return (
              <Card
                key={index}
                className="overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all rounded-3xl flex flex-col bg-white"
              >
                {/* Image */}
                <div className="h-48 w-full relative bg-Blue-50 overflow-hidden">
                  <img
                    src={getServiceImage(hospital.imageUrl)}
                    alt={hospital.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  {hospital.region && (
                    <span className="absolute top-3 right-3 bg-Blue-900/80 text-white font-Cairo text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                      {hospital.region}
                    </span>
                  )}

                  {/* Interacted Badge */}
                  {user && hasInteracted && (
                    <span className="absolute top-3 left-3 bg-Green text-white font-Cairo text-xs px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                      <Heart className="w-3 h-3 fill-white" />
                      <span>سبق التعامل</span>
                    </span>
                  )}
                </div>

                {/* Content */}
                <CardContent className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-Cairo font-bold text-Blue-900 text-xl mb-2">
                      {hospital.name}
                    </h3>
                    {hospital.description && (
                      <p className="font-Cairo text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
                        {hospital.description}
                      </p>
                    )}

                    <div className="space-y-2 mb-4 text-sm font-Cairo text-gray-700">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-Blue shrink-0" />
                        <span className="truncate">{hospital.address || "العنوان غير محدد"}</span>
                      </div>

                      {hospital.phone_Number && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-Green shrink-0" />
                          <a
                            href={`tel:${hospital.phone_Number}`}
                            className="hover:text-Green transition-colors"
                          >
                            {hospital.phone_Number}
                          </a>
                        </div>
                      )}

                      {hospital.website && (
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-Blue shrink-0" />
                          <a
                            href={
                              hospital.website.startsWith("http")
                                ? hospital.website
                                : `https://${hospital.website}`
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="text-Blue hover:underline truncate"
                          >
                            الموقع الإلكتروني
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Services Count / Action Button */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-Blue-900 font-Cairo text-xs">
                      <Stethoscope className="w-4 h-4 text-Blue" />
                      <span>{hospital.services?.length || 0} خدمة متوفرة</span>
                    </div>

                    {hospital.phone_Number && (
                      <a href={`tel:${hospital.phone_Number}`}>
                        <Button
                          size="sm"
                          className="bg-Green hover:bg-Green-600 text-white font-Cairo text-xs rounded-xl"
                        >
                          اتصال الآن
                        </Button>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default HospitalsList;
