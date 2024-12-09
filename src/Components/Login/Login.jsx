import React, { useEffect, useState } from 'react'
import '../Common/LoginRegister.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { CSSProperties } from "react";
import { BeatLoader } from 'react-spinners';
import { getAuth, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Flip, toast } from 'react-toastify';
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import ForgotPass from '../ForgotPass/ForgotPass';
import { useDispatch } from 'react-redux';
import { userData } from '../../Slices/UserSlice';
import { getDatabase, ref, set } from "firebase/database";

function Login() {

    //Navigation
    const navigate = useNavigate();

    //Redux
    const dispatch = useDispatch();

    //State
    const [show, setShow] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [loading, setLoading] = useState(false);

    const [forgetShow, setforgetShow] = useState(false);


    //Firebase Variables
    const auth = getAuth();
    const db = getDatabase();
    const provider = new GoogleAuthProvider();


    //Functions
    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === '') {
            setEmailError('Email is required');
        }

        if (password === '') {
            setPasswordError('Password is required');
        }

        if (email && password) {
            setLoading(true);

            //Firebase Login User
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    setLoading(false);

                    // Signed in
                    const user = userCredential.user;

                    // Check if email is verified
                    if (user.emailVerified === true) {

                        //User Save On Redux
                        dispatch(userData(user));

                        //User Save On Local Storage
                        localStorage.setItem('user', JSON.stringify(user));

                        // Realtime Database
                        set(ref(db, 'allUsers/' + user.uid), {
                            name: user.displayName,
                            email: user.email,
                            image: user.photoURL
                        });

                        navigate('/');

                        toast.success('Login Successful', {
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

                    } else {
                        toast.error('Email is not verified', {
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
                    }
                })
                .catch((error) => {
                    setLoading(false);

                    const errorCode = error.code;

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

    //Google Sign In And Sign Up
    const handleGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;

                updateProfile(user, {
                    photoURL: user.photoURL
                });

                //User Save On Redux
                dispatch(userData(user));

                //User Save On Local Storage
                localStorage.setItem('user', JSON.stringify(user));


                // Realtime Database
                set(ref(db, 'allUsers/' + user.uid), {
                    name: user.displayName,
                    email: user.email,
                    image: user.photoURL
                });

                navigate('/');

                //Toast
                toast.success('Login Successful', {
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
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);

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

    //Handle Foget Card
    const showForget = () => {
        setforgetShow(true);
    }

    return (
        <>
            <section className='register relativ'>

                <div className="register-left">

                    <h2 className='register-title font-poppins font-semibold text-[#FFFFFF]'>
                        Find 3D Objects, Mockups and
                        Illustrations here.
                    </h2>

                    <div className="register-left-bg">
                        <img src="../images/registerbg.png" alt="" />
                    </div>

                </div>

                <div className="register-right">

                    <div className="register-head text-center">
                        <h2 className='font-poppins font-bold text-[#000000]'>Log In Account</h2>
                    </div>

                    <div className="btn flex flex-wrap justify-center">
                        <button onClick={handleGoogle} className='font-poppins font-semibold text-[#000000]'>
                            <img src="../images/googleLogo.png" alt="" />
                            Log In with Google
                        </button>

                        <button onClick={() => alert('Not Available')} className='font-poppins font-semibold text-[#000000]'>
                            <img src="../images/facebookLogo.png" alt="" />
                            Log In with Facebook
                        </button>
                    </div>

                    <h2 className='OR font-medium font-poppins text-[#A6A6A6]'> - OR - </h2>

                    <form onSubmit={handleSubmit} className='register-form flex flex-col items-center gap-[42px]'>

                        <div className="input-group relative">
                            <input onChange={(e) => { setEmail(e.target.value), setEmailError('') }} type="email" placeholder='Email Address' />
                            <p className='error'>{emailError}</p>
                        </div>

                        <div className="input-group relative">
                            <input onChange={(e) => { setPassword(e.target.value), setPasswordError('') }} type={show ? "text" : "password"} placeholder='Password' />
                            <p className='error mt-[10px]'>{passwordError}</p>

                            {show ?
                                <FaRegEye onClick={() => setShow(!show)} className='eye' />
                                :
                                <FaRegEyeSlash onClick={() => setShow(!show)} className='eye' />}

                            <Link onClick={showForget} className='text-green-600 font-semibold text-[18px]'>Forgot Password!</Link>
                        </div>


                        {loading ?
                            <button type='submit' className='font-poppins font-bold text-[#FFFFFF]'>
                                <BeatLoader color='#FFFFFF' />
                            </button>
                            :
                            <button type='submit' className='font-poppins font-bold text-[#FFFFFF]'>
                                Log In Account
                            </button>}


                        <h2 className='font-poppins font-medium text-[#A6A6A6]'>Don't have an account?
                            <Link onClick={() => navigate('/register')} className='text-[#B0D8DA] ml-[1px]'>
                                Sign Up
                            </Link>
                        </h2>

                    </form>

                </div>

                {forgetShow && <ForgotPass hideForget={() => setforgetShow(false)} />}
            </section>

        </>
    )
}

export default Login
