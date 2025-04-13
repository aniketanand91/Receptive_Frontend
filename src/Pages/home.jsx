import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import poster from '../Utils/poster.png';
import Loader from "../component/Loader"; // Updated import
import { API_BASE_URL } from '../api/apiactions';

// const banners = [
//   { id: 1, image: poster, text: "ASPIRE TO LEARN AND GROW" }
// ];

const banners = [
  { id: 1, image: poster}
];

const sliderSettings = {
  dots: true,
  infinite: false,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  arrows: false,
};

function Home() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  const { loginResp } = useSelector(({ auth }) => ({ loginResp: auth.loginResp }), shallowEqual);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [getCourses, getCategories] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/courses`),
        axios.get(`${API_BASE_URL}/api/categories`),
      ]);

      setCourses(getCourses.data.data?.courses || []);
      setCategories(getCategories.data || []);
      setActiveCategoryId(getCategories.data?.[0]?.category_id || null);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setActiveCategoryId(categoryId);
  };

  const filteredCourses = activeCategoryId
    ? courses.filter((course) => course.category_id === activeCategoryId)
    : courses;

  return (
    <div className="min-h-screen bg-white">
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader /> {/* Updated loader usage */}
        </div>
      ) : (
        <>
          {/* Banner Section */}
          <section className="relative">
            <Slider {...sliderSettings}>
              {banners.map((banner) => (
                <div
                key={banner.id}
                className="relative shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={banner.image}
                  alt={`Banner ${banner.id}`}
                  className="w-full object-cover  border-b border-gray-200"
                />
              </div>
              ))}
            </Slider>
          </section>

          {/* Welcome Section */}
          <section className="text-center py-12 px-6 bg-white">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-1000">Welcome to Our Learning Platform</h1>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Start your learning journey today and unlock new skills to boost your career growth.
            </p>
          </section>

          {/* Categories Section */}
          <section className="container mx-auto px-4 bg-white ">
            <h2 className="text-3xl font-semibold text-gray-1000 mb-6">Browse Categories</h2>
            <div className="flex flex-wrap justify-start gap-4">
              {categories.map((category) => (
                <button
                  key={category.category_id}
                  onClick={() => handleCategoryClick(category.category_id)}
                  className={`px-4 py-2 text-base rounded-full font-medium shadow-sm transition ${
                    activeCategoryId === category.category_id
                      ? 'bg-blue-600 text-white px-2 py-4'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </section>


          {/* Courses Section */}
          <section className="container mx-auto px-4 py-12">
            {/* <h2 className="text-3xl font-semibold text-gray-700 mb-6">Featured Courses</h2> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <Link
                    key={course.course_id}
                    to={`/course/${course.course_id}`}
                    className="block rounded-lg overflow-hidden hover:shadow-lg transition border"
                  >
                    <img
                      src={course.thumbnail ? `${API_BASE_URL}/${course.thumbnail}` : poster}
                      alt={course.title}
                      className="w-full object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-black-800 line-clamp-2">{course.title}</h3>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-3">{course.description}</p>
                      <p className="text-black-400 font-bold mt-4">₹{course.price}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-gray-600">No courses available for this category.</p>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default Home;
