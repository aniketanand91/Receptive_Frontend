import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EmptyCart from "../Utils/EmptyCart.jpg";
import { getLocalStorage } from "../Utils/storageutility";
import { accessTokenKey } from "../constants/storageconstants";
import { API_BASE_URL } from "../api/apiactions";
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [showModal, setShowModal] = useState(false);


  const { loginResp } = useSelector(({ auth }) => ({ loginResp: auth.loginResp }), shallowEqual);
  
  useEffect(() => {
    const token = getLocalStorage(accessTokenKey);

    if (token) {
      fetch(`${API_BASE_URL}/videos/mypurcahse`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setCourses(data.data || []);
          } else {
            setError("Failed to fetch courses");
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setError(`Failed to fetch courses: ${err.message}`);
        });
    } else {
      setError("No token found");
      setLoading(false);
    }
  }, []);

  const handleReviewClick = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const handleSubmitReview = () => {
    // console.log("Submitting Review");
    // console.log("Course ID:", selectedCourse.course_id);
    // console.log("Rating:", rating);
    // console.log("Review Text:", reviewText);

    // Example: API call to submit review (you can uncomment and update the endpoint)
    
    const token = getLocalStorage(accessTokenKey);
    fetch(`${API_BASE_URL}/users/reviewCourse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: loginResp?.userInfo?.user_ID || 'NA',
        course_id: selectedCourse.course_id,
        rating: rating,
        review: reviewText,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message) {
          alert("Review submitted successfully!");
        } else {
          alert("Failed to submit review");
        }
      })
      .catch((error) => console.error("Error submitting review:", error));
    

    // Reset modal
    setShowModal(false);
    setSelectedCourse(null);
    setRating(0);
    setReviewText("");
  };

  return (
    <div>
      {/* Header Section */}
      <div style={{ backgroundColor: "#1C1D1F", color: "#ffffff" }}>
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-semibold text-center py-10 px-4"
          style={{ fontFamily: "Roboto" }}
        >
          My Courses
        </h1>
      </div>

      {/* Courses Section */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <p className="text-center text-lg text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-lg text-gray-600">
            You haven't purchased any course yet.
          </p>
        ) : courses.length ? (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course) => (
              <div
                key={course.course_id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition border border-gray-200"
              >
                <Link to={`/lectures/${course.course_id}`}>
                  <img
                    src={`${API_BASE_URL}/${course.thumbnail}`}
                    alt={course.title}
                    className="w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                      {course.description}
                    </p>
                  </div>
                </Link>
                <div className="p-4 border-t flex justify-between items-center">
                  <button
                    onClick={() => handleReviewClick(course)}
                    className="text-blue-600 hover:underline"
                  >
                    Give Review
                  </button>
                </div>
              </div>
            ))}
          </section>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <img
              src={EmptyCart}
              alt="Empty Cart"
              className="w-40 sm:w-60 md:w-80"
            />
            <p className="text-center text-lg text-gray-600 mt-4">
              No courses purchased yet. Explore and start learning!
            </p>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {showModal && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Review for {selectedCourse.title}
            </h2>

            {/* Star Rating */}
            <div className="flex justify-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-3xl cursor-pointer ${
                    star <= rating ? "text-yellow-400" : "text-gray-400"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            {/* Review Input */}
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review..."
              className="w-full border border-gray-300 rounded p-2 mb-4"
              rows="4"
            />

            {/* Buttons */}
            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
