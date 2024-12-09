import React, { useEffect, useState } from 'react'
import ButtonOne from '../Common/ButtonOne'
import './BlockedUser.css';
import CommonUser from '../Common/CommonUser';
import { useSelector } from 'react-redux';
import { getDatabase, onValue, ref, remove } from "firebase/database";


const BlockedUser = () => {

    // ------- States ------- //
    const [allBlockeds, setAllBlockeds] = useState([]);


    // ------- Redux ------- //
    const reduxUser = useSelector((state) => state.userInfo.value);


    // ------- Firebase Variables ------- //
    const db = getDatabase();


    // ------- Functions ------- //

    // Fetch All Friends
    useEffect(() => {
        onValue(ref(db, 'block/'), (snapshot) => {
            let arr = [];

            snapshot.forEach((item) => {
                if (item.val().currentUserId === reduxUser.uid) {
                    arr.push({ ...item.val(), key: item.key });
                }
            })

            setAllBlockeds(arr);
        });
    }, [])

    // Handle Unblock
    const handleUnblock = (item) => {
        remove(ref(db, 'block/' + item.key));
    }


    return (
        <>
            <section className="blocked-main">
                <div className="container">
                    <h2 className='blocked-title'>BLOCKED</h2>

                    {
                        allBlockeds.map((item) => (
                            <div key={item.key} className="flex items-center justify-between mb-5">
                                <CommonUser userImage={item.blockedPhoto} userName={item.blockedName} />

                                <div className="btns flex md:gap-5 gap-3">
                                    <ButtonOne ButtonOneClick={() => handleUnblock(item)} ButtonOneText='Unblock' />
                                </div>
                            </div>
                        ))
                    }

                </div>
            </section>
        </>
    )
}

export default BlockedUser
