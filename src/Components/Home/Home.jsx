import React from 'react';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import TypeWriter from '../TypeWriter/TypeWriter';
import { FaLaptopCode } from 'react-icons/fa';
import heroImg from '../../Assets/Meh.png';


const Home = () => {


    return (
        <div className="">
            <NavBar />
            <div className=" bg-gray-900 h-screen flex px-10 py-5 w-full max-[760px]:flex-col max-[760px]:justify-center max-[760px]:items-center">


                <div className="w-1/2 flex items-center justify-center flex-col max-[760px]:w-full">
                    <p className='text-white text-xl '>Welcome to my <span className='text-violet-300'>blog</span> . This is where I write about <span className='text-violet-300'>technology</span> , new <span className='text-violet-300'>developments</span> .Just starting off with my site, stay tuned to read more soon.</p>

                    <div className="py-10 ">
                        <TypeWriter />
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
};


export default Home;
