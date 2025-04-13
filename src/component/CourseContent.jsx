import React from 'react';

const CourseContent = ({ lectures, currentLectureIndex, onLectureSelect }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4"></h2>
      <ul className="space-y-3">
        {lectures.map((lecture, index) => (
          <li
            key={index}
            className={`p-3 rounded-lg border ${
              index === currentLectureIndex
                ? 'bg-blue-100 border-blue-500 font-semibold'
                : 'bg-gray-50 border-gray-300'
            } cursor-pointer hover:bg-blue-50`}
            onClick={() => onLectureSelect(index)}
          >
            {index + 1}. {lecture.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseContent;
