import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext.jsx";

export const useAuth = () => {
  return useContext(AuthContext);
};
