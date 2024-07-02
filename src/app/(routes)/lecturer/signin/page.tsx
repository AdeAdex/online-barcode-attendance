'use client'

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Lecturer } from "@/types";

const LecturerSignInPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    const storedLecturers: Lecturer[] = JSON.parse(localStorage.getItem("lecturers") || "[]");
    const lecturer = storedLecturers.find(
      (lec) => lec.email === email && lec.password === password
    );

    if (lecturer) {
      localStorage.setItem("isLecturer", "true");
      localStorage.setItem("lecturer", JSON.stringify(lecturer));
      Swal.fire("Success", "You have successfully signed in!", "success");
      router.push("/lecturer/dashboard");
    } else {
      Swal.fire("Error", "Invalid email or password", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Lecturer Sign In</h2>
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LecturerSignInPage;
