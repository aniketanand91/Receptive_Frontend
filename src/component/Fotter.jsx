import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer
      className="bg-gray-900 text-white py-8"
      style={{
        backgroundColor: '#1C1D1F',
        position: 'relative',
        bottom: 0,
        width: '100%',
        marginTop: 'auto',
      }}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left section with copyright and developer info */}
          <div className="text-center md:text-left">
            <h2 className="text-lg font-semibold text-white mb-4">Receptive</h2>
            <p className="text-sm text-gray-400 mb-2">© {new Date().getFullYear()} Receptive. All rights reserved.</p>
            <p className="text-sm text-gray-400">Designed and Developed by Receptive India.</p>
          </div>

          {/* Center section with navigation links */}
          <div className="text-center">
            <h2 className="text-lg font-semibold text-white mb-4">Important Links</h2>
            <ul>
              <li className="mb-2">
                <button
                  onClick={() => navigate('/TandC')}
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Terms & Conditions
                </button>
              </li>
              <li className="mb-2">
                <button
                  onClick={() => navigate('/policies')}
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Privacy & Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/aboutus')}
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  About Us
                </button>
              </li>
            </ul>
          </div>

          {/* Right section with contact/social links */}
          <div className="text-center md:text-right">
            <h2 className="text-lg font-semibold text-white mb-4">Contact Us</h2>
            <p className="text-sm text-gray-400 mb-2">Email: receptiveindia@gmail.com</p>
            <p className="text-sm text-gray-400 mb-4">Phone: +91 8839780907</p>
            {/* <div className="flex justify-center md:justify-end space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M22 12a10 10 0 1 0-11.99 9.95v-7.04h-2.6v-2.91h2.6V9.8c0-2.58 1.54-4 3.9-4 1.13 0 2.32.2 2.32.2v2.55h-1.31c-1.3 0-1.71.8-1.71 1.62v1.95h2.89l-.46 2.91h-2.43v7.04A10 10 0 0 0 22 12Z"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
                aria-label="Twitter"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M19.54 5.94a4.2 4.2 0 0 1-1.23.34 2.13 2.13 0 0 0 .93-1.18 4.23 4.23 0 0 1-1.34.52 2.11 2.11 0 0 0-3.6 1.92 6 6 0 0 1-4.36-2.2 2.11 2.11 0 0 0 .65 2.83 2.08 2.08 0 0 1-.95-.26v.03a2.12 2.12 0 0 0 1.69 2.08 2.12 2.12 0 0 1-.95.03 2.12 2.12 0 0 0 1.97 1.46A4.23 4.23 0 0 1 5.47 15a6 6 0 0 0 3.24.95c3.89 0 6.02-3.23 6.02-6.02 0-.09 0-.19-.01-.28a4.31 4.31 0 0 0 1.06-1.1Z"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M19.63 3H4.37A1.36 1.36 0 0 0 3 4.36v15.27A1.36 1.36 0 0 0 4.37 21h15.27A1.36 1.36 0 0 0 21 19.63V4.36A1.36 1.36 0 0 0 19.63 3ZM8.11 18H5.69V9h2.42Zm-1.21-9.93a1.38 1.38 0 1 1 0-2.75 1.38 1.38 0 0 1 0 2.75ZM18.31 18h-2.42v-3.68c0-.88-.02-2.01-1.22-2.01-1.22 0-1.4.95-1.4 1.93V18h-2.42V9h2.32v1.22h.03a2.55 2.55 0 0 1 2.3-1.22c2.46 0 2.91 1.62 2.91 3.72Z"
                  />
                </svg>
              </a>
            </div> */}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 text-center border-t border-gray-700 pt-4">
          <p className="text-sm text-gray-400">Explore. Learn. Grow with Receptive.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
