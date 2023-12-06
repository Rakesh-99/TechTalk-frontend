import React from 'react';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import TypeWriter from '../TypeWriter/TypeWriter';
import { Link } from 'react-router-dom';
import HeroImg from '../../Assets/hero.jpg';

const Home = () => {

    const getusername = sessionStorage.getItem('username');
    const accessToken = sessionStorage.getItem('accessToken');


    return (
        <div className="">
            <NavBar />
            <div className="h-screen bg-gray-900  flex px-10 py-5 w-full max-[760px]:flex-col max-[760px]:justify-center max-[760px]:items-center justify-evenly">

                <div className="w-1/2 flex items-center justify-center flex-col max-[760px]:w-full">
                    {getusername ?
                        <div className="py-5"><h1 className='text-white text-xl sm:text-3xl font-semibold'>Hello<span className='text-xl sm:text-3xl  text-white bg-violet-800 rounded-md ml-3 px-3'>"{getusername}",</span></h1></div>
                        : <></>}

                    <p className='text-white text-sm sm:text-xl '>Welcome to my <span className='text-violet-300'>blog</span> . This is where I write about <span className='text-violet-300'>technology</span> , new <span className='text-violet-300'>developments</span> .Just starting off with my site, stay tuned to read more soon.</p>

                    <div className="py-10 ">
                        <TypeWriter />
                    </div>

                    {!accessToken &&
                        <div className="flex flex-col gap-2">
                            <p className='text-white text-sm'>Don't have an account ? </p>

                            <Link to={'/signup'} className='bg-violet-500 text-white py-1 text-center'>Register</Link>
                        </div>

                    }

                </div>


                <div className="w-1/2 flex items-center justify-end">
                    <img src={HeroImg} alt="heroImg" className='w-96 rounded-md' />
                </div>

            </div>
            <Footer />
        </div>
    );
};


export default Home;
