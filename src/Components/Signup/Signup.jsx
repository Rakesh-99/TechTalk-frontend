import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'







const Signup = () => {

  const navigate = useNavigate()

  const initialState = {
    username: '',
    email: '',
    password: ''
  }


  const [signupInfo, setSignupInfo] = useState(initialState);




  const inputChangeHandle = e => {
    const { name, value } = e.target
    setSignupInfo({ ...signupInfo, [name]: value })
  }

  const register = e => {
    e.preventDefault()

    validateSignupUser(signupInfo)


  }


  const validateSignupUser = values => {

    const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    if (
      !values.username ||
      values.username.length < 2 ||
      values.username.length > 30
    ) {
      toast.error('Username should be between 2 to 30 char')

      return false
    }

    if (!values.email) {
      toast.error('Email filed is required')
      return false
    } else if (!regEx.test(values.email)) {
      toast.error('Invalid email')
      return false
    }

    if (!values.password) {
      toast.error('Password can not be empty')
      return false
    } else if (values.password.length < 6) {
      toast.error('Password can not be less than 6 char')
      return false
    } else {
      axios
        .post(' http://localhost:8000/signup', signupInfo)
        .then(res => {
          if (res.status === 200) {

            toast.success('OTP has been sent to your mail');
            setTimeout(() => {
              navigate('/otpVerify', { state: { email: signupInfo.email } });
            }, 3000);
          }
        }).catch((err) => {
          toast.error(err.response.data.res);
        })
        .catch(err => {
          toast.error('Something went wrong, Please try again later');
        });
    }
  }

  return (


    <div className='flex flex-col w-full justify-center h-screen bg-black items-center'>

      <form
        action=''
        className='flex flex-col w-[400px] border border-indigo-500 rounded-md px-5 py-5'
      >
        <div className='titile'>
          <h1 className='text-3xl text-indigo-500 font-semibold mb-5'>Signup</h1>
        </div>


        <div className='flex flex-col '>

          <label htmlFor='' className='font-semibold text-sm '>
            Username:
          </label>
          <input
            type='text'
            placeholder='Username'
            className='border border-indigo-500 outline-none py-2 px-1  rounded-sm bg-black  text-indigo-300'
            autoComplete='off'
            onChange={inputChangeHandle}
            name='username'
            value={signupInfo.username}
          />
        </div>


        <div className='flex flex-col mt-3'>
          <label htmlFor='' className='font-semibold text-sm'>
            Email:
          </label>
          <input
            type='text'
            placeholder='Email'
            className='border border-indigo-500 outline-none  py-2 px-1 rounded-sm  bg-black text-indigo-300 '
            autoComplete='off'
            onChange={inputChangeHandle}
            name='email'
            value={signupInfo.email}
          />
        </div>


        <div className='flex flex-col mt-3'>
          <label htmlFor='' className='font-semibold text-sm'>
            Password:
          </label>
          <input
            type='password'
            placeholder='Password'
            className='border border-indigo-500 outline-none py-2 px-1 rounded-sm bg-black text-indigo-300 '
            onChange={inputChangeHandle}
            name='password'
            value={signupInfo.password}
          />
        </div>

        <button
          className='bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-1 px-2 mt-5  rounded-sm font-semibold active:bg-green-600'
          onClick={register}
        >
          Register
        </button>


        <div className='flex justify-center mt-5'>
          <Link
            to={'/login'}
            className=' text-indigo-400  font-lg text-base t hover:underline active:text-green-600'
          >
            Already have an account
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Signup;
