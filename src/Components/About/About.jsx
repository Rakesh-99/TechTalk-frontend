import React from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import heroImg from '../../Assets/aboutImg.png'
import { FaLaptopCode, FaTwitter } from 'react-icons/fa';



const About = () => {

    return (
        <div >
            <NavBar />

            <div className=" bg-gray-900 px-5 ">

                <div className="heroImg w-full flex justify-center py-5">
                    <img src={heroImg} alt="" className='w-56 max-[500px]:w-44' />
                </div>

                <div className="into flex justify-center py-3">
                    <h1 className='text-white text-2xl font-bold max-[500px]:text-sm'>Hi, <span className='bg-indigo-700 py-1 px-4 rounded-md max-[500px]:text-sm'>I’m Rakesh Kumar Parida</span>. Nice to meet you.</h1>
                </div>

                <div className="description flex w-full justify-center flex-col items-center mt-5">
                    <p className='w-1/3 text-center text-violet-200 max-[700px]:text-justify max-[700px]:w-full '>
                        I am a self taught developer currently pursuing B.TECH in Computer Science in Nalanda Institute of Technology. My field of Interest's are building new Web Technologies and Products.
                    </p>

                    <p className='text-white mt-5 w-1/3 text-center max-[700px]:w-full max-[700px]:text-justify max-[700px]:mt-10'>
                        I have done a few projects mostly based on web, you can find them by clicking the below button
                    </p>
                </div>

                <div className="flex justify-center items-center  mt-10 max-[500px]:flex-col max-[500px]:space-y-4 max-[500px]:mt-20 pb-10">

                    <button className='text-white bg-indigo-800 py-1 px-2 rounded-sm' ><a href="https://rakesh-ku-parida.vercel.app/"><span className='flex items-center space-x-2'><FaLaptopCode className='text-xl' /><p className='font-semibold text-sm'>See my works</p> </span></a></button>

                    <button className='text-white bg-indigo-800 py-1 px-3 rounded-sm'><a href="#"></a> <span className='flex items-center space-x-2'><FaTwitter /><p className='font-semibold text-sm'>Follow Me</p></span></button>

                </div>

            </div>
            <Footer />
        </div>

    )
}

export default About