import { useUserStore } from "@/store/useUserStore";
import axios from "axios";
import { useEffect, useState } from "react";

export const useSyncInfo = () => {
  const setUserToken = useUserStore((state) => state.setUserToken);
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const syncAuth = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/auth/refresh", {
          withCredentials: true,
        });

        const { accessToken, user } = response.data;
        setUserToken(accessToken);
        setUser(user);
      } catch (error) {
        clearUser();
      } finally {
        setIsInitializing(false);
      }
    };

    syncAuth();
  }, [setUserToken, setUser, clearUser]);

  return { isInitializing };
};
