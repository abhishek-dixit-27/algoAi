import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-blue-700 to-slate-900">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-20 sm:py-32 flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
          Secure Authentication Made Simple
        </h1>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl">
          Modern, fast, and secure MERN stack authentication. Built with React, Express, MongoDB, and JWT tokens.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 mb-12 flex-col sm:flex-row">
          <button
            onClick={() => navigate('/register')}
            className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition duration-200 shadow-lg"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-800 transition duration-200 border-2 border-white"
          >
            Sign In
          </button>
        </div>

        {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/30 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] hover:bg-white/12 transition">
            <div className="text-4xl mb-4">🔐</div>
            <h3 className="text-2xl font-bold text-white mb-3">Secure</h3>
            <p className="text-white/80">
              Industry-standard bcrypt password hashing and JWT token authentication
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/30 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] hover:bg-white/12 transition">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold text-white mb-3">Fast</h3>
            <p className="text-white/80">
              Built with modern technologies for optimal performance and user experience
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/30 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] hover:bg-white/12 transition">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-2xl font-bold text-white mb-3">Responsive</h3>
            <p className="text-white/80">
              Beautiful, responsive design that works on all devices and screen sizes
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-white mb-8">Built with Modern Tech</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center border border-white border-opacity-20">
              <div className="text-2xl mb-2">⚛️</div>
              <p className="text-white font-semibold">React</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center border border-white border-opacity-20">
              <div className="text-2xl mb-2">🔧</div>
              <p className="text-white font-semibold">Express</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center border border-white border-opacity-20">
              <div className="text-2xl mb-2">🍃</div>
              <p className="text-white font-semibold">MongoDB</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center border border-white border-opacity-20">
              <div className="text-2xl mb-2">🎨</div>
              <p className="text-white font-semibold">Tailwind</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
