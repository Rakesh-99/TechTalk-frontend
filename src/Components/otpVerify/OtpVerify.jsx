import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';



const OtpVerify = () => {

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const location = useLocation();

    const [otp, setOtp] = useState('');

    const otpHandle = () => {
        if (otp.length !== 0) {
            otpVerify();
        } else {
            toast.error('Please enter the valid OTP');
        }
    };

    const changeOtpHandle = (e) => {
        setOtp(e.target.value);
    };

    const otpVerify = () => {

        const email = location.state.email; // Get email from location state

        // Make the API call to verify the OTP

        setLoading(true);
        axios
            .post(' https://blograkesh.onrender.com/otpverify', { email, emailToken: otp })
            .then((res) => {

                if (res.status === 200) {
                    setLoading(false);
                    toast.success('You have been verified');
                    navigate('/login');


                } else if (res.status === 404) {
                    setLoading(false);
                    toast.error('Invalid OTP entered');
                }
            })
            .catch((err) => {
                setLoading(false);
                toast.error('Internal server error');
            });
    };

    return (
        <>
            <div className="w-full h-screen bg-black">
                {loading === true ? <div className='pt-96 flex  items-center space-y-5 flex-col'> <p className='text-white'>Verifying user...</p> <Spinner /></div> :
                    <div className="w-full h-screen bg-black flex flex-col justify-center items-center space-y-3"
                    >
                        <h1 className='text-white tex-sm font-semibold'>Verify your Email address</h1>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            className="px-2 w-72 py-2 outline-none rounded-sm font-semibold text-black text-xl text-center"
                            value={otp}
                            onChange={changeOtpHandle}
                            name="otp"
                        />

                        <button
                            className="bg-indigo-700 transition-all text-white font-semibold w-40 py-2  rounded-md active:bg-blue-400 active:transition-all "
                            onClick={otpHandle}
                        >
                            Submit
                        </button>
                    </div>
                }
            </div>
        </>
    );
};

export default OtpVerify;


