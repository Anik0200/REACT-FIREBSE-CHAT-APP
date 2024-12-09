import React, { useEffect, useState } from 'react'
import CommonUser from '../Common/CommonUser'
import ButtonOne from '../Common/ButtonOne'
import ButtonTwo from '../Common/ButtonTwo';
import { useSelector } from 'react-redux';
import { getDatabase, ref, onValue, remove, push, set } from "firebase/database";
import './FrndReq.css';

export const FrndReq = () => {

    // ------- States ------- //
    const [allRequests, setAllRequests] = useState([]);

    // ------- Redux ------- //
    const reduxUser = useSelector((state) => state.userInfo.value);

    // ------- Firebase Variables ------- //
    const db = getDatabase();

    // ------- Functions ------- //

    // Fetch All Requests
    useEffect(() => {
        onValue(ref(db, 'friendRequest'), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if (item.val().receiverId === reduxUser.uid) {
                    arr.push({ ...item.val(), key: item.key });
                }
            })
            setAllRequests(arr);
        });
    }, [])


    //Handle Decline
    const handleDecline = (key) => {
        remove(ref(db, 'friendRequest/' + key));
    }

    //Handle Accept
    const handleAccept = (item) => {

        set(push(ref(db, 'friends/')), {
            friendId: item.senderId,
            friendName: item.senderName,
            friendPhoto: item.senderPhoto,

            currentUserId: reduxUser.uid,
            currentUserName: reduxUser.displayName,
            currentUserPhoto: reduxUser.photoURL,
        });

        remove(ref(db, 'friendRequest/' + item.key));
    }


    return (
        <>
            <section className="frndReq-main">
                <div className="container">
                    <h2 className='frndReq-title'>REQUESTS</h2>

                    {
                        allRequests.map((item, index) => (
                            <div key={index} className="flex items-center justify-between mb-5">
                                <CommonUser userName={item.senderName} userImage={item.senderPhoto} />

                                <div className="btns flex md:gap-5 gap-3">
                                    <ButtonOne ButtonOneClick={() => handleAccept(item)} ButtonOneText='Accept' />
                                    <ButtonTwo ButtonTwoClick={() => handleDecline(item.key)} ButtonTwoText='Decline' />
                                </div>
                            </div>
                        ))
                    }

                </div>
            </section>
        </>
    )
}
