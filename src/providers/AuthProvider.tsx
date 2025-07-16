import { setAuthToken } from "@/lib/axios/token";
import { BASE_API_URL } from "@/lib/constants";
import { useAuthStore } from "@/store/auth.store";
import axios from "axios";
import { useEffect } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setIsLoggedIn, setAccessToken, isLoggedIn, accessToken } =
    useAuthStore();

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const res = await axios.post(
          BASE_API_URL + "/auth/refresh",
          undefined,
          {
            withCredentials: true,
          }
        );
        setAccessToken(res.data.data.accessToken);
        setAuthToken(res.data.data.accessToken);
        setIsLoggedIn(true);
      } catch {
        setAccessToken("");
        setAuthToken(null);
        setIsLoggedIn(false);
      }
    };

    if (!isLoggedIn || !accessToken) {
      fetchAccessToken();
    }
  }, []);

  return children;
};

export default AuthProvider;
