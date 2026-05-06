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
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <div className="h-9 w-9 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M7.5 10V7.8C7.5 5.149 9.649 3 12.3 3C14.951 3 17.1 5.149 17.1 7.8V10"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M6.6 10H18C19.1046 10 20 10.8954 20 12V17.2C20 19.299 18.299 21 16.2 21H8.4C6.301 21 4.6 19.299 4.6 17.2V12C4.6 10.8954 5.49543 10 6.6 10Z"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.3 14.1V16.4"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            <div className="flex flex-col leading-tight">
              <span className="text-lg font-bold text-white">
                Auth App
              </span>
              <span className="text-xs text-white/80">MERN Authentication</span>
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
