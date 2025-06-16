import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import poster from '../Utils/Receptive.jpeg';
import { setLocalStorage } from "../Utils/storageutility";
import { refreshTokenKey, accessTokenKey } from "../constants/storageconstants";
import { loginUserAct } from "../store/auth/auththunk";
import { generateApiUrl } from "../api/apihealper";
import Loader from "../component/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loginResp, authErrorResp } = useSelector(({ auth }) => ({
    loginResp: auth.loginResp,
    authErrorResp: auth.authErrorResp
  }), shallowEqual);

  useEffect(() => {
    if (loginResp && loginResp.userInfo?.userToken) {
      const token = loginResp.userInfo.userToken;
      setLocalStorage(accessTokenKey, token);
      setLocalStorage(refreshTokenKey, token);
      navigate('/home');
      toast.success("Login successful! Redirecting...");
    } else if (authErrorResp) {
      toast.error(authErrorResp.message || "Login failed. Please try again.");
    }
  }, [loginResp, authErrorResp, navigate]);

  useEffect(() => {
    setLoading(false);
  }, [loginResp, authErrorResp]);

  const validationSchema = Yup.object().shape({
    identifier: Yup.string().required("Enter Email or Number"),
    password: Yup.string().required('Password is required.')
  });

  const formik = useFormik({
    initialValues: {
      identifier: '',
      password: ''
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(loginUserAct(generateApiUrl("login"), values));
    }
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={{ backgroundColor: 'white' }}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <div className="flex flex-col md:flex-row justify-center items-center min-h-screen p-5 space-y-5 md:space-y-0 md:space-x-5">
        {/* Left Section - Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={poster}
            alt="Login Illustration"
            className="w-full max-w-sm md:max-w-full h-auto"
            style={{ textAlign: 'center', width: '680px' }}
          />
        </div>

        {/* Right Section - Login Form */}
        <div className="w-full max-w-md bg-white p-8 rounded-md shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Log in to continue your learning journey
          </h2>

          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div>
              <input
                type="text"
                id="identifier"
                name="identifier"
                placeholder="Enter your Email or Number"
                className="w-full p-3 border border-gray-700 rounded-lg"
                value={formik.values.identifier}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.identifier && formik.errors.identifier && (
                <p className="text-red-400 text-sm mt-1">{formik.errors.identifier}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="w-full p-3 border border-gray-700 rounded-lg"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-400 text-sm mt-1">{formik.errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full p-3 text-white rounded-lg ${
                formik.isValid && !formik.isSubmitting
                  ? 'bg-button-bg hover:bg-button-hover-bg'
                  : 'bg-gray-500 cursor-not-allowed'
              }`}
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600">
            Don't have an account?
            <Link to="/signup" className="text-highlight-color ml-1 underline">
              Sign up
            </Link>
          </p>
          <p className="mt-4 text-center text-gray-600">
            <Link to="/forgot-password" className="text-highlight-color underline">
              Forgot Password?
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;
