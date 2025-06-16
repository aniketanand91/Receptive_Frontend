import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE_URL } from "../api/apiactions";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ Loader state
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      mobile: "",
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      mobile: Yup.string()
        .required("Mobile number is required")
        .matches(/^[0-9]{10}$/, "Must be a valid 10-digit mobile number"),

      otp: Yup.string().when("otpSent", {
        is: true,
        then: Yup.string().required("OTP is required"),
      }),

      newPassword: Yup.string().when("otpSent", {
        is: true,
        then: Yup.string()
          .required("New Password is required")
          .min(6, "Password must be at least 6 characters"),
      }),

      confirmPassword: Yup.string().when("otpSent", {
        is: true,
        then: Yup.string()
          .required("Confirm Password is required")
          .oneOf([Yup.ref("newPassword")], "Passwords must match"),
      }),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await axios.post(`${API_BASE_URL}/users/forgotPassword`, {
          mobile: values.mobile,
          otp: values.otp,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        });

        if (res.status === 200) {
          toast.success("Password reset successful! Please login.");
          formik.resetForm();
          setOtpSent(false);
          navigate("/login");
        } else {
          toast.error(res.data.message || "Failed to reset password.");
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    },
  });

  const handleSendOtp = async () => {
    if (!formik.values.mobile || !/^[0-9]{10}$/.test(formik.values.mobile)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/users/sendOTP`, {
        mobile: formik.values.mobile,
      });

      if (res.status === 200) {
        setOtpSent(true);
        toast.success("OTP sent to your mobile.");
      } else {
        toast.error("User not registered.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* ✅ Loader Overlay */}
      {loading && (
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="loader border-4 border-white border-t-purple-600 rounded-full w-16 h-16 animate-spin"></div>
        </div>
      )}

      <div className="max-w-md mx-auto p-6 bg-white shadow-md mt-10 rounded relative z-10">
        <ToastContainer />
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Mobile Number */}
          <div>
            <label htmlFor="mobile" className="block font-medium">Mobile Number</label>
            <input
              type="text"
              name="mobile"
              id="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              className="w-full p-2 border rounded"
            />
            {formik.touched.mobile && formik.errors.mobile && (
              <p className="text-red-500">{formik.errors.mobile}</p>
            )}
          </div>

          {/* Send OTP */}
          {!otpSent && (
            <button
              type="button"
              onClick={handleSendOtp}
              className="w-full bg-blue-600 text-white p-2 rounded"
            >
              Send OTP
            </button>
          )}

          {/* OTP, New Password, Confirm Password */}
          {otpSent && (
            <>
              <div>
                <label htmlFor="otp" className="block font-medium">Enter OTP</label>
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  value={formik.values.otp}
                  onChange={formik.handleChange}
                  className="w-full p-2 border rounded"
                />
                {formik.touched.otp && formik.errors.otp && (
                  <p className="text-red-500">{formik.errors.otp}</p>
                )}
              </div>

              <div>
                <label htmlFor="newPassword" className="block font-medium">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  className="w-full p-2 border rounded"
                />
                {formik.touched.newPassword && formik.errors.newPassword && (
                  <p className="text-red-500">{formik.errors.newPassword}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block font-medium">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  className="w-full p-2 border rounded"
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <p className="text-red-500">{formik.errors.confirmPassword}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white p-2 rounded"
              >
                Reset Password
              </button>
            </>
          )}
        </form>
      </div>

      {/* ✅ Inline CSS for loader */}
      <style>{`
        .loader {
          border-top-color: #7c3aed;
          border-right-color: transparent;
          border-bottom-color: transparent;
          border-left-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default ForgotPassword;
