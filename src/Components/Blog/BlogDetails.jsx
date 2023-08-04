import * as React from 'react'
import { useState } from 'react'
import NavBar from '../NavBar/NavBar'
import axios from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { BsThreeDots } from 'react-icons/bs'
import { toast } from 'react-toastify'
import { AiOutlineComment } from 'react-icons/ai';
import { BiCommentDetail, BiSolidUser } from 'react-icons/bi';






const BlogDetails = () => {

  const username = sessionStorage.getItem('username');


  const [blogDetails, setBlogDetails] = useState();

  const [getCommentDetails, setCommentDetails] = useState([]); // Axios req 


  const [commentInfo, setCommentInfo] = useState([]);

  const [comment, setComment] = useState();













  let [searchParams, setSearchParams] = useSearchParams()
  const backendUrl = 'https://blograkesh.onrender.com/'

  const getBlogDetails = () => {

    const id = searchParams.get('BLOG_ID')

    axios
      .get(`https://blograkesh.onrender.com/getparticularblog/${id}`)
      .then(res => {
        setBlogDetails(res.data.res)
      })
      .catch(err => {
        console.log(err)
      })
  }


  React.useEffect(() => {

    getBlogDetails()

    const id = searchParams.get('BLOG_ID');

    if (getCommentDetails?.length !== 0) {
      console.log('Comment details', getCommentDetails);

      let data = getCommentDetails?.filter((item) => {
        return item.blogId == id;
      })

      setCommentInfo(data);
    }
  }, [searchParams.get('BLOG_ID'), getCommentDetails]);







  // getUser User comment :

  const getUserComment = () => {

    try {
      axios.get('https://blograkesh.onrender.com/comment').then((res) => {

        setCommentDetails(res.data.res);


      }).catch((err) => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }


  React.useEffect(() => {

    getUserComment();

  }, [])

  // const post comment :

  const postComment = () => {

    const commentData = {
      username: username,
      blogId: searchParams.get('BLOG_ID'),
      comment: comment
    }
    try {

      axios.post('https://blograkesh.onrender.com/comment', commentData).then((res) => {

        if (res.status === 200) {

          setComment('');

          toast.success('Comment has been posted');

        }
      }).catch((err) => {
        toast.error('Error occurred while posting comment')
      })
    } catch (error) {
      toast.error('Internal server error');
    }
  }


  const navigate = useNavigate();

  const commentClick = () => {

    if (!username) {

      toast.error('You need to login first');
      setTimeout(() => {
        navigate('/login')
      }, 5000);
    }
  }



  return (
    <div className='bg-gray-800 w-full'>
      <NavBar />

      <div className='flex w-full justify-center'>
        <div className=' w-11/12 h-96 flex mt-10 bg-center'>
          <img
            src={backendUrl + blogDetails?.image}
            alt=''
            className='rounded-md w-full object-cover '
          />
        </div>
      </div>

      <div className='flex justify-center my-10'>
        <span className='category  text-white font-semibold bg-indigo-800 py-1 px-2 rounded-md text-center'>
          {blogDetails?.category}
        </span>
      </div>

      <div className='text-center'>
        <span className='text-3xl text-white font-semibold'>
          {blogDetails?.mainHeading}
        </span>
      </div>

      <div className='flex justify-center'>
        <span className=''>
          <BsThreeDots className='text-white text-6xl' />
        </span>
      </div>

      <div className='description px-20'>
        <span className='text-white'>
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
              <label htmlFor="" className='text-white font-semibold py-5'>{ }</label>
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

            <div className="w-full flex flex-col items-center h-auto ">
              <div className=" my-5 w-1/2  rounded-md flex flex-row border border-gray-500 items-center px-4 py-2 gap-8">


                <div className="">
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
