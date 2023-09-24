import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';



const OtpVerify = () => {

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
        axios
            .post(' https://confused-lime-moccasins.cyclic.cloud/otpverify', { email, emailToken: otp })
            .then((res) => {
                console.log(res.data);
                if (res.status === 200) {
                    toast.success('You have been verified');

                    setTimeout(() => {
                        navigate('/login');
                    }, 1000);

                } else if (res.status === 404) {
                    toast.error('Invalid OTP entered');
                }
            })
            .catch((err) => {
                console.log(err);
            });

    };

    return (
        <>
            <div className="w-full h-screen bg-gray-800 flex flex-col justify-center items-center space-y-3">
                <input
                    type="text"
                    placeholder="Enter OTP"
                    className="px-2 w-72 py-1 outline-none rounded-sm font-semibold text-gray-400 text-xl text-center"
                    value={otp}
                    onChange={changeOtpHandle}
                    name="otp"
                />

                <button
                    className="bg-blue-500 text-white font-semibold w-72 py-1 px-3 rounded-sm active:bg-blue-700 "
                    onClick={otpHandle}
                >
                    Submit
                </button>
            </div>
        </>
    );
};

export default OtpVerify;


