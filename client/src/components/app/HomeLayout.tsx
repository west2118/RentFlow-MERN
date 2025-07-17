import React from "react";
import HomeNavbar from "./HomeNavbar";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
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
