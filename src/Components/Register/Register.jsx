import React, { useEffect, useState } from 'react'
import '../Common/LoginRegister.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import 'react-toastify/dist/ReactToastify.css';
import { Flip, toast } from 'react-toastify';
import { CSSProperties } from "react";
import { BeatLoader } from 'react-spinners';
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../../Slices/UserSlice';
import { getDatabase, ref, set } from "firebase/database";

function Register() {


    //Redux
    const dispatch = useDispatch();

    //Navigation
    const navigate = useNavigate();

    //State
    const [show, setShow] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [loading, setLoading] = useState(false);


    //Firebase Variables
    const auth = getAuth();
    const db = getDatabase();
    const provider = new GoogleAuthProvider();

    //Functions
    const handleSubmit = (e) => {
        e.preventDefault();

        if (name === '') {
            setNameError('Name is required');
        }

        if (email === '') {
            setEmailError('Email is required');
        }

        if (password === '') {
            setPasswordError('Password is required');
        }

        //Firebase Register User
        if (name && email && password) {

            setLoading(true);

            //Email Sign Up
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    setLoading(false);

                    // Signed up
                    const user = userCredential.user;

                    // Update user profile
                    updateProfile(user, {
                        displayName: name,
                        photoURL: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
                    });

                    // Email verification
                    sendEmailVerification(auth.currentUser)
                        .then(() => {
                            navigate('/login');

                            toast.success('Email verification sent', {
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
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    //Format Error Code
                    const errorCd = errorCode
                        .replace("auth/", "")
                        .replace(/-/g, " ")
                        .replace(/\b\w/g, char => char.toUpperCase());

                    setLoading(false);

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

    return (
        <>
            <section className='register'>

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
                        <h2 className='font-poppins font-bold text-[#000000]'>Create Account</h2>
                    </div>

                    <div className="btn flex flex-wrap justify-center">
                        <button onClick={handleGoogle} className='font-poppins font-semibold text-[#000000]'>
                            <img src="../images/googleLogo.png" alt="" />
                            Sign up with Google
                        </button>

                        <button onClick={() => alert('coming soon')} className='font-poppins font-semibold text-[#000000]'>
                            <img src="../images/facebookLogo.png" alt="" />
                            Sign up with Facebook
                        </button>
                    </div>

                    <h2 className='OR font-medium font-poppins text-[#A6A6A6]'> - OR - </h2>

                    <form onSubmit={handleSubmit} className='register-form flex flex-col items-center gap-[42px]'>

                        <div className="input-group relative">
                            <input onChange={(e) => { setName(e.target.value), setNameError('') }} type="text" placeholder='Full name' />
                            <p className='error'>{nameError}</p>
                        </div>

                        <div className="input-group relative">
                            <input onChange={(e) => { setEmail(e.target.value), setEmailError('') }} type="email" placeholder='Email Address' />
                            <p className='error'>{emailError}</p>
                        </div>

                        <div className="input-group relative">
                            <input onChange={(e) => { setPassword(e.target.value), setPasswordError('') }} type={show ? "text" : "password"} placeholder='Password' />
                            <p className='error'>{passwordError}</p>

                            {show ?
                                <FaRegEye onClick={() => setShow(!show)} className='eye' />
                                :
                                <FaRegEyeSlash onClick={() => setShow(!show)} className='eye' />}
                        </div>

                        {loading ?
                            <button className='font-poppins font-bold text-[#FFFFFF]' disabled>
                                <BeatLoader color='#FFFFFF' />
                            </button>
                            :
                            <button type='submit' className='font-poppins font-bold text-[#FFFFFF]'>
                                Create Account
                            </button>}


                        <h2 className='font-poppins font-medium text-[#A6A6A6]'>Already have an account?
                            <Link onClick={() => navigate('/login')} className='text-[#B0D8DA] ml-[1px]'>Login</Link>
                        </h2>

                    </form>

                </div>

            </section>
        </>
    )
}

export default Register
