import React, { useEffect, useState } from "react";
import HomeNavbar from "./HomeNavbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";
import { Loading } from "./Loading";

const HomeLayout = () => {
  const navigate = useNavigate();
  const userInfo = useUserStore((state) => state.user);
  const [checkRole, setCheckRole] = useState<boolean>(true);

  useEffect(() => {
    if (!userInfo) return;

    if (userInfo?.role === "tenant") {
      navigate("/tenant");
    } else if (userInfo?.role === "landlord") {
      navigate("/landlord");
    } else {
      setCheckRole(false);
    }
  }, [userInfo, navigate]);

  if (!userInfo || checkRole) return <Loading />;

  return (
    <div>
      <HomeNavbar />

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;
