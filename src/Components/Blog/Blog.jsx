import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import categories from '../Category/Categories';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BsArrowRight } from 'react-icons/bs';
import Footer from '../Footer/Footer'
import Spinner from '../Spinner/Spinner';
import { toast } from 'react-toastify'



const Blog = () => {


    const [blogInfo, setBlogInfo] = useState([])
    const [categoryType, setCategoryType] = useState(categories?.[0]?.technology)
    const [blogdata, setBlogData] = useState([]);
    const [loading, setLoading] = useState(false);










    const navigate = useNavigate();




    useEffect(() => {


        const getAllBlogs = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://blograkesh.onrender.com/getblogs');
                setLoading(false);
                setBlogData(response?.data);
                setBlogInfo(response?.data);

            } catch (error) {
                if (error.response) {
                    setLoading(false);
                    toast.error(error.response.status, error.response.data);

                }
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

            <div className="bg-gray-900 ">

                <div className="bg-black w-full text-white flex justify-evenly p-5 sticky top-0 z-10 text-xs">

                    {
                        // Category : 

                        categories?.map((categories) => {
                            return (
                                <div className="" key={categories.id} onClick={() => setCategoryType(categories?.technology)}>
                                    <span className='cursor-pointer active:text-white  text-violet-300 font-semibold hover:underline'>{categories?.technology}</span>
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
                        <span className='text-5xl text-white font-bold max-[890px]:text-4xl max-[450px]:text-3xl'>Explore <span className='text-violet-500'>learn</span> Build 🚀</span>
                    </div>
                </div>

                <div className="blogList flex items-center justify-center w-full flex-wrap gap-10 pb-20">

                    {
                        loading === true && blogInfo.length === 0 ?
                            <div className="w-full pt-32">
                                <p className='text-white text-center mb-10'>Please wait while Fetching data from server.</p> <span><Spinner /></span>
                            </div> :

                            blogInfo && blogInfo?.map((values) => {

                                return (
                                    <div className='transition-all' key={values?._id} >
                                        <div className='border-b-2 hover:-translate-y-1 transition-all hover:shadow-violet-700 shadow-2xl w-96 ' >


                                            <div onClick={() => handlepressReadmore(values)} className="flex flex-col space-y-5 hover:cursor-pointer  py-5  px-5  ">

                                                <span className='text-violet-400 bg-gray-800 w-24 flex justify-center items-center py-1 px-2 rounded-md font-bold'>{values?.category}</span>


                                                <h1 className='text-white font-bold text-2xl max-[1022px]:text-2xl'>{values?.mainHeading}</h1>


                                                <span dangerouslySetInnerHTML={{ __html: values?.description?.slice(0, 200) }} className=' text-gray-300' />
                                            </div>
                                            <span className='text-white flex items-center px-5 space-x-3'><p className='text-violet-400'>Learn more </p><BsArrowRight className='text-violet-400' /></span>
                                        </div>
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