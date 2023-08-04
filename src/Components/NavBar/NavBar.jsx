
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {



    const navigate = useNavigate();

    const accessToken = sessionStorage.getItem('accessToken');
    const userrole = sessionStorage.getItem('userrole');





    const userLogout = () => {

        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        sessionStorage.removeItem('userrole');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('email');
        alert('You have been logged out successfully')
        navigate('/blog');
    }




    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-gradient-to-r from-indigo-500 to-blue-700 p-4 sticky top-0 left-0">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Link to={'/'} className="text-white text-lg font-semibold">Tech Talk</Link>
                </div>
                <div className="hidden md:flex space-x-32 items-center">

                    <li className='list-none text-white cursor-pointer hover:text-gray-300'><Link to={'/'}>Home</Link></li>

                    <li className='list-none text-white cursor-pointer hover:text-gray-300'><Link to={'/blog'}>Blog</Link></li>

                    {
                        userrole === 'Bearer 1' && <li className='list-none text-white cursor-pointer hover:text-gray-300'><Link to={'/blogform'}>Createblog</Link></li>
                    }
                    <li className='list-none text-white cursor-pointer hover:text-gray-300'><Link to={'/about'}>About</Link></li>


                    <div className="flex space-x-2">
                        {
                            accessToken && <li className='list-none text-white cursor-pointer hover:text-gray-300 bg-red-700 rounded-sm py-1 px-2'><span onClick={userLogout}>Logout</span></li>
                        }
                        {
                            !accessToken && <li className='list-none text-white cursor-pointer hover:text-gray-300 bg-green-700 active:bg-green-900 font-semibold rounded-sm py-1 px-2'><Link to={'/login'}>Login</Link ></li>
                        }
                        {
                            !accessToken && <li className='list-none text-white cursor-pointer hover:text-gray-300 bg-red-500 active:bg-red-900 font-semibold rounded-sm py-1 px-2'><Link to={'/signup'}>Signup</Link ></li>
                        }
                    </div>


                </div>

                <div className="md:hidden">
                    <button
                        className="text-white focus:outline-none"
                        onClick={toggleMenu}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                ></path>
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                ></path>
                            )}
                        </svg>
                    </button>
                </div>
            </div>
            {
                //  NavBar for smaller devices : 

                isMenuOpen && (
                    <div className="md:hidden mt-4 space-y-4">

                        <li className='list-none text-white cursor-pointer hover:text-gray-300'><Link to={'/'}>Home</Link></li>
                        <li className='list-none text-white cursor-pointer hover:text-gray-300'><Link to={'/blog'}>Blog</Link></li>

                        {
                            userrole === 'Bearer 1' && <li className='list-none text-white cursor-pointer hover:text-gray-300'><Link to={'/blogform'}>Createblog</Link></li>
                        }

                        <li className='list-none text-white cursor-pointer hover:text-gray-300'><Link to={'/about'}>About</Link></li>
                        {
                            accessToken && <li className='list-none text-white cursor-pointer hover:text-gray-300'><span onClick={userLogout} className='bg-red-700 px-1 py-1 rounded-sm'>Logout</span></li>
                        }
                        {
                            !accessToken && <li className='list-none text-white cursor-pointer hover:text-gray-300'><Link to={'/login'} className='bg-green-700 px-1 py-1 rounded-sm'>Login</Link ></li>
                        }
                        {
                            !accessToken && <li className='list-none text-white cursor-pointer hover:text-gray-300'><Link to={'/signup'} className='bg-red-700 px-1 py-1 rounded-sm' >Signup</Link ></li>
                        }
                    </div>
                )
            }
        </nav >
    );
};

export default Navbar;
