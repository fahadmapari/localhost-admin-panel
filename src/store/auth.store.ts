import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
  user:
    | {
        id: string;
        name: string;
        role: string;
      }
    | undefined;
  setUser: (user: { id: string; name: string; role: string }) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  accessToken: "",
  user: undefined,
  setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
  setAccessToken: (accessToken: string) => set({ accessToken }),
  setUser: (user: { id: string; name: string; role: string }) => set({ user }),
}));
