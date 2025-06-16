import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import poster from '../Utils/Receptive.jpeg';
import { API_BASE_URL } from '../api/apiactions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');
  const [apiSuccess, setApiSuccess] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState('');

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[a-zA-Z ]+$/, 'Only alphabets are allowed')
      .required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
    role: Yup.string().required('Role is required'),
    mobile: Yup.string()
      .matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit phone number')
      .required('Phone number is required'),
    otp: Yup.string(), // OTP validation done conditionally
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      role: '',
      mobile: '',
      otp: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (!otpVerified) {
          setOtpError('Please verify your OTP before signing up.');
          return;
        }

        const response = await axios.post(`${API_BASE_URL}/users/signup`, values);
        setApiSuccess(response.data.message || 'Signup successful!');
        setApiError('');

        toast.success(response.data.message || 'Signup successful!');

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch (error) {
        setApiError(error.response?.data?.message || 'Something went wrong. Please try again.');
        setApiSuccess('');

        toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');

      }
    },
  });

  const sendOtpHandler = async () => {
    if (!formik.values.mobile || formik.errors.mobile) {
      // setOtpError('Please enter a valid phone number before sending OTP.');
      
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/users/signup`, {
        name: formik.values.name,
        email: formik.values.email,
        password: formik.values.password,
        role: formik.values.role,
        mobile: formik.values.mobile,
      });

       if (res.status === 200) {
      setOtpSent(true);  // Set OTP sent to true
      // setOtpError('');

      toast.success('OTP sent successfully!');

    } else {
      // setOtpError(res.data.message || 'Failed to send OTP');
      toast.error(res.data.error || 'Failed to send OTP');
    }
    } catch (err) {
      // setOtpError('Error sending OTP. Please try again.');
      toast.error('Email ID or Mobile number already exists.');
    }
  };

  const verifyOtpHandler = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/users/verifyOtp`, {
        name: formik.values.name,
        mobile: formik.values.mobile,
        email: formik.values.email,
        password: formik.values.password,
        role: formik.values.role,
        otp: formik.values.otp,
      });

      if (res.status === 201) {
        setOtpVerified(true);
        // setOtpError('');
        toast.success('User account created successfully!');
      } else {
        setOtpVerified(false);
        // setOtpError(res.data.message || 'Invalid OTP');
        toast.error(res.data.message || 'Invalid OTP');
      }
    } catch (err) {
      setOtpVerified(false);
      // setOtpError('Error verifying OTP. Try again.');
      toast.error('Error verifying OTP. Try again.');
    }
  };

  return (
    <div style={{ backgroundColor: 'white' }}>
      <div className="flex flex-col md:flex-row justify-center items-center min-h-screen p-5 space-y-5 md:space-y-0 md:space-x-5">
        {/* Left Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <img
            src={poster}
            alt="Sign Up"
            className="w-full max-w-sm md:max-w-full h-auto"
            style={{ textAlign: 'center', width: '680px' }}
          />
        </div>

        {/* Signup Form */}
        <div className="w-full max-w-md bg-white p-8 rounded-md shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">Sign up</h1>

          {apiError && <p className="text-red-500 text-center">{apiError}</p>}
          {apiSuccess && <p className="text-green-500 text-center">{apiSuccess}</p>}

          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                className="w-full p-3 border border-gray-700 rounded-lg"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-400 text-sm mt-1">{formik.errors.name}</p>
              )}
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="w-full p-3 border border-gray-700 rounded-lg"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-400 text-sm mt-1">{formik.errors.email}</p>
              )}
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                className="w-full p-3 border border-gray-700 rounded-lg"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-400 text-sm mt-1">{formik.errors.password}</p>
              )}
            </div>
            <div>
              <select
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                className="w-full p-3 border border-gray-700 rounded-lg"
              >
                <option value="" disabled>
                  Select user type
                </option>
                <option value="user">Student</option>
                <option value="admin">Tutor</option>
              </select>
              {formik.touched.role && formik.errors.role && (
                <p className="text-red-400 text-sm mt-1">{formik.errors.role}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Phone Number"
                name="mobile"
                value={formik.values.mobile}
                onChange={formik.handleChange}
                className="w-full p-3 border border-gray-700 rounded-lg"
              />
              {formik.touched.mobile && formik.errors.mobile && (
                <p className="text-red-400 text-sm mt-1">{formik.errors.mobile}</p>
              )}
            </div>

            {!otpSent && (
              <button
                type="button"
                onClick={sendOtpHandler}
                className="w-full p-3 bg-blue-600 text-white rounded-lg"
              >
                Send OTP
              </button>
            )}

            {otpSent && (
              <div>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  name="otp"
                  value={formik.values.otp}
                  onChange={formik.handleChange}
                  className="w-full p-3 border border-gray-700 rounded-lg mt-3"
                />
                <button
                  type="button"
                  onClick={verifyOtpHandler}
                  className="w-full p-3 bg-green-600 text-white rounded-lg mt-2"
                >
                  Verify OTP and Sign up
                </button>
                {otpVerified && <p className="text-green-500 text-sm mt-1">OTP Verified ✅</p>}
                {otpError && <p className="text-red-500 text-sm mt-1">{otpError}</p>}
              </div>
            )}

            {/* <button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting || !otpVerified}
              className={`w-full p-3 text-white rounded-lg ${
                formik.isValid && otpVerified
                  ? 'bg-button-bg hover:bg-button-hover-bg'
                  : 'bg-gray-500 cursor-not-allowed'
              }`}
            >
              Sign up
            </button> */}
          </form>

          <p className="mt-4 text-subtext-color text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-highlight-color hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
