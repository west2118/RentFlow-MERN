import type { UserType } from "@/types/userTypes";
import { create } from "zustand";

type UserStore = {
  userToken: string | null;
  user: UserType | null;
  setUserToken: (token: string | null) => void;
  setUser: (user: UserType) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  userToken: null,
  setUser: (user) => set({ user }),
  setUserToken: (token) => set({ userToken: token }),
  clearUser: () => set({ user: null, userToken: null }),
}));
