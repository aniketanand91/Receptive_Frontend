import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { accessTokenKey } from '../constants/storageconstants';
import { removeLocalStorage, getLocalStorage } from '../Utils/storageutility';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import { setLogoutUserAct } from '../store/auth/authslice';
import Loader from "../component/Loader";
import { API_BASE_URL } from "../api/apiactions";

const CourseDescription = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [couponData, setcopounData] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loginResp } = useSelector(({ auth }) => ({ loginResp: auth.loginResp }), shallowEqual);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/videos/course/${courseId}`);
        if (response.data.success) {
          setCourse(response.data.data);
        } else {
          console.error("Failed to fetch course details:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleBuyNow = async () => {
    setLoading(true);
    const token = getLocalStorage(accessTokenKey);

    if (!token) {
      toast.error("You need to log in to apply a coupon.");
      navigate("/signup");
      return;
    }

    if (!course) {
      toast.error("Course details not found!");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/payment/initiate-payment`,
        {
          userId: loginResp?.userInfo?.user_ID || 'NA',
          courseId: course.course_id,
          couponCode: coupon !== "" ? coupon : 'NULL',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const paymentData = response.data;

      const options = {
        key: paymentData.key,
        amount: paymentData.amount,
        currency: paymentData.currency,
        name: paymentData.name,
        description: paymentData.description,
        image: paymentData.image,
        order_id: paymentData.order_id,
        callback_url: paymentData.callback_url,
        prefill: paymentData.prefill,
        theme: paymentData.theme,
        handler: function (paymentResponse) {
          let attempts = 0;
          const maxAttempts = 3;
          const delay = 2000;

          const verifyPayment = async () => {
            try {
              const verifyResponse = await axios.post(
                `${API_BASE_URL}/payment/verify`,
                {
                  "razorpay_order_id": paymentResponse.razorpay_payment_id
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (verifyResponse.status === 200 && verifyResponse.data.paymentStatus === "success") {
                toast.success("Payment verified! Redirecting to your courses...");
                setTimeout(() => navigate("/mycourses"), 3000);
              } else {
                throw new Error("Verification failed");
              }
            } catch (err) {
              attempts += 1;
              if (attempts < maxAttempts) {
                setTimeout(verifyPayment, delay);
              } else {
                toast.error("Payment verification failed after multiple attempts. Please contact support.");
              }
            }
          };

          verifyPayment();
        },
        modal: {
          ondismiss: function () {
            console.log("Payment modal dismissed.");
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Session expired. Please log in again.");
        removeLocalStorage(accessTokenKey);
        dispatch(setLogoutUserAct());
        navigate("/login");
      } else {
        toast.error("Unable to process payment. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleApplyCoupon = async () => {
    setcopounData(null);
    try {
      if (!coupon) {
        toast.error("Please enter a coupon code.");
        return;
      }

      const token = getLocalStorage(accessTokenKey);

      if (!token) {
        toast.error("You need to log in to purchase this course.");
        navigate("/login");
        return;
      }

      const response = await axios.post(
        `${API_BASE_URL}/payment/payment/applycoupon`,
        {
          userId: loginResp?.userInfo?.user_ID || 'NA',
          couponCode: coupon,
          amount: course.price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setcopounData(response.data);
        toast.success("Coupon applied successfully!");
      } else {
        setcopounData(response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Session expired. Please log in again.");
        removeLocalStorage(accessTokenKey);
        dispatch(setLogoutUserAct());
        navigate("/login");
      } else {
        toast.error("Coupon is invalid or expired!");
      }
    }
  };

  if (loading) return <Loader />;

  if (!course) return <div>Course details not found!</div>;

  return (
    <div className="bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-screen-xl mx-auto px-8 lg:px-16 flex flex-col md:flex-row justify-start items-start">
          <div className="flex-1 pr-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-8">{course.title}</h1>
            <p className="text-lg mb-4">{showFullDescription ? course.description : course.description}</p>
            <p className="text-sm text-gray-400 mb-4">Last updated on {new Date(course.updatedAt).toLocaleDateString()}</p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 bg-white shadow-lg rounded-lg p-6 mt-8 md:mt-0">
            <img className="w-full object-cover rounded-lg mb-6" src={`${API_BASE_URL}/${course.thumbnail}`} alt="Course Thumbnail" />
            <p className="text-3xl font-bold text-gray-900 mb-2">
              ₹{couponData ? parseFloat(couponData.finalAmount).toFixed(2) : parseFloat(course.price).toFixed(2)}
            </p>
            {couponData && (
              <p className="text-xl text-gray-500 line-through">₹{parseFloat(couponData.originalAmount).toFixed(2)}</p>
            )}
            <div className="flex mt-4">
              <input
                className="w-2/3 py-2 px-4 rounded-lg border-gray-300 border text-black"
                type="text"
                placeholder="Apply Coupon"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button className="ml-4 px-6 py-2 bg-blue-500 text-white rounded-lg" onClick={handleApplyCoupon}>
                Apply
              </button>
            </div>
            <button className="mt-8 w-full py-3 bg-blue-600 text-white rounded-lg" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Description</h2>
            <p className="text-lg text-gray-700">{course.description}</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Prerequisites</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Basic business understanding required</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDescription;
