import React from 'react'
import poster from '../Utils/poster.png'
import { Link } from 'react-router-dom'
const MyLearning = () => {
  return (
    <div className='bg-card-background h-screen'>
        <h1 className="bg-card-background p-6 h-48 flex items-center justify-center border text-6xl border-gray-700 text-blue-100">My Learning</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-5 m-5'>
        <Link key={"1"} to={'/mycourses/demo'}>
            <div className="bg-slate-700 p-6 border flex flex-col border-gray-700 rounded-lg shadow-lg  hover:shadow-2xl transition-transform transform hover:scale-105"> 
              <img
                src={poster}
                alt={'fbhhs'}
                className="w-full h-40 object-cover mb-4 rounded-lg"
              />
              <h3 className="text-xl font-bold text-highlight-color mb-2">Self Help Course</h3>
              <p className="text-subtext-color mb-3">rwjhbhjafdhbhab bhdabhjbalh</p>
            </div>
            </Link>
            </div>
            
         
    </div>
  )
}

export default MyLearning