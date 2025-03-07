import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#111111] px-4 text-center">
      <h1 className="text-6xl font-bold text-white mb-4">404</h1>
      <h2 className="text-2xl font-medium text-white/80 mb-8">Page Not Found</h2>
      <p className="text-white/60 max-w-md mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved to another URL.
      </p>
      <Link 
        href="/"
        className="px-6 py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
} 