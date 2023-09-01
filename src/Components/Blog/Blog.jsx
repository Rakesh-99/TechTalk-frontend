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
    const [selectType, setSelectType] = useState(categories?.[0]?.technology)
    const [blogdata, setBlogData] = useState([]);
    const cancelTokenSource = axios.CancelToken.source();






    const navigate = useNavigate();


    const getAllBlogs = () => {
        axios.get('https://blograkesh.onrender.com/getblogs', { timeout: 10000 })
            .then((res) => {
                setBlogInfo(res?.data);
                setBlogData(res?.data);
            })
            .catch((err) => {
                if (err.response) {
                    console.log(err.response.status, err.response.data);
                }
            })
    };


    // For rendering all Blog post ..

    useEffect(() => {
        getAllBlogs();
    }, []);





    useEffect(() => {

        if (blogdata?.length !== 0) {
            if (selectType == 'All') {
                setBlogInfo(blogdata)
            } else {
                var blogs = blogdata?.filter((el) => {
                    return el.category == selectType
                })
                setBlogInfo(blogs)
            }
        }
    }, [selectType, blogdata, blogInfo]);



    // Action triggers when click on particular blog post
    const handlepressReadmore = (props) => {
        navigate('/blogdetails?BLOG_ID=' + props._id);
    }



    return (

        <div className="relative">
            <NavBar />

            <div className="bg-gray-900 max-[550px]:h-screen">

                <div className="bg-black w-full text-white flex justify-evenly p-5 sticky top-0 z-10 text-xs">

                    {
                        // Category : 

                        categories?.map((categories) => {
                            return (
                                <div className="" key={categories.id} onClick={() => setSelectType(categories?.technology)}>
                                    <span className='cursor-pointer active:text-green-500 hover:underline'>{categories?.technology}</span>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="w-full flex justify-center items-center flex-col py-3">
                    <div className="font-bold text-xl text-white">
                        <span className=''>Tech-Talk</span>
                    </div>
                    <div className="">
                        <span className='text-6xl text-white font-bold max-[890px]:text-4xl max-[450px]:text-3xl'>Explore <span className='text-violet-400'>learn</span> Build 🚀</span>
                    </div>
                </div>

                <div className="blogList h-screen bg-gray-900 grid gap-10 px-10 mt-10 grid-cols-3 max-[1022px]:px-5 max-[890px]:grid-cols-2  max-[550px]:grid-cols-1 max-[550px]:h-auto">

                    {
                        blogInfo.map((values) => {
                            return (


                                <div key={values?._id} className='border-b-2 hover:-translate-y-1 transition-all hover:shadow-fuchsia-700 shadow-2xl relative' >


                                    <div onClick={() => handlepressReadmore(values)} className="flex flex-col space-y-5 hover:cursor-pointer  py-5  px-5  ">

                                        <span className='text-fuchsia-500 py-1 px-2 rounded-md font-bold'>{values?.category}</span>


                                        <h1 className='text-white font-bold text-2xl max-[1022px]:text-2xl'>{values?.mainHeading}</h1>


                                        <span dangerouslySetInnerHTML={{ __html: values?.description?.slice(0, 200) }} className=' text-gray-300' />
                                    </div>
                                    <span className='text-white flex items-center px-5 space-x-3'><p className='text-fuchsia-500'>Learn more </p><BsArrowRight className='text-fuchsia-500' /></span>

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