import { setAuthToken } from "@/lib/axios/token";
import { BASE_API_URL } from "@/lib/constants";
import { useAuthStore } from "@/store/auth.store";
import axios from "axios";
import { redirect } from "react-router";

export const routeProtector = async () => {
  const { accessToken, setAccessToken, setIsLoggedIn } =
    useAuthStore.getState();
  if (accessToken) {
    return null;
  }

  try {
    const res = await axios.post(BASE_API_URL + "/auth/refresh", undefined, {
      withCredentials: true,
    });
    setAccessToken(res.data.data.accessToken);
    setAuthToken(res.data.data.accessToken);
    setIsLoggedIn(true);
  } catch {
    setAccessToken("");
    setAuthToken(null);
    setIsLoggedIn(false);
    throw redirect("/login");
  }

  return null;
};
