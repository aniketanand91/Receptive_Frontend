import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EmptyCart from "../Utils/EmptyCart.jpg";
import { getLocalStorage } from "../Utils/storageutility";
import { accessTokenKey } from "../constants/storageconstants";
import { API_BASE_URL } from "../api/apiactions";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
              <Link to={`/lectures/${course.course_id}`} key={course.course_id}>
                <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition border border-gray-200">
                  <img
                    src={`${API_BASE_URL}/${course.thumbnail}`}
                    alt={course.title}
                    className="w-full  object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                      {course.description}
                    </p>
                  </div>
                </div>
              </Link>
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
    </div>
  );
}
