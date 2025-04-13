import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { shallowEqual, useDispatch, useSelector } from 'react-redux'; // Import Redux hooks
import poster from '../Utils/Receptive.jpeg';
import { setLoginAct, setLoggedInUserAct } from "../store/auth/authslice";
import { loginUserAct, getLoggedInuserAct } from "../store/auth/auththunk";
import { generateApiUrl } from "../api/apihealper";
import { setLocalStorage, getLocalStorage } from "../Utils/storageutility";
import { refreshTokenKey, accessTokenKey } from "../constants/storageconstants";
import ShimmerLoader from '../component/ShimmerLoader';
import GoogleAuthButton from '../component/GoogleAuthButton';
import { GoogleLogin } from '@react-oauth/google';
import { Margin } from '@mui/icons-material';
import Loader from "../component/Loader";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginResp, loggedInUserResp, authErrorResp } = useSelector(({ auth }) => ({
    loginResp: auth.loginResp,
    loggedInUserResp: auth.loggedInUserResp,
    authErrorResp: auth.authErrorResp
  }), shallowEqual);

  const loginRespRef = useRef({
    prevLoginResp: loginResp,
    prevLoggedInUserResp: loggedInUserResp
  });
 
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

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required.'),
    password: Yup.string().required('Password is required.')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      dispatch(loginUserAct(generateApiUrl("login"), values));
    }
  });

  useEffect(() => {
    setLoading(false); // Update loading state when data is ready
  }, [loginResp, authErrorResp]);

  const handleGoogleLoginSuccess = async (response) => {
    setLoading(true);
    try {
      const { credential } = response; // ID token is available in response.credential
      const values = {
        idToken: credential
      } 
      dispatch(loginUserAct(generateApiUrl("oAuth"), values));
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false)
    }
  };
  
  if (loading) {
    return <Loader />;
  }

  return (
    <div style={{backgroundColor:'white'}}>
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
              {/* Left Section */}
              <div className="w-full md:w-1/2 flex justify-center md:justify-start" style={{display:'flex', justifyContent:"center"}}>
        <img src={poster} alt="Login Illustration" className="max-w-xs md:max-w-md" />
      </div>

      <div className="flex items-center justify-center w-full md:w-1/2 bg-gray-50 p-6 md:p-10">
        <div className="w-full max-w-md bg-white p-8 rounded-md shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Log in to continue your learning journey
          </h2>

          {loading ? (  // Render ShimmerLoader when loading is true
            <ShimmerLoader />
          ) : (
            <form className="space-y-4" onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm">{formik.errors.email}</div>
                )}

                <label htmlFor="password" className="mt-3 block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500 text-sm">{formik.errors.password}</div>
                )}
              </div>

              {/* Log in button */}
              <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
              <div>
                <button
                  type="submit"
                  className="w-1/2 bg-purple-600 text-white p-3 hover:bg-purple-700 transition" style={{width:'165px', height:'43px', padding:'10px', marginRight:'10px'}}
                >
                  Login
                </button>
              </div>
              <div>
              <GoogleLogin
                onSuccess={credentialResponse => {
                  console.log(credentialResponse);
                  handleGoogleLoginSuccess(credentialResponse)
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
                </div>
                </div>

         </form>
            
          )}
          <p className="flex justify-center m-5">
                Don't Have An Account 
                <Link className="text-purple-700 underline font-bold ml-1 " to="/signup">
                  Sign Up
                </Link>
              </p>
              <div>
           </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Login;
