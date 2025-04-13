import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import poster from '../Utils/Receptive.jpeg';
import { API_BASE_URL } from '../api/apiactions';

const Signup = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');
  const [apiSuccess, setApiSuccess] = useState('');

  // Signup Form Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[a-zA-Z ]+$/, 'Only alphabets are allowed')
      .required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      role: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // API call
        const response = await axios.post(`${API_BASE_URL}/users/signup`, values);
        setApiSuccess(response.data.message || 'Signup successful!');
        setApiError('');
        
        // Redirect to login or another page after success
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch (error) {
        setApiError(error.response?.data?.message || 'Something went wrong. Please try again.');
        setApiSuccess('');
      }
    },
  });

  return (
    <div style={{ backgroundColor: 'white' }}>
      <div className="flex flex-col md:flex-row justify-center items-center min-h-screen p-5 space-y-5 md:space-y-0 md:space-x-5">
        {/* Left Section */}
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
                onBlur={formik.handleBlur}
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
            <button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
              className={`w-full p-3 text-text-color rounded-lg ${
                formik.isValid ? 'bg-button-bg hover:bg-button-hover-bg' : 'bg-gray-500'
              }`}
            >
              Continue
            </button>
          </form>
          <p className="mt-4 text-subtext-color text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-highlight-color hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
