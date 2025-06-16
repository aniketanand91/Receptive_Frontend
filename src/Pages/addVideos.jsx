import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { API_BASE_URL } from "../api/apiactions";
import { accessTokenKey } from "../constants/storageconstants";
import { getLocalStorage } from "../Utils/storageutility";
import { useSelector, shallowEqual } from 'react-redux';

const AddVideos = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = getLocalStorage(accessTokenKey);
  const { loginResp } = useSelector(({ auth }) => ({ loginResp: auth.loginResp }), shallowEqual);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.post(`${API_BASE_URL}/api/admin/courses/upload`, 
          {
            "userId": loginResp?.userInfo?.user_ID || 'NA' 
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCourses(response.data.data.courses || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to load courses. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [token]);

  const initialValues = {
    course_id: "",
    video_file: null,
    description: "",
    position: "",
  };

  const validationSchema = Yup.object({
    course_id: Yup.number()
      .required("Course is required")
      .typeError("Please select a valid course"),
    video_file: Yup.mixed()
      .required("Video file is required")
      .test("fileType", "Unsupported File Format", value =>
        value && ["video/mp4", "video/webm", "video/ogg"].includes(value.type)
      ),
    description: Yup.string().required("Description is required"),
    position: Yup.number()
      .typeError("Position must be a number")
      .required("Position is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setError("");

    try {
      const formData = new FormData();
      formData.append("course_id", values.course_id);
      formData.append("video", values.video_file);
      formData.append("description", values.description);
      formData.append("position", values.position);

      await axios.post(`${API_BASE_URL}/api/multiplecourse`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Video added successfully!");
      resetForm();
    } catch (error) {
      console.error("Error adding video:", error);
      setError("Failed to add video. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-6 max-w-2xl bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-center mb-6">Add Videos</h1>
      {loading ? (
        <p className="text-center text-gray-500">Loading courses...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form
              className={`space-y-4 ${isSubmitting ? "opacity-50 pointer-events-none" : ""}`}
            >
              {/* Course Dropdown */}
              <div>
                <label htmlFor="course_id" className="block text-sm font-medium text-gray-700">
                  Choose your Course Title
                </label>
                <Field
                  as="select"
                  name="course_id"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Select a course</option>
                  {courses.map((course) => (
                    <option key={course.course_id} value={course.course_id}>
                      {course.title}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="course_id"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Video File Upload */}
              <div>
                <label htmlFor="video_file" className="block text-sm font-medium text-gray-700">
                  Upload Video
                </label>
                <input
                  type="file"
                  name="video_file"
                  accept="video/*"
                  onChange={(event) => {
                    setFieldValue("video_file", event.currentTarget.files[0]);
                  }}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <ErrorMessage
                  name="video_file"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Lecture Title
                </label>
                <Field
                  type="text"
                  name="description"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter lecture title name"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Position */}
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                  Position
                </label>
                <Field
                  type="number"
                  name="position"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter video position [indexing start from: 0]"
                />
                <ErrorMessage
                  name="position"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Error Message */}
              {error && <p className="text-red-500 text-sm">{error}</p>}

              {/* Submit Button */}
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2 px-4 rounded-md shadow-sm text-white flex justify-center items-center gap-2 ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {isSubmitting && (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3.536-3.536A8 8 0 0112 20v-4l-3.536 3.536A8 8 0 014 12z"
                      ></path>
                    </svg>
                  )}
                  {isSubmitting ? "Uploading..." : "Submit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default AddVideos;
