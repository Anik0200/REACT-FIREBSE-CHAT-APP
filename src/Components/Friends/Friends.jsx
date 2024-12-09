import React, { useEffect, useState } from 'react'
import './Friends.css';
import CommonUser from '../Common/CommonUser';
import ButtonTwo from '../Common/ButtonTwo';
import { useSelector } from 'react-redux';
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";

export const Friends = () => {

    // ------- States ------- //
    const [allFriends, setAllFriends] = useState([]);

    // ------- Redux ------- //
    const reduxUser = useSelector((state) => state.userInfo.value);


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

    // Handle Block
    const handleBlock = (item) => {

        set(push(ref(db, 'block/')), {
            blockedId: item.friendId,
            blockedName: item.friendName,
            blockedPhoto: item.friendPhoto,

            currentUserId: reduxUser.uid,
            currentUserName: reduxUser.displayName,
            currentUserPhoto: reduxUser.photoURL
        });

        remove(ref(db, 'friends/' + item.key));
    }

    return (
        <>
            <section className="friends-main">
                <div className="container">
                    <h2 className='friends-title'>FRIENDS</h2>

                    {
                        allFriends.map((item) => (
                            <div key={item.key} className="flex items-center justify-between mb-5">
                                <CommonUser userName={item.friendName} userImage={item.friendPhoto} />

                                <div className="btns flex md:gap-5 gap-3">
                                    <ButtonTwo ButtonTwoClick={() => handleBlock(item)} ButtonTwoText='Block' />
                                </div>
                            </div>
                        ))
                    }

                </div>
            </section>
        </>
    )
}
