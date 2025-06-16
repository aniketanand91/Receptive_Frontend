import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import logo from '../constants/logo192.jpeg';
import { removeLocalStorage } from '../Utils/storageutility';
import { setLogoutUserAct } from '../store/auth/authslice';
import { accessTokenKey } from '../constants/storageconstants';
import axios from 'axios';
import { API_BASE_URL } from '../api/apiactions';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const dropdownRef = useRef(null);

  const { loginResp } = useSelector(({ auth }) => ({ loginResp: auth.loginResp }), shallowEqual);
  const token = localStorage.getItem(accessTokenKey);
  const isLoggedIn = Boolean(token);
  const username = loginResp?.userInfo?.UserName || 'User';
  const role = loginResp?.userInfo?.UserRole || 'user';

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/courses`);
      setCourses(response.data.data?.courses || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setSuggestions([]);
      return;
    }

    const filtered = courses.filter(course =>
      course.title.toLowerCase().includes(query.toLowerCase())
    );

    setSuggestions(filtered.slice(0, 5)); // Limit to 5 suggestions
  };

  const handleSuggestionClick = (courseId) => {
    navigate(`/course/${courseId}`);
    setSearchQuery('');
    setSuggestions([]);
    setMobileMenuOpen(false);
  };

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
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 md:h-14" />
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

        {/* Search Input (Desktop) */}
        <div className="hidden md:flex flex-1 justify-center px-4 relative">
          <input
            type="text"
            placeholder="Search Courses"
            value={searchQuery}
            onChange={handleSearchChange}
            className="bg-gray-100 text-gray-700 rounded-full focus:ring-2 focus:ring-blue-300 px-4 py-2 w-full max-w-lg"
          />
          {suggestions.length > 0 && (
            <ul className="absolute top-12 w-full max-w-lg bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg z-50">
              {suggestions.map((course) => (
                <li
                  key={course.course_id}
                  onClick={() => handleSuggestionClick(course.course_id)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {course.title}
                </li>
              ))}
            </ul>
          )}
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
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg text-gray-700 z-50">
                  <ul>
                    <li
                      onClick={() => { navigate('/mycourses'); setDropdownOpen(false); }}
                      className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                    >
                      My Courses
                    </li>
                    {role === 'superadmin' && (
                      <li
                        onClick={() => { navigate('/RequestApproval'); setDropdownOpen(false); }}
                        className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                      >
                        Approval Request
                      </li>
                    )}
                    {role === 'admin' && (
                      <>
                        <li
                          onClick={() => { navigate('/admin'); setDropdownOpen(false); }}
                          className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                        >
                          Add Course
                        </li>
                        <li
                          onClick={() => { navigate('/addvideos'); setDropdownOpen(false); }}
                          className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                        >
                          Add Video
                        </li>
                      </>
                    )}
                    {(role === 'admin' || role === 'superadmin') && (
                      <li
                        onClick={() => { navigate('/SubmittedProjects'); setDropdownOpen(false); }}
                        className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                      >
                        Project Submissions
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
                className="bg-red-600 text-white py-2 px-4 rounded-full text-lg font-bold"
                style={{ backgroundColor: "#BA232C" }}
              >
                Login
              </button>
              <button
                onClick={handleSignUp}
                className="bg-red-600 text-white py-2 px-4 rounded-full text-lg font-bold"
                style={{ backgroundColor: "#BA232C" }}
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
          <div className="px-4 py-2 relative">
            <input
              type="text"
              placeholder="Search Courses"
              value={searchQuery}
              onChange={handleSearchChange}
              className="bg-gray-100 text-gray-700 rounded-full focus:ring-2 focus:ring-blue-300 px-4 py-2 w-full"
            />
            {suggestions.length > 0 && (
              <ul className="absolute top-12 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg z-50">
                {suggestions.map((course) => (
                  <li
                    key={course.course_id}
                    onClick={() => handleSuggestionClick(course.course_id)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    {course.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="px-4 py-2">
            {isLoggedIn ? (
              <ul className="space-y-2">
                <li onClick={() => { navigate('/mycourses'); setMobileMenuOpen(false); }} className="hover:bg-gray-100 px-4 py-2 cursor-pointer">My Courses</li>
                {role === 'admin' && (
                  <li onClick={() => { navigate('/admin'); setMobileMenuOpen(false); }} className="hover:bg-gray-100 px-4 py-2 cursor-pointer">Add Course</li>
                )}
                <li onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="hover:bg-gray-100 px-4 py-2 cursor-pointer">Logout</li>
              </ul>
            ) : (
              <div className="space-y-2">
                <button onClick={() => { handleLogin(); setMobileMenuOpen(false); }} className="bg-red-600 text-white py-2 px-4 rounded-full text-lg font-bold w-full">Login</button>
                <button onClick={() => { handleSignUp(); setMobileMenuOpen(false); }} className="bg-red-600 text-white py-2 px-4 rounded-full text-lg font-bold w-full">Sign Up</button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
