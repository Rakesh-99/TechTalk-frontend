import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar/NavBar'
import axios from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { BsThreeDots } from 'react-icons/bs'
import { toast } from 'react-toastify'
import { AiOutlineComment } from 'react-icons/ai';
import { BiSolidUser } from 'react-icons/bi';
import Spinner from '../Spinner/Spinner'







const BlogDetails = () => {

  const [imageLoaded, setImageLoaded] = useState(false);

  const backendUrl = 'https://blograkesh.onrender.com/';

  const username = sessionStorage.getItem('username');

  const [blogDetails, setBlogDetails] = useState();

  const [getCommentDetails, setCommentDetails] = useState([]); // Axios req 

  const [commentInfo, setCommentInfo] = useState([]);

  const [comment, setComment] = useState(); // Axios request for post comment

  let [searchParams, setSearchParams] = useSearchParams();

  const [loading, setLoading] = useState(false);

  // Gate blog details :




  const getBlogDetails = async () => {

    const id = searchParams.get('BLOG_ID');

    try {
      setLoading(true);
      const response = await axios.get(`https://blograkesh.onrender.com/getparticularblog/${id}`);

      setBlogDetails(response.data?.res);
      if (response.data.res?.image) {
        setLoading(false);
        setImageLoaded(true);
      }
    } catch (error) {
      if (error?.response) {
        setLoading(false);
        toast.error(error.response.status, error.response.data)
      }
    }

  }


  // Rendering BlogDetails ..
  useEffect(() => {

    getBlogDetails();

  }, [searchParams.get('BLOG_ID')]);







  // Action on click of comment icon : 

  const commentClick = () => {
    if (!username) {

      toast.error('You are not logged in !');
    }
  }

  // Axios req for Post Comment :

  const postComment = () => {

    const commentData = {
      username: username,
      blogId: searchParams.get('BLOG_ID'),
      comment: comment
    }
    axios.post('https://blograkesh.onrender.com/comment', commentData).then((res) => {

      if (res.status === 200) {
        toast.success('Your comment has been posted')

        setComment('');

        getUserComment();
      }
    }).catch((err) => {
      toast.error('Error occurred while posting comment')
    })
  }


  // Axios req for getUser User comment :

  const getUserComment = () => {


    axios.get('https://blograkesh.onrender.com/comment').then((res) => {
      setCommentDetails(res.data.res);

    }).catch((err) => {
      toast.error('An unexpected error occurred while fetching comments !');
    })
  }

  // For filtering Comment : 

  useEffect(() => {

    const id = searchParams.get('BLOG_ID');

    if (getCommentDetails?.length !== 0) {

      let data = getCommentDetails?.filter((item) => {
        return item.blogId === id;
      })

      setCommentInfo(data);
    }

  }, [searchParams, getCommentDetails]);


  useEffect(() => {
    getUserComment();
  }, []);



  const imgUrl = (backendUrl && blogDetails?.image) ? backendUrl + blogDetails.image : undefined;

  useEffect(() => {

  }, [imgUrl]);




  return (

    <div className='bg-gray-800 w-full'>
      <NavBar />
      {loading === true ? <div className="pt-80"><Spinner /></div> :
        <div className="" >


          <div className='flex w-full justify-center'>
            <div className='w-11/12 h-96  flex mt-10 bg-center border border-gray-700 max-[500px]:h-60'>

              {imageLoaded ? (
                <img
                  src={imgUrl}
                  alt="blogImage"
                  crossOrigin='anonymous'
                  fetchpriority='high'
                  decoding='async'
                  loading='lazy'
                  className='w-full'
                />
              ) : (
                <p>Couldn't load image</p>
              )}

            </div>
          </div>


          {/* Blog Category  */}

          <div className='flex justify-center my-10'>
            <span className='category  text-white font-semibold bg-indigo-800 py-1 px-2 rounded-md text-center'>
              {blogDetails?.category}
            </span>
          </div>

          {/* Blog Main Heading  */}

          <div className='text-center'>
            <span className='text-3xl text-white font-semibold max-[600px]:text-xl'>
              {blogDetails?.mainHeading}
            </span>
          </div>


          {/* Three Dots in Blog Details */}

          <div className='flex justify-center'>
            <span className=''>
              <BsThreeDots className='text-white text-6xl' />
            </span>
          </div>


          {/* Blog Description  */}

          <div className='description px-32 max-[600px]:px-5'>
            <span className='text-gray-200 text-justify max-[600px]:text-sm  max-[600px]:leading-8'>
              <div dangerouslySetInnerHTML={{ __html: blogDetails?.description }} />
            </span>
          </div>



          <div className="text-violet-300 py-10 w-full flex-col items-center flex hover:cursor-pointer  justify-center">
            <label htmlFor="">Share your thoughts by clicking on below comment icon.</label>
            <AiOutlineComment className='text-5xl' style={{ display: username ? 'none' : 'block' }} onClick={commentClick} />
          </div>

          {
            username && <div className="comment">

              <div className="w-full flex justify-center items-center mt-10">
                <div className="">
                  <label htmlFor="" className='text-white font-semibold py-5'></label>
                  <input type="text" placeholder='Drop a comment' className='w-96 py-2 px-2 rounded-sm' onChange={(e) => setComment(e.target.value)} value={comment} />
                </div>

              </div>
              {

                username && <div className="flex w-full justify-center items-center"> <button className='font-semibold bg-indigo-600 py-2 px-10 rounded-md my-5 text-white ' onClick={postComment}>Post</button>
                </div>
              }

            </div>
          }

          {
            commentInfo?.length !== 0 && commentInfo?.map((values) => {

              return (

                <div className="w-full flex flex-col items-center h-auto" key={values._id}>
                  <div className=" my-5 px-2  rounded-md flex flex-row border items-center w-96  py-1 border-gray-700 shadow-sm shadow-gray-700 gap-8">


                    <div className="" >
                      <span className='flex items-center space-x-2 text-white'><BiSolidUser className='text-2xl bg-indigo-400 rounded-2xl px-1 py-1' /><p className='text-indigo-300 font-semibold'>{values?.username}</p></span>

                      <div className="showComment mt-3 px-5">
                        <p className='text-white'>~ {values?.comment}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }

        </div>
      }
    </div >

  )
}

export default BlogDetails;
