import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { API_BASE_URL } from "../api/apiactions";
import { useNavigate } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";

// Validation schema for category
const categoryValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
});

const AddCourse = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
  const navigate = useNavigate();

  const { loginResp } = useSelector(({ auth }) => ({ loginResp: auth.loginResp }), shallowEqual);

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        alert("Failed to fetch categories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Add a new category
  const handleAddCategory = async (values, { resetForm }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/categories`, values);
      if (response.status === 201) {
        alert("Category added successfully!");
        setCategories((prev) => [...prev, response.data]);
        resetForm();
        setAddCategoryModalOpen(false);
      }
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add category. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-[#1e1e2f] p-8 rounded-2xl shadow-xl">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-8">
        Add Course
      </h1>
      <Formik
        initialValues={{
          title: "",
          description: "",
          category_id: "",
          price: "",
          sub_category: "NA",
          thumbnail: null,
          video_url: "https://youtube.com",
          user_id: loginResp?.userInfo?.user_ID || "NA",
        }}
        validationSchema={Yup.object({
          title: Yup.string().required("Course title is required"),
          description: Yup.string().required("Description is required"),
          category_id: Yup.number()
            .typeError("Category is required")
            .required("Category is required"),
          price: Yup.number()
            .required("Price is required")
            .positive("Price must be positive"),
          thumbnail: Yup.mixed().required("Thumbnail is required"),
        })}
        onSubmit={async (values, { resetForm }) => {
          try {
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
              formData.append(key, key === "category_id" ? Number(value) : value);
            });

            const response = await axios.post(`${API_BASE_URL}/api/courses`, formData);
            if (response.status === 201) {
              alert("Course added successfully!");
              navigate("/addvideos");
              resetForm();
            }
          } catch (error) {
            console.error("Error submitting course:", error);
            alert("Failed to add course. Please try again.");
          }
        }}
      >
        {({ setFieldValue, values }) => (
          <Form className="space-y-6">
            <div>
              <Field
                type="text"
                name="title"
                placeholder="Course Title"
                className="w-full p-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <Field
                as="textarea"
                name="description"
                placeholder="Course Description"
                className="w-full p-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl border border-gray-300 dark:border-gray-600"
              />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              {loading ? (
                <p className="text-gray-600 dark:text-gray-300">Loading categories...</p>
              ) : (
                <Field
                  as="select"
                  name="category_id"
                  className="w-full p-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl border border-gray-300 dark:border-gray-600"
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    if (selectedValue === "add-new") {
                      setAddCategoryModalOpen(true);
                    } else {
                      setFieldValue("category_id", selectedValue);
                    }
                  }}
                  value={values.category_id}
                >
                  <option value="" label="Select category" />
                  {categories.map((category) => (
                    <option key={category.category_id} value={category.category_id}>
                      {category.name}
                    </option>
                  ))}
                  <option value="add-new" label="Add New Category" />
                </Field>
              )}
              <ErrorMessage name="category_id" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <Field
                type="number"
                name="price"
                placeholder="Price (₹)"
                className="w-full p-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl border border-gray-300 dark:border-gray-600"
              />
              <ErrorMessage name="price" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label
                htmlFor="thumbnail"
                className="block text-sm font-large text-gray-800 dark:text-gray-300 py-1"
              >
                Thumbnail
              </label>
              <input
                type="file"
                name="thumbnail"
                id="thumbnail"
                onChange={(event) => setFieldValue("thumbnail", event.currentTarget.files[0])}
                className="w-full p-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl border border-gray-300 dark:border-gray-600"
              />
              <ErrorMessage name="thumbnail" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition duration-200 text-white font-semibold py-3 rounded-xl"
            >
              Add Course
            </button>
          </Form>
        )}
      </Formik>

      {/* Add New Category Modal */}
      {isAddCategoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-[#2d2d3f] p-6 rounded-2xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Add New Category</h2>
            <Formik
              initialValues={{ name: "", description: "NA" }}
              validationSchema={categoryValidationSchema}
              onSubmit={handleAddCategory}
            >
              <Form className="space-y-4">
                <div>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Category Name"
                    className="w-full p-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl border border-gray-300 dark:border-gray-600"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                {/* <div>
                  <Field
                    as="textarea"
                    name="description"
                    placeholder="Category Description"
                    className="w-full p-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl border border-gray-300 dark:border-gray-600"
                  />
                  <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                </div> */}
                <div className="flex justify-end gap-4 mt-4">
                  <button
                    type="button"
                    onClick={() => setAddCategoryModalOpen(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-xl transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
                  >
                    Add Category
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCourse;
