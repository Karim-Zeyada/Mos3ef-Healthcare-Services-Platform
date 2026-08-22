/** @format */

// Curated high quality medical and hospital photography
export const categoryImages = {
  EmergencyRoom: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&auto=format&fit=crop&q=80",
  ICU: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&auto=format&fit=crop&q=80",
  NICU: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&auto=format&fit=crop&q=80",
  OperationTheater: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&auto=format&fit=crop&q=80",
  CardiologyUnit: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&auto=format&fit=crop&q=80",
  Radiology: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80",
  Laboratory: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=80",
  BloodBank: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=800&auto=format&fit=crop&q=80",
  Pharmacy: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&auto=format&fit=crop&q=80",
  AmbulanceService: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&auto=format&fit=crop&q=80",
  DentalClinic: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&auto=format&fit=crop&q=80",
  PrivateRoom: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=800&auto=format&fit=crop&q=80",
  GeneralWard: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80",
  MaternityWard: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&auto=format&fit=crop&q=80",
  PediatricWard: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&auto=format&fit=crop&q=80",
  DialysisUnit: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80",
  Rehabilitation: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=80",
  OutpatientClinic: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80",
};

export const defaultHospitalImage =
  "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&auto=format&fit=crop&q=80";

/**
 * Returns a valid, high quality image URL for a hospital or service
 * @param {string|null} image - Direct image URL or backend relative path
 * @param {string|number|null} category - Service category (key or number)
 * @returns {string} Fully resolved image URL
 */
export const getServiceImage = (image, category = null) => {
  if (image && typeof image === "string") {
    if (image.startsWith("http")) {
      return image;
    }
    return `http://localhost:5000${image}`;
  }

  // Check category mapping
  if (category) {
    if (typeof category === "string" && categoryImages[category]) {
      return categoryImages[category];
    }
  }

  return defaultHospitalImage;
};
