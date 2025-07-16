import { useAuthStore } from "@/store/auth.store";
import api from "./index";
import { setAuthToken } from "./token";

export const logout = async () => {
  try {
    await api.post("/auth/signout");
  } catch {
    // even if request fails, clear client state
  }

  const store = useAuthStore.getState();
  store.setAccessToken(""); // ✅ Zustand cleared
  store.setIsLoggedIn(false);
  setAuthToken(null);
  // ✅ Remove from axios
  window.location.href = "/login"; // ✅ Force redirect
};
