import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import VideoPlayer from '../component/videoPlayer';
import Loader from "../component/Loader"; // Import the Loader component
import { getLocalStorage } from '../Utils/storageutility';
import { accessTokenKey } from "../constants/storageconstants";
import { API_BASE_URL } from '../api/apiactions';


const CoursePage = () => {
  const { courseId } = useParams(); // Get course ID from the URL
  const navigate = useNavigate();
  const [lectures, setLectures] = useState([]);
  const [currentLectureIndex, setCurrentLectureIndex] = useState(0);
  const [completedLectures, setCompletedLectures] = useState([]);
  const [isCourseCompleted, setIsCourseCompleted] = useState(false);
  const [courseDetails, setCourseDetails] = useState(null); // For course metadata (title, description, etc.)
  const [loading, setLoading] = useState(true); // Add a loading state
  const [hoveredIndex, setHoveredIndex] = useState(null); // Track hovered index for dynamic hover styling

  useEffect(() => {
    const token = getLocalStorage(accessTokenKey);
    setLoading(true); // Set loading to true while fetching data

    fetch(`${API_BASE_URL}/videos/myPurses/${courseId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (response.status === 401) {
          alert('Your session has expired. Please log in again.');
          navigate('/login'); // Navigate to login page if unauthorized
          return Promise.reject('Unauthorized');
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          const courseData = data.data.metadata[0];
          setCourseDetails(courseData); // Store course metadata
          setLectures(data.data.playlist); // Set the playlist
          setLoading(false); // Data loaded
        } else {
          console.error('Failed to fetch course data');
          setLoading(false);
        }
      })
      .catch(err => {
        console.error('Error fetching course data:', err);
        setLoading(false);
      });
  }, [courseId, navigate]);

  const handleVideoEnd = () => {
    if (!completedLectures.includes(currentLectureIndex)) {
      setCompletedLectures([...completedLectures, currentLectureIndex]);
    }

    if (currentLectureIndex < lectures.length - 1) {
      setCurrentLectureIndex(currentLectureIndex + 1);
      setHoveredIndex(currentLectureIndex + 1);
    } else {
      setIsCourseCompleted(true);
    }
  };

  const handleLectureSelect = (index) => {
    setLoading(true);
    setCurrentLectureIndex(index);
    setHoveredIndex(index);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const handleCourseCompleted = () => {
    navigate('/projectsubmission');
  };

  const calculateProgress = () => {
    return lectures.length > 0
      ? Math.round((completedLectures.length / lectures.length) * 100)
      : 0;
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Left Section */}
      <div className="flex-grow p-6 bg-white shadow-lg">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Loader />
          </div>
        ) : (
          <>
            <div className="overflow-hidden shadow-lg">
              {lectures.length > 0 && (
                <VideoPlayer
                  key={lectures[currentLectureIndex].id}
                  videoSrc={lectures[currentLectureIndex].video_url}
                  onVideoEnd={handleVideoEnd}
                />
              )}
            </div>

            <div className="mt-4">
              <h3 className="text-2xl md:text-4xl font-semibold text-gray-800">
                {lectures.length > 0 ? lectures[currentLectureIndex].description : 'Loading...'}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Lecture {currentLectureIndex + 1} of {lectures.length}
              </p>
            </div>

            <div className="mt-6">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
                  style={{ width: `${calculateProgress()}%` }}
                ></div>
              </div>
              <p className="text-gray-500 text-sm mt-2">{calculateProgress()}% Completed</p>
            </div>
          </>
        )}
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/3 bg-gray-50 px-6 py-8 lg:shadow-lg">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Course Content</h2>
        <div className="border border-gray-200 rounded-lg overflow-hidden p-2">
          {lectures.map((lecture, index) => (
            <div
              key={lecture.id}
              className={`p-3 mb-2 flex justify-between items-center rounded-lg cursor-pointer transition ${
                completedLectures.includes(index)
                  ? 'bg-green-100'
                  : index === currentLectureIndex
                  ? 'bg-blue-100'
                  : 'hover:bg-gray-200'
              }`}
              onClick={() => handleLectureSelect(index)}
            >
              <p className="text-gray-800 text-sm">{lecture.description}</p>
              <span
                className={`flex items-center justify-center w-6 h-6 rounded-full border-2 ${
                  completedLectures.includes(index)
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'bg-white border-gray-400'
                }`}
              >
                ✓
              </span>
            </div>
          ))}
        </div>

        <button
          className={`mt-6 w-full px-4 py-2 text-white font-medium rounded-lg ${
            isCourseCompleted
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
          onClick={handleCourseCompleted}
          disabled={!isCourseCompleted}
        >
          Course Completed
        </button>
      </div>
    </div>
  );
};

export default CoursePage;
