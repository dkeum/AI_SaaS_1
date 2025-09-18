import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { MenuIcon, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { SignIn, useUser } from "@clerk/clerk-react";
import Dashboard from "./Dashboard";

const Layout = () => {
  const navigate = useNavigate();

  const [sidebar, setSideBar] = useState(false);
  const { user } = useUser();

  return user ? (
    <div className="flex flex-col items-start justify-start h-screen">
      <nav className="w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-200">
        {" "}
        <img
          src={assets.logo}
          alt=""
          className="cursor-pointer w-32 sm:w-44"
          onClick={() => {
            navigate("");
          }}
        />
        {sidebar ? (
          <X
            className="w-6 h-5 text-gray-600 sm:hidden"
            onClick={() => {
              setSideBar(false);
            }}
          />
        ) : (
          <MenuIcon
            className="w-6 h-5 text-gray-600 sm:hidden"
            onClick={() => {
              setSideBar(true);
            }}
          />
        )}
      </nav>
      

      <div className="flex-1 w-full flex h-[calc(100vh-64px)]">
        <Sidebar sidebar={sidebar} setSideBar={setSideBar} />
        <div className="flex-1 bg-[#F4F7FB]">
        
          <Outlet />
        </div>
        <Dashboard/>
      </div>

  
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  );
};

export default Layout;
