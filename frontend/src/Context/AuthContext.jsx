/** @format */

import { createContext, useState, useEffect } from "react";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  const baseUrl = "http://localhost:5000/api/";

  // ------------------------ Signup Function ------------------ //
  const signup = async (data) => {
    try {
      const res = await axios.post(`${baseUrl}Account/register/patient`, data);
      console.log(res.data);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message };
    }
  };

  // ------------------------ Login Function ------------------ //
  const login = async (data) => {
    try {
      const res = await axios.post(`${baseUrl}Account/login`, data);

      const authData = res.data?.data || res.data;
      const token = authData?.token;
      const userType = authData?.userType;

      const normalizedRole = userType === 1 || userType === "Hospital" ? 1 : 0;
      setRole(normalizedRole);
      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", normalizedRole.toString());

      // ------------------- Fetch user Profile Immediately ------------------- //
      let userData = {
        name: authData?.name || authData?.email || "المستخدم",
        email: authData?.email,
        userType: normalizedRole,
      };

      try {
        const profileUrl =
          normalizedRole === 0
            ? `${baseUrl}Patients/my-profile`
            : `${baseUrl}Hospital/Get-profile`;

        const profileRes = await axios.get(profileUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const profileData = profileRes.data?.data || profileRes.data;
        if (profileData) {
          userData = {
            ...userData,
            ...profileData,
            imageUrl: profileData.imageUrl
              ? (profileData.imageUrl.startsWith("http") ? profileData.imageUrl : `http://localhost:5000${profileData.imageUrl}`)
              : null,
          };
        }
      } catch (profileErr) {
        console.warn("Could not fetch extended profile; using basic auth info:", profileErr);
      }

      setUser(userData);
      console.log("Logged in user:", userData);

      return { success: true, role: normalizedRole };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "فشل تسجيل الدخول، يرجى التحقق من البيانات" };
    }
  };

  // ------------------------ Check login on App load ------------------ //
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedRole = localStorage.getItem("userRole"); // 0 = Patient, 1 = Hospital

    if (token && storedRole !== null) {
      const parsedRole = parseInt(storedRole, 10);
      setRole(parsedRole);

      const profileUrl =
        parsedRole === 0
          ? `${baseUrl}Patients/my-profile`
          : `${baseUrl}Hospital/Get-profile`;

      axios
        .get(profileUrl, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          const profileData = res.data?.data || res.data;
          const userData = {
            ...profileData,
            imageUrl: profileData?.imageUrl
              ? (profileData.imageUrl.startsWith("http") ? profileData.imageUrl : `http://localhost:5000${profileData.imageUrl}`)
              : null,
          };
          setUser(userData);
        })
        .catch((err) => {
          console.warn("Session check failed:", err);
          // If profile fetch fails with 401 Unauthorized, log out
          if (err.response?.status === 401) {
            logout();
          }
        });
    }
  }, []);

  // ------------------------ Logout Function ------------------ //
  const logout = async () => {
    const token = localStorage.getItem("authToken");

    try {
      await axios.post(
        `${baseUrl}Account/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.log("Logout API failed:", error);
    }

    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    setUser(null);
    setRole(null);
  };

  // ------------------------ Update Profile Function ------------------ //
  const updateProfile = async (data) => {
    try {
      const token = localStorage.getItem("authToken");
      const fd = new FormData();
      fd.append("Name", data.name);
      fd.append("Email", data.email);
      fd.append("PhoneNumber", data.phoneNumber);
      fd.append("Address", data.address);
      if (data.profilePicture) fd.append("ProfilePicture", data.profilePicture);

      await axios.put(`${baseUrl}Patients/my-profile`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      // Re-fetch the updated patient profile
      const res = await axios.get(`${baseUrl}Patients/my-profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userData = {
        ...res.data.data,
        imageUrl: res.data.data.imageUrl
          ? `http://localhost:5000${res.data.data.imageUrl}`
          : null,
      };

      setUser(userData);
      return { success: true, updatedUser: userData };
    } catch (err) {
      console.log("Update profile failed:", err);
      return {
        success: false,
        message: err.response?.data?.message || "حدث خطأ",
      };
    }
  };
  const updateHospitalProfile = async (data) => {
    try {
      const token = localStorage.getItem("authToken");
      const fd = new FormData();
      fd.append("name", data.name);
      fd.append("Phone_Number", data.phone_Number);
      fd.append("address", data.address);
      fd.append("description", data.description);
      fd.append("opening_Hours", data.opening_Hours);
      fd.append("website", data.website);
      fd.append("region", data.region);
      fd.append("latitude", data.latitude);
      fd.append("longitude", data.longitude);
      if (data.profileImage) fd.append("profileImage", data.profileImage);

      // Send the update request once
      const updateRes = await axios.put(`${baseUrl}Hospital/Update-profile`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      // Use the response from the PUT to update state
      const updated = updateRes.data.data;

      const mergedUser = {
        ...user,
        ...updated,
        imageUrl: updated.imageUrl
          ? `http://localhost:5000${updated.imageUrl}`
          : user?.imageUrl,
      };

      setUser(mergedUser);

      return { success: true, updatedUser: mergedUser };
    } catch (err) {
      console.log("Update profile failed:", err);
      return {
        success: false,
        message: err.response?.data?.message || "حدث خطأ",
      };
    }
  };

  // ---------------------------------------------------
  const changePassword = async (passwordData) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${baseUrl}Account/change-password`,
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
          confirmNewPassword: passwordData.confirmNewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data; // return success response
    } catch (error) {
      console.error("Change password error:", error.response?.data);
      throw error;
    }
  };
  const registerHospital = async (data) => {
    try {
      const response = await axios.post(
        `${baseUrl}Account/register/hospital`,
        data
      );
      return { success: true, data: response.data };
    } catch (error) {
      const responseData = error.response?.data;
      let errorMsg = responseData?.message || responseData?.Message;

      if (!errorMsg && responseData?.errors) {
        const errorList = Object.values(responseData.errors).flat();
        errorMsg = errorList.join(", ");
      }

      return {
        success: false,
        message:
          errorMsg ||
          "حدث خطأ أثناء التسجيل، يُرجى التأكد من صحة البيانات والمحاولة مرة أخرى",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        signup,
        login,
        logout,
        updateProfile,
        registerHospital,
        changePassword,
        updateHospitalProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
