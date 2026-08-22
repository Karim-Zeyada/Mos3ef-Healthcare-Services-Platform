import React, { useState } from "react";
import { Button } from "./ui/button";
import { HeartIcon } from "lucide-react";
import axios from "axios";

export const HeartButton = ({ serviceId, initialSaved = false }) => {
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);

  const baseUrl = "http://localhost:5000/api/";

  const handleToggleSave = async (e) => {
    e.stopPropagation();

    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      setLoading(true);

      if (isSaved) {
        await axios.delete(`${baseUrl}Patients/my-saved-services/${serviceId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsSaved(false);
      } else {
        await axios.post(
          `${baseUrl}Patients/my-saved-services/${serviceId}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setIsSaved(true);
      }
    } catch (err) {
      console.error("Error toggling save:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`z-10 absolute top-[19px] right-4 w-8 h-8 p-0 transition-transform ${
        loading ? "opacity-50 pointer-events-none" : "hover:scale-110"
      }`}
      aria-label={isSaved ? "Remove from favorites" : "Add to favorites"}
      onClick={handleToggleSave}
    >
      <HeartIcon
        className={`w-6 h-6 transition-colors ${
          isSaved
            ? "fill-red-500 text-red-500"
            : "fill-Blue-900 text-Blue-900"
        }`}
      />
    </Button>
  );
};
