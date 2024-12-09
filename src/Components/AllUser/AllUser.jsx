import React, { useEffect, useState } from 'react'
import './AllUser.css';
import CommonUser from '../Common/CommonUser';
import ButtonOne from '../Common/ButtonOne';
import { getDatabase, ref, onValue, push, set } from "firebase/database";
import { useSelector } from 'react-redux';
import { Flip, toast } from 'react-toastify';
import ButtonThree from '../Common/ButtonThree';


function AllUser() {

    // --------- Redux --------- //
    const reduxUser = useSelector((state) => state.userInfo.value);


    // --------- States --------- //
    const [allUsers, setAllUsers] = useState([]);
    const [allFriends, setAllFriends] = useState([]);
    const [allRequests, setAllRequests] = useState([]);
    const [allBlock, setAllBlock] = useState([]);


    // --------- Firebase Variables --------- //
    const db = getDatabase();


    // --------- Functions --------- //

    // Fetch All Friends
    useEffect(() => {

        onValue(ref(db, 'friends/'), (snapshot) => {
            let arr = [];

            snapshot.forEach((item) => {
                if (item.val().currentUserId === reduxUser.uid) {
                    arr.push({ friendId: item.val().friendId, friendName: item.val().friendName, friendPhoto: item.val().friendPhoto, key: item.key });
                } else if (item.val().friendId === reduxUser.uid) {
                    arr.push({ friendId: item.val().currentUserId, friendName: item.val().currentUserName, friendPhoto: item.val().currentUserPhoto, key: item.key });
                }
            })

            setAllFriends(arr);
        });

    }, []);

    // Fetch All Friend Requests
    useEffect(() => {
        onValue(ref(db, 'friendRequest/'), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if (item.val().senderId === reduxUser.uid) {
                    arr.push({ ...item.val(), key: item.key });
                } else if (item.val().receiverId === reduxUser.uid) {
                    arr.push({ ...item.val(), key: item.key });
                }
            })

            setAllRequests(arr);
        });
    }, []);

    // Fetch All Blocked Users
    useEffect(() => {
        onValue(ref(db, 'block/'), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if (item.val().currentUserId === reduxUser.uid) {
                    arr.push({ ...item.val(), key: item.key });

                } else if (item.val().blockedId === reduxUser.uid) {
                    arr.push({ ...item.val(), key: item.key });

                }
            })
            setAllBlock(arr);
        });
    }, []);

    // Fetch All Users
    useEffect(() => {

        onValue(ref(db, 'allUsers/'), (snapshot) => {
            let arr = [];

            snapshot.forEach((item) => {
                if (item.key !== reduxUser.uid && !allFriends.some((req) => req.friendId === item.key) && !allBlock.some((req) => req.blockedId === item.key) && !allBlock.some((req) => req.currentUserId === item.key) && !allRequests.some((req) => req.senderId === item.key)) {

                    arr.push({ ...item.val(), key: item.key });

                }
            })

            setAllUsers(arr);
        });

    }, [allFriends, allBlock, allRequests]);

    //Hande Add Friends
    const handleAddFriends = (user) => {
        set(push(ref(db, 'friendRequest/')), {
            senderId: reduxUser.uid,
            senderName: reduxUser.displayName,
            senderPhoto: reduxUser.photoURL,

            receiverId: user.key,
            receiverName: user.name,
            receiverPhoto: user.image
        });
    }


    return (
        <>
            <section className="user-main">
                <div className="container">
                    <h2 className='user-title'>PEOPLES</h2>

                    {allUsers.map((item, index) => (
                        <div key={index} className="flex items-center justify-between mb-5">
                            <CommonUser userImage={item.image} userName={item.name} />

                            {
                                allRequests.some((req) => req.receiverId === item.key) ?
                                    <ButtonThree ButtonThreeText='Sent' />
                                    :
                                    <ButtonOne ButtonOneClick={() => handleAddFriends(item)} ButtonOneText='Add' />
                            }

                        </div>
                    ))}

                </div>
            </section>
        </>
    )
}

export default AllUser
