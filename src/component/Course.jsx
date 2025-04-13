import React from 'react'

const Course = (props) => {
    const{title,description,price,img_url}=props;

  return (
    <div className='bg-white p-4 border border-gray-300 rounded-lg shadow-lg'>
        <img src={img_url} alt={title} className='w-full h-40 object-cover mb-3 rounded-lg' />
        <h3 className='text-xl font-bold'>{title}</h3>
        <p className='text-gray-700 mb-2'>{description}</p>
        <p className='text-gray-700 mb-1'>Duration: 3 Months</p>
        <p className='text-gray-700'>Price: {price}</p>

    </div>
  )
}

export default Course;