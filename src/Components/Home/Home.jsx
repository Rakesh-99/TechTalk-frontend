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
            <div className=" bg-gray-900">

                <div className="flex justify-center items-center w-full h-screen">
                    <h1 className=' text-3xl text-red-400'>This site is underdevelopment, so you might experience some bug issues</h1>
                </div>

            </div>
            <Footer />
        </div>
    );
};


export default Home;
