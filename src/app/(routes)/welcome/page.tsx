"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import admin from "@/assets/admin.png";
import lecturer from "@/assets/lecturer.jpg";

const WelcomePage = () => {
  const router = useRouter();
  const [selectedLogin, setSelectedLogin] = useState("");

  const handleSelect = (loginType: string) => {
    setSelectedLogin(loginType);
  };

  const handleProceed = () => {
    if (selectedLogin === "admin") {
      router.push("/admin/signin");
    } else if (selectedLogin === "lecturer") {
      router.push("/lecturer/signin");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-green-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome</h1>
        <p className="mb-8 text-gray-600">
          Please select your login type to access the dashboard.
        </p>
        <div className="grid grid-cols-2 gap-6">
          <div
            className={`relative cursor-pointer bg-white border-2 ${
              selectedLogin === "admin" ? "border-blue-500" : "border-gray-300"
            } rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out p-4`}
            onClick={() => handleSelect("admin")}
          >
            <Image
              src={admin}
              alt="Admin"
              className="mx-auto mb-2 w-16 h-16 rounded-full"
            />
            <input
              type="checkbox"
              checked={selectedLogin === "admin"}
              readOnly
              className="absolute top-2 right-2 w-4 h-4 text-blue-500"
            />
            <div className="text-2xl font-semibold mb-2">Admin Login</div>
            <p className="text-sm text-gray-600">Access admin dashboard</p>
          </div>
          <div
            className={`relative cursor-pointer bg-white border-2 ${
              selectedLogin === "lecturer"
                ? "border-green-500"
                : "border-gray-300"
            } rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out p-4`}
            onClick={() => handleSelect("lecturer")}
          >
            <Image
              src={lecturer}
              alt="Lecturer"
              className="mx-auto mb-2 w-16 h-16 rounded-full"
            />
            <input
              type="checkbox"
              checked={selectedLogin === "lecturer"}
              readOnly
              className="absolute top-2 right-2 w-4 h-4 text-green-500"
            />
            <div className="text-2xl font-semibold mb-2">Lecturer Login</div>
            <p className="text-sm text-gray-600">Access lecturer dashboard</p>
          </div>
        </div>
        {selectedLogin && (
          <button
            onClick={handleProceed}
            className="mt-8 bg-indigo-500 text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
          >
            Proceed
          </button>
        )}
      </div>
    </div>
  );
};

export default WelcomePage;
