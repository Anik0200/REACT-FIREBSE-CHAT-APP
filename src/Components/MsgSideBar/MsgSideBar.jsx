import React, { useEffect, useState } from 'react'
import CommonUser from '../Common/CommonUser'
import { useDispatch, useSelector } from 'react-redux';
import { getDatabase, ref, onValue } from "firebase/database";
import './MsgSideBar.css';
import { chatData } from '../../Slices/ChatSlice';

const MsgSideBar = () => {

    // ------- States ------- //
    const [allFriends, setAllFriends] = useState([]);


    // ------- Redux ------- //
    const reduxUser = useSelector((state) => state.userInfo.value);
    const dispatch = useDispatch();


    // ------- Firebase Variables ------- //
    const db = getDatabase();

    // ------- Functions ------- //

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
    }, [])

    // Set Chat User In Redux
    const handleUser = (item) => {
        dispatch(chatData(item));
        localStorage.setItem('chatMsg', JSON.stringify(item));
    }

    return (
        <>
            <div className='msg-sidebar'>

                <h2>Friends</h2>

                {
                    allFriends.map((item) => (
                        <div onClick={() => handleUser(item)} key={item.key} className="singleUser border-b-2 py-4 cursor-pointer">
                            <CommonUser userImage={item.friendPhoto} userName={item.friendName} />
                        </div>
                    ))
                }

            </div>
        </>
    )
}

export default MsgSideBar
