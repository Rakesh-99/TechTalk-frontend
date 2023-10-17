import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import categories from '../Category/Categories';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BsArrowRight } from 'react-icons/bs';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Footer from '../Footer/Footer'


const Blog = () => {


    const [blogInfo, setBlogInfo] = useState([])
    const [categoryType, setCategoryType] = useState(categories?.[0]?.technology)
    const [blogdata, setBlogData] = useState([]);
    const [loader, setLoader] = useState('Loading...');










    const navigate = useNavigate();


    // useEffect(() => {
    //     setLoader('Loading...'); // Set the loader to indicate loading
    //     const getAllBlogs = () => {
    //         axios.get(' http://localhost:8000/getblogs', { timeout: 10000 })
    //             .then((res) => {
    //                 setBlogInfo(res?.data);
    //                 setBlogData(res?.data);
    //                 setLoader(null); // Set the loader to null when data is loaded
    //             })
    //             .catch((err) => {
    //                 if (err.response) {
    //                     console.log(err.response.status, err.response.data);
    //                 }
    //                 setLoader('Error occurred while fetching data'); // Handle errors and set an appropriate message
    //             });
    //     };

    //     getAllBlogs();
    // }, []);

    useEffect(() => {

        setLoader('Loading...');

        const getAllBlogs = async () => {
            try {
                const response = await axios.get('http://localhost:8000/getblogs');
                setBlogData(response?.data);
                setBlogInfo(response?.data);
                setLoader(null);

            } catch (error) {
                if (error.response) {
                    console.log(error.response.status, error.response.data);
                }
                setLoader('Error occurred while fetching the data from server');
            }
        }
        getAllBlogs();
    }, []);






    useEffect(() => {
        if (blogdata?.length !== 0) {
            if (categoryType === 'All') {
                setBlogInfo(blogdata);
            } else {
                const filteredBlogs = blogdata?.filter((el) => el.category === categoryType);
                setBlogInfo(filteredBlogs);
            }
        }

    }, [categoryType, blogdata]);



    // Action triggers when click on particular blog post
    const handlepressReadmore = (props) => {
        navigate('/blogdetails?BLOG_ID=' + props._id);
    }



    return (

        <div className="relative">
            <NavBar />

            <div className="bg-gray-900 max-[550px]:h-screen h-auto">

                <div className="bg-black w-full text-white flex justify-evenly p-5 sticky top-0 z-10 text-xs">

                    {
                        // Category : 

                        categories?.map((categories) => {
                            return (
                                <div className="" key={categories.id} onClick={() => setCategoryType(categories?.technology)}>
                                    <span className='cursor-pointer active:text-white  text-violet-200 font-semibold hover:underline'>{categories?.technology}</span>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="w-full flex justify-center items-center flex-col py-3">
                    <div className="font-bold text-xl text-white">
                        <span className='z-20'>Tech-Talk</span>
                    </div>
                    <div className="">
                        <span className='text-6xl text-white font-bold max-[890px]:text-4xl max-[450px]:text-3xl'>Explore <span className='text-violet-400'>learn</span> Build 🚀</span>
                    </div>
                </div>

                <div className="blogList  bg-gray-900 grid gap-10 px-10 mt-10 pb-20  grid-cols-3 max-[1022px]:px-5 max-[890px]:grid-cols-2  max-[550px]:grid-cols-1 max-[550px]:h-auto">

                    {
                        blogInfo.length === 0 ?
                            <div className="h-screen w-full justify-center flex ">
                                <p className='text-white text-center text-2xl w-full flex justify-center font-semibold'>Loading...</p>
                            </div> :

                            blogInfo && blogInfo?.map((values) => {

                                return (

                                    <div key={values?._id} className='border-b-2 hover:-translate-y-1 transition-all hover:shadow-violet-700 shadow-2xl ' >


                                        <div onClick={() => handlepressReadmore(values)} className="flex flex-col space-y-5 hover:cursor-pointer  py-5  px-5  ">

                                            <span className='text-violet-400 bg-gray-800 w-24 flex justify-center items-center py-1 px-2 rounded-md font-bold'>{values?.category}</span>


                                            <h1 className='text-white font-bold text-2xl max-[1022px]:text-2xl'>{values?.mainHeading}</h1>


                                            <span dangerouslySetInnerHTML={{ __html: values?.description?.slice(0, 200) }} className=' text-gray-300' />
                                        </div>
                                        <span className='text-white flex items-center px-5 space-x-3'><p className='text-violet-400'>Learn more </p><BsArrowRight className='text-violet-400' /></span>
                                    </div>
                                )

                            })

                    }

                </div>
                <Footer />

            </div>
        </div>
    )
}

export default Blog;