import React from 'react';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Components/Home/Home';
import Blog from './Components/Blog/Blog';
import About from './Components/About/About';
import BlogDetails from './Components/Blog/BlogDetails';
import BlogForm from './Components/BlogForm/BlogForm';
import OtpVerify from './Components/otpVerify/OtpVerify';






const App = () => {

    const accessToken = sessionStorage.getItem('accessToken');
    const refreshToken = sessionStorage.getItem('refreshToken');
    const userrole = sessionStorage.getItem('userrole');


    return (
        <>
            <ToastContainer />
            <Router>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/blog' element={<Blog />} />
                    <Route path='/blogdetails' element={<BlogDetails />} />
                    <Route path='/blogform' element={<BlogForm />} />
                    <Route path='/otpVerify' element={<OtpVerify />} />
                </Routes>
            </Router>
        </>
    )
}

export default App