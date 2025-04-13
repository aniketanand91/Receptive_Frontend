import React, { Suspense } from 'react'
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Home= lazy(()=> import('../Pages/home'));
const Login= lazy(()=> import('../Pages/login'));
const SignUp= lazy(()=> import('../Pages/signup'));
const Course= lazy(()=> import('../Pages/courseDescription'));
const Description = lazy(()=> import('../Pages/courseDescription'));
const Setting= lazy(()=> import('../MenuPages/Setting'));
const Profile= lazy(()=> import('../MenuPages/Profile'));
const MyCourses= lazy(()=> import('../Pages/MyCourses'));
const Admin = lazy(()=> import('../Pages/admin'));
const Lectures = lazy(()=> import('../Pages/CoursePage'));
const AboutUs = lazy(() => import('../Pages/AboutUs'));
const TandC = lazy(() => import('../Pages/TandC'));
const Policies = lazy(() => import('../Pages/privacypolicy'));
const ProjectSub = lazy(() => import('../Pages/ProjectSubmissionPage'));
const AddVideos = lazy(() => import('../Pages/addVideos'));
const RequestApproval = lazy(() => import('../Pages/RequestApproval'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>...Loading....</div>}>
        <Routes>
        <Route path='/' element={<Home/>}/>  
        <Route path='home' element={<Home/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='signup' element={<SignUp/>}/>
        <Route path='/course/:courseId' element={<Description/>}/>
        <Route path='profile' element={<Profile/>}/>
        <Route path='admin' element={<Admin/>}/>
        <Route path='lectures/:courseId' element={<Lectures/>}/>
        <Route path='myCourses' element={<MyCourses/>}/>
        <Route path='aboutus' element={<AboutUs/>} />
        <Route path='tandc' element={<TandC/>} />
        <Route path='policies' element={<Policies/>}/>
        <Route path='projectsubmission' element={<ProjectSub/>}/>
        <Route path='addvideos' element={<AddVideos/>} />
        <Route path='requestapproval' element={<RequestApproval/>} />
        </Routes>
    </Suspense>
   
  )
}

export default AppRoutes;