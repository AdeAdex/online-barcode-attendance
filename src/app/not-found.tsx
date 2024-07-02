import React from 'react';
import Link from 'next/link';

function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <div className="mb-4">
        </div>
        <h1 className="text-4xl font-bold mb-2" style={{ color: '#F9A21B' }}>Page Not Found</h1>
        <p className="text-gray-600 mb-6">Sorry, the page you are looking for does not exist.</p>
      </div>
    </div>
  );
}

export default NotFound;
