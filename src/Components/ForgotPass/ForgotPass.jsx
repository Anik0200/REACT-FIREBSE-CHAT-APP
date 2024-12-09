import React, { useState } from 'react'
import './ForgotPass.css';
import { ImCross } from "react-icons/im";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { BeatLoader } from 'react-spinners';
import { Flip, toast } from 'react-toastify';

function ForgotPass({ hideForget }) {

    //State
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [loading, setLoading] = useState(false);

    //Firebase Variables
    const auth = getAuth();

    //Functions
    const handleSubmit = (e) => {
        e.preventDefault();

        //Validation
        if (email === '') {
            setEmailError('Email is required');
        }

        //Reset Password
        if (email !== '') {
            setLoading(true);

            sendPasswordResetEmail(auth, email)
                .then(() => {
                    setLoading(false);
                    hideForget(false);
                    toast.success('Reset link sent to your email', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Flip,
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    setLoading(false);

                    //Format Error Code
                    const errorCd = errorCode
                        .replace("auth/", "")
                        .replace(/-/g, " ")
                        .replace(/\b\w/g, char => char.toUpperCase());

                    //Toast
                    toast.error(`${errorCd}`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Flip,
                    });
                });
        }
    }

    return (
        <>
            <div onSubmit={handleSubmit} className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                <div className="forget-card flex flex-col">
                    <ImCross className='cross absolute top-[15px] right-[15px] text-[#FFF]' onClick={() => hideForget(false)} />

                    <form>
                        <h2 className='text-center font-bold text-[#FFF]'>Forgot Password</h2>

                        <input type="email" placeholder='Type your email' onChange={(e) => { setEmail(e.target.value), setEmailError('') }} />
                        <p className='error'>{emailError}</p>


                        {loading ?
                            <button type='submit' className='font-semibold'>
                                <BeatLoader color='#FFFFFF' />
                            </button>

                            :
                            <button type='submit' className='font-semibold'>Send</button>}
                    </form>
                </div>
            </div>

        </>
    )
}

export default ForgotPass
