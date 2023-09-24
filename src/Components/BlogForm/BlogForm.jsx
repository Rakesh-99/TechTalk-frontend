import React, { useState } from 'react'
import NavBar from '../NavBar/NavBar'
import axios from 'axios'
import CkEditor from '../Editor/CkEditor'
import Home from '../Home/Home'
import { toast } from 'react-toastify'

const BlogForm = () => {

  const userrole = sessionStorage.getItem('userrole')

  const [editorData, setEditorData] = useState('')


  const handleEditorDataChange = data => {
    setEditorData(data) // Update the editorData state with CKEditor data
  }

  const [blogData, setBlogData] = useState({
    category: '',
    mainheading: '',
    heading: ''
  })

  const [uploadFile, setUploadFile] = useState('')

  const blogFormHandle = e => {
    const { name, value } = e.target

    setBlogData({
      ...blogData,
      [name]: value
    })
  }

  const postBlog = () => {

    const data = new FormData()

    data.append('image', uploadFile)
    data.append('mainHeading', blogData.mainheading)
    data.append('heading', blogData.heading)
    data.append('description', editorData)
    data.append('category', blogData.category)

    if (blogData.mainheading && uploadFile && blogData.heading && editorData && blogData.category) {

      try {

        axios
          .post(' https://confused-lime-moccasins.cyclic.cloud/blog', data).then(res => {
            console.log('RES', res)
            toast.success('Blog has been posted');
          })
          .catch(err => {
            console.log('ERR', err)
            toast.error('Error occurred while posting blog ')
          })
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error('Bad request');
    }
  }

  return (
    <div className='bg-gray-900 max-[600px]:h-screen'>
      <NavBar />

      {userrole == 'Bearer 1' ? (
        <div>
          <div className='flex justify-center items-center w-full flex-col max-[600px]:h-screen space-y-3 mt-10'>
            <select
              className='py-2 w-96 rounded-sm px-2 '
              name='category'
              id=''
              onChange={blogFormHandle}
              value={blogData.category}
            >
              <option value='' disabled>
                Choose Category
              </option>
              <option value='All'>All</option>
              <option value='Java'>Java</option>
              <option value='Javascript'>Javascript</option>
              <option value='React'>React</option>
              <option value='MongoDB'>MongoDB</option>
              <option value='Git'>Git</option>
              <option value='Docker'>Docker</option>
            </select>

            <input
              type='text'
              placeholder='Main Heading'
              className='border border-gray-400  py-2 rounded-sm px-2 w-96 outline-none'
              onChange={blogFormHandle}
              name='mainheading'
              value={blogData.mainheading}
            />

            <input
              type='text'
              placeholder='Sub Heading'
              className='border border-gray-400 rounded-sm py-2 px-2 w-96 outline-none'
              onChange={blogFormHandle}
              name='heading'
              value={blogData.heading}
            />

            <input
              className='text-white border border-gray-400 w-80 rounded-md py-2 px-5 '
              type='file'
              accept='/image'
              onChange={e => setUploadFile(e.target.files[0])}
              value={blogData.image}
            />

            <CkEditor onDataChange={handleEditorDataChange} />
            {/* <div dangerouslySetInnerHTML={{ __html: editorData }} />  */}



            <button
              className='text-white bg-indigo-700 py-2 font-semibold w-52 rounded-md active:bg-indigo-800'
              onClick={postBlog}
            >
              ADD BLOG
            </button>
          </div>
        </div>
      ) : (
        <Home />
      )}
    </div>
  )
}

export default BlogForm;


