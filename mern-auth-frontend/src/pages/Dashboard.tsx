import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Welcome Card */}
        <div className="bg-white/90 backdrop-blur rounded-3xl shadow-2xl p-8 mb-8 border border-white/60">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center shadow">
              <span className="text-4xl text-white">👤</span>
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900">Welcome, {user?.name}!</h1>
              <p className="text-gray-600">You are successfully logged in</p>
            </div>
          </div>
        </div>

        {/* User Info Card */}
        <div className="bg-white/90 backdrop-blur rounded-3xl shadow-lg p-8 mb-8 border border-white/60">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Your Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <p className="text-gray-600 text-sm mb-1">Name</p>
              <p className="text-gray-900 font-semibold text-lg">{user?.name}</p>
            </div>
            <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
              <p className="text-gray-600 text-sm mb-1">Email</p>
              <p className="text-gray-900 font-semibold text-lg">{user?.email}</p>
            </div>
            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
              <p className="text-gray-600 text-sm mb-1">User ID</p>
              <p className="text-gray-900 font-semibold text-lg break-all text-sm">{user?.id}</p>
            </div>
            <div className="bg-violet-50 rounded-xl p-4 border border-violet-100">
              <p className="text-gray-600 text-sm mb-1">Status</p>
              <p className="text-emerald-700 font-semibold text-lg">✓ Authenticated</p>
            </div>
          </div>
        </div>

        {/* Features Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <span className="text-3xl mb-2 block">✓</span>
              <h3 className="font-semibold text-gray-800">Secure Login</h3>
              <p className="text-gray-600 text-sm mt-1">Password encrypted with bcrypt</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <span className="text-3xl mb-2 block">🔐</span>
              <h3 className="font-semibold text-gray-800">JWT Tokens</h3>
              <p className="text-gray-600 text-sm mt-1">Secure token-based authentication</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
              <span className="text-3xl mb-2 block">⚡</span>
              <h3 className="font-semibold text-gray-800">Fast API</h3>
              <p className="text-gray-600 text-sm mt-1">Express.js backend with in-memory DB</p>
            </div>
          </div>
        </div>

        {/* Code Practice Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Code Practice</h2>
          <p className="text-gray-600 mb-6">Start practicing DSA problems like LeetCode!</p>
          <button
            onClick={() => navigate('/code')}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold px-8 py-3 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition duration-200"
          >
            💻 Start Coding
          </button>
        </div>
      </div>
    </div>
  );
};
