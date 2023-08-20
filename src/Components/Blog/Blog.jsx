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
    const [loader, setLoader] = useState('Loading');





    const navigate = useNavigate();

    const getAllBlogs = () => {
        try {
            axios.get('https://blograkesh.onrender.com/getblogs').then((res) => {
                setBlogInfo(res?.data)
                setBlogData(res?.data)

            }).catch((err) => {
                console.log(err);
            })
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllBlogs();

    }, [blogInfo])

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
    }, [selectType, blogdata, blogInfo])

    const handlepressReadmore = (props) => {
        navigate('/blogdetails?BLOG_ID=' + props._id);
    }



    return (

        <div className="">
            <NavBar />

            <div className="bg-gray-900 max-[550px]:h-screen ">

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
                        <span className='text-6xl text-white font-bold max-[890px]:text-4xl max-[450px]:text-3xl'>Explore <span className='text-violet-400'>learn</span> Build 🚀</span>
                    </div>
                </div>

                <div className="blogList h-screen bg-gray-900 grid gap-10 px-10 mt-10 grid-cols-3 max-[1022px]:px-5 max-[890px]:grid-cols-2  max-[550px]:grid-cols-1 max-[550px]:h-auto">

                    {
                        blogInfo.map((values) => {
                            return (

                                <div key={values?._id} >

                                    <div onClick={() => handlepressReadmore(values)} className="flex flex-col space-y-5 hover:cursor-pointer hover:-translate-y-1 transition-all py-5 shadow-sm rounded-md px-5 hover:shadow-fuchsia-700 ">

                                        <span className='text-fuchsia-500 py-1 px-2 rounded-md font-bold'>{values?.category}</span>

                                        <h1 className='text-white text-3xl max-[1022px]:text-2xl'>{values?.mainHeading}</h1>


                                        <span dangerouslySetInnerHTML={{ __html: values?.description?.slice(0, 120) }} className='text-white' />

                                        <span className='flex border-b-2 w-full space-x-2 items-center'><p className='text-fuchsia-500 '>Learn More</p><BsArrowRight className='text-fuchsia-500' /></span>

                                    </div>
                                </div>
                            )

                        })

                    }

                </div>
            </div>

            {/* <div className="my-10">
                <Footer />
            </div> */}
        </div>
    )
}

export default Blog;