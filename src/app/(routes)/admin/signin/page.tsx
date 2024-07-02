'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

function AdminSignInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
      if (username === 'admin' && password === 'password') {
          localStorage.setItem('isAdmin', 'true');
          router.push('/admin/dashboard');
      } else {
          Swal.fire({
            icon: 'error',
            title: 'Invalid credentials',
            text: 'Please check your username and password and try again.',
            confirmButtonColor: '#3085d6',
          });
      }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default AdminSignInPage;
