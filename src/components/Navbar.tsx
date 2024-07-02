"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";

const NavBar: React.FC = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    const isLecturer = localStorage.getItem("isLecturer");
    setIsLoggedIn(!!isAdmin || !!isLecturer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLecturer");
    localStorage.removeItem("lecturer");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("admin");
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    router.push("/");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogoClick = () => {
    router.push("/");
  };


  return (
    <nav className="fixed left-0 top-0 w-full z-50 bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4 items-center cursor-pointer" onClick={handleLogoClick}>
          <Image
            src={logo}
            alt="Logo"
            width={32}
            height={32}
            className="w-9 h-9"
          />
          <div className="text-[12px] md:text-lg font-bold">Online Class Attendance</div>
        </div>
        {isLoggedIn ? (
          <div className="relative">
            <FaUserCircle
              className="text-3xl cursor-pointer"
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-2 z-20">
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                >
                  Logout
                </button>
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    // router.push("/settings");
                  }}
                  className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                >
                  Settings
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/welcome" className="py-2 px-6 bg-blue-500 rounded-md">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
