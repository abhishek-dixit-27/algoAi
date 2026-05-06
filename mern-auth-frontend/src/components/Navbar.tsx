import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-white">🔐 Auth App</span>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <div className="text-white">
                  <p className="text-sm">Welcome</p>
                  <p className="font-semibold">{user?.name}</p>
                </div>
                <button
                  onClick={() => navigate('/code')}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition duration-200"
                >
                  💻 Code Practice
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="text-white hover:text-blue-200 transition duration-200"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-200"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
