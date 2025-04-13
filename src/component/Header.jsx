import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import logo from '../constants/logo192.jpeg';
import { removeLocalStorage } from '../Utils/storageutility';
import { setLogoutUserAct } from '../store/auth/authslice';
import { accessTokenKey } from '../constants/storageconstants';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { loginResp } = useSelector(({ auth }) => ({ loginResp: auth.loginResp }), shallowEqual);

  const token = localStorage.getItem(accessTokenKey);
  const isLoggedIn = Boolean(token);
  const username = loginResp?.userInfo?.UserName || 'User';
  const role = loginResp?.userInfo?.UserRole || 'user'

  const handleLogin = () => navigate('/login');
  const handleSignUp = () => navigate('/signup');
  const handleLogout = () => {
    removeLocalStorage(accessTokenKey);
    dispatch(setLogoutUserAct());
    navigate('/login');
  };

  const handleDropdownToggle = () => setDropdownOpen(!dropdownOpen);
  const handleMobileMenuToggle = () => setMobileMenuOpen(!mobileMenuOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest('.dropdown-toggle')
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 md:h-14" />
          <span className="ml-2 text-xl font-bold hidden sm:block"></span>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="block md:hidden text-gray-600 focus:outline-none"
          onClick={handleMobileMenuToggle}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Search Input */}
        <div className="hidden md:flex flex-1 justify-center px-4">
          <input
            type="text"
            placeholder="Search Courses"
            className="bg-gray-100 text-gray-700 rounded-full focus:ring-2 focus:ring-blue-300 px-4 py-2 w-full max-w-lg"
          />
        </div>

        {/* User Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={handleDropdownToggle}
                className="dropdown-toggle bg-transparent text-red-600 font-bold py-2 px-4 text-lg rounded focus:outline-none" 
              >
                Hi, {username}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg text-gray-700">
                  <ul>
                  <li
                    onClick={() => {
                      console.log('Navigating to My Courses');
                      setDropdownOpen(false);
                      navigate('/mycourses');
                    }}
                    className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                  >
                    My Courses
                  </li>

                  {role === 'superadmin' && (
                    <li
                      onClick={() => {
                        console.log('Navigating to Approval page (SuperAdmin)');
                        setDropdownOpen(false);
                        navigate('/RequestApproval');
                      }}
                      className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                    >
                      Approval Request
                    </li>
                  )}

                  {role === 'admin' && (
                    <li
                      onClick={() => {
                        console.log('Navigating to Add Course (Admin)');
                        setDropdownOpen(false);
                        navigate('/admin');
                      }}
                      className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                    >
                      Add Course
                    </li>
                  )}

                  {role === 'admin' && (
                    <li
                      onClick={() => {
                        console.log('Navigating to Add Videos (Admin)');
                        setDropdownOpen(false);
                        navigate('/addvideos');
                      }}
                      className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                    >
                      Add Video
                    </li>
                  )}

                  <li
                    onClick={handleLogout}
                    className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                  >
                    Logout
                  </li>
                </ul>

                </div>
              )}
            </div>
          ) : (
            <div className="space-x-4">
              <button
                onClick={handleLogin}
                className="bg-red-600 text-white py-2 px-4 rounded-full text-lg font-bold" style={{backgroundColor:"#BA232C"}}
              >
                Login
              </button>
              <button
                onClick={handleSignUp}
                className="bg-red-600 text-white py-2 px-4 rounded-full text-lg font-bold" style={{backgroundColor:"#BA232C"}}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="bg-white shadow-md md:hidden">
          <div className="px-4 py-2">
            <input
              type="text"
              placeholder="Search Courses"
              className="bg-gray-100 text-gray-700 rounded-full focus:ring-2 focus:ring-blue-300 px-4 py-2 w-full"
            />
          </div>
          <div className="px-4 py-2">
            {isLoggedIn ? (
              <ul className="space-y-2">
                <li
                  onClick={() => {
                    navigate('/mycourses');
                    setMobileMenuOpen(false);
                  }}
                  className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                >
                  My Courses
                </li>
                <li
                  onClick={() => {
                    navigate('/mycourses');
                    setMobileMenuOpen(false);
                  }}
                  className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                >
                  Add Course
                </li>
                <li
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    handleLogin();
                    setMobileMenuOpen(false);
                  }}
                  className="bg-red-600 text-white py-2 px-4 rounded-full text-lg font-bold w-full"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    handleSignUp();
                    setMobileMenuOpen(false);
                  }}
                  className="bg-red-600 text-white py-2 px-4 rounded-full text-lg font-bold w-full"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
