import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar/NavBar'
import axios from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { BsThreeDots } from 'react-icons/bs'
import { toast } from 'react-toastify'
import { AiOutlineComment } from 'react-icons/ai';
import { BiSolidUser } from 'react-icons/bi';
import img from '../../Assets/Meh.png'






const BlogDetails = () => {

  const backendUrl = 'https://blograkesh.onrender.com/'


  const username = sessionStorage.getItem('username');
  const navigate = useNavigate();


  const [blogDetails, setBlogDetails] = useState();

  const [getCommentDetails, setCommentDetails] = useState([]); // Axios req 

  const [commentInfo, setCommentInfo] = useState([]);

  const [comment, setComment] = useState();

  let [searchParams, setSearchParams] = useSearchParams()













  const getBlogDetails = () => {

    const id = searchParams.get('BLOG_ID')

    axios
      .get(`https://blograkesh.onrender.com/getparticularblog/${id}`, { timeout: 10000 })

      .then(res => {
        setBlogDetails(res.data?.res)


      })
      .catch(err => {
        console.log(err)
      })
  }


  // Rendering BlogDetails ..

  useEffect(() => {

    getBlogDetails();

  }, [searchParams.get('BLOG_ID')]);







  // getUser User comment :

  const getUserComment = () => {

    try {
      axios.get('https://blograkesh.onrender.com/comment', { timeout: 10000 }).then((res) => {

        setCommentDetails(res.data.res);


      }).catch((err) => {
        // console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }


  // For rendering after every Comment : 

  useEffect(() => {

    const id = searchParams.get('BLOG_ID');

    if (getCommentDetails?.length !== 0) {

      let data = getCommentDetails?.filter((item) => {
        return item.blogId == id;
      })

      setCommentInfo(data);
    }
    getUserComment();


  }, [getCommentDetails]);





  //  Post Comment :

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
      }
    }).catch((err) => {
      toast.error('Error occurred while posting comment')
      console.log(err);
    })
  }


  const commentClick = () => {
    if (!username) {

      toast.error('You must login before you can post a comment.');
      setTimeout(() => {
        navigate('/login')
      }, 3000);
    }
  }




  return (
    <div className='bg-gray-800 w-full '>
      <NavBar />


      {/* Blog Image  */}



      <div className='flex w-full justify-center'>
        <div className='w-11/12 h-96  flex mt-10 bg-center border border-gray-700 max-[500px]:h-60'>
          <img src={backendUrl + blogDetails?.image} alt="blogImage" crossOrigin='anonymous' fetchpriority='high' decoding='async' loading='lazy' className='w-full' />
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

      <div className='description px-20 max-[600px]:px-5'>
        <span className='text-gray-200 text-justify max-[600px]:text-sm  max-[600px]:leading-8'>
          <div dangerouslySetInnerHTML={{ __html: blogDetails?.description }} />
        </span>
      </div>



      <div className="text-violet-300 py-10 w-full flex-col items-center flex hover:cursor-pointer  justify-center">
        <label htmlFor="">Share your thoughts</label>
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
              <div className=" my-5 w-1/2  rounded-md flex flex-row border border-gray-500 items-center px-4 py-2 gap-8">


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
  )
}

export default BlogDetails;
