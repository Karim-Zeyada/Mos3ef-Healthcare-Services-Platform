/** @format */
import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Tooltip,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const currentLocationIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const hospitalIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MapComponent = ({ results }) => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [showDistances, setShowDistances] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCurrentPosition([pos.coords.latitude, pos.coords.longitude]);
          setMapLoaded(true);
        },
        (err) => {
          console.log(err);
          if (results.length > 0) {
            setCurrentPosition([
              results[0].hospitalLatitude,
              results[0].hospitalLongitude,
            ]);
          } else {
            setCurrentPosition([30.0444, 31.2357]); 
          }
          setMapLoaded(true);
        },
        { timeout: 10000, enableHighAccuracy: false }
      );
    } else {
      if (results.length > 0) {
        setCurrentPosition([
          results[0].hospitalLatitude,
          results[0].hospitalLongitude,
        ]);
      } else {
        setCurrentPosition([30.0444, 31.2357]);
      }
      setMapLoaded(true);
    }
  }, [results]);

  if (!currentPosition || !mapLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-center text-lg">جاري تحميل الخريطة...</p>
      </div>
    );
  }

  const getLineColor = (distance) => {
    if (distance < 5) return "green";
    if (distance < 15) return "orange";
    return "red";
  };

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={currentPosition}
        zoom={12}
        style={{
          height: "100%",
          width: "100%",
          position: "relative",
          zIndex: 0,
        }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={currentPosition} icon={currentLocationIcon}>
          <Popup>
            <div className="text-right">
              <strong> موقعك الحالي</strong>
            </div>
          </Popup>
        </Marker>

        {results.map((item, index) => {
          const distance = item.distance || item.distanceKm || 0;

          return (
            <div key={index}>
              {showDistances && (
                <Polyline
                  positions={[
                    currentPosition,
                    [item.hospitalLatitude, item.hospitalLongitude],
                  ]}
                  color={getLineColor(distance)}
                  weight={3}
                  opacity={0.7}
                  dashArray="5, 5"
                >
                  <Tooltip permanent direction="center">
                    {typeof distance === "number"
                      ? distance.toFixed(1)
                      : distance}{" "}
                    كم
                  </Tooltip>
                </Polyline>
              )}
              <Marker
                position={[item.hospitalLatitude, item.hospitalLongitude]}
                icon={hospitalIcon}
              >
                <Popup>
                  <div className="text-right min-w-[200px]">
                    <strong className="text-lg"> {item.name}</strong> <br />
                    <span className="text-gray-600">
                      {item.hospitalName}
                    </span>{" "}
                    <br />
                  </div>
                </Popup>
              </Marker>
            </div>
          );
        })}
      </MapContainer>

      <button
        onClick={() => setShowDistances(!showDistances)}
        className={`px-3 py-1 rounded text-sm font-medium  z-1 absolute bottom-4 left-4 ${
          showDistances
            ? "bg-gray-500 text-white hover:bg-gray-600"
            : "bg-blue-500 text-white hover:bg-blue-600"
        } transition-colors`}
      >
        {showDistances ? "إخفاء الخطوط" : "إظهار الخطوط"}
      </button>
    </div>
  );
};

export default MapComponent;
