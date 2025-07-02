'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-white px-4 text-center">
      {/* College Logo */}
      <div className="mb-8">
        <Image
          src="/jit-logo.png" // 🔁 place your logo here in public folder
          alt="JIT College Logo"
          width={200}
          height={200}
          className="mx-auto"
        />
      </div>

      {/* Welcome Text */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-6 animate-pulse">
        WELCOME TO <span className="text-indigo-900">JIT(Autonomous)</span>
      </h1>

      {/* Tagline */}
      <p className="text-lg sm:text-xl text-gray-700 mb-10 max-w-xl">
        Empowering Education Through Innovation & Technology.
      </p>

      {/* Redirect Button */}
      <Link href="/register">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300">
          Go to Registration
        </button>
      </Link>
    </div>
  );
}
