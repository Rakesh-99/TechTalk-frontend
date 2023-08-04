import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import categories from '../Category/Categories';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BsArrowRight } from 'react-icons/bs'

const Blog = () => {


    const [blogInfo, setBlogInfo] = useState([])
    const [selectType, setSelectType] = useState(categories?.[0]?.technology)
    const [blogdata, setBlogData] = useState([])





    const navigate = useNavigate();

    const getAllBlogs = () => {
        try {
            axios.get('https://blograkesh.onrender.com/getblogs').then((res) => {
                setBlogInfo(res.data)
                setBlogData(res.data)

            }).catch((err) => {

            })
        } catch (error) {
            console.log(error);
        }

    };

    useEffect(() => {
        getAllBlogs();

    }, [])

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
    }, [selectType])

    const handlepressReadmore = (props) => {
        navigate('/blogdetails?BLOG_ID=' + props._id);
    }



    return (

        <div className="">
            <div className="bg-gray-900 h-screen">
                <NavBar />
                <div className="bg-black w-full text-white flex justify-evenly py-2 text-xs">

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
                        <span className='text-6xl text-white font-bold'>Explore <span className='text-violet-400'>learn</span> Build 🚀</span>
                    </div>
                </div>

                <div className="blogList grid gap-10 px-10 mt-10 grid-cols-3  bg-gray-900">

                    {
                        blogInfo?.map((values) => {
                            return (

                                <div key={values?._id}>

                                    <div onClick={() => handlepressReadmore(values)} className="flex flex-col space-y-3 border-b-2 hover:cursor-pointer hover:-translate-y-1 transition h-64  shadow-2xl px-5 hover:shadow-fuchsia-700">

                                        <span className='bg-gradient-to-r from-fuchsia-700 to-indigo-500 text-white py-1 px-2 rounded-md font-semibold'>{values?.category}</span>

                                        <h1 className='text-white text-3xl'>{values?.mainHeading}</h1>


                                        <span dangerouslySetInnerHTML={{ __html: values?.description?.slice(0, 100) }} className='text-white' /><span className='text-white'> ...</span>

                                        <span className='flex  text-white items-center space-x-2'><p className='text-fuchsia-500'>Learn More</p><BsArrowRight className='text-xl text-fuchsia-500' /></span>

                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Blog