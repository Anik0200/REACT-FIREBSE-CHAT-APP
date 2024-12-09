import React, { useEffect, useState } from "react";
import './MsgBox.css';
import CommonUser from '../Common/CommonUser'
import InputEmoji from "react-input-emoji";
import { IoMdSend } from "react-icons/io";
import { useSelector } from "react-redux";
import { getDatabase, onValue, push, ref, set } from "firebase/database";

const MsgBox = () => {

    // ------- States ------- //
    const [text, setText] = useState("");
    const [allMsg, setAllMsg] = useState([]);


    // ------- Redux ------- //
    const reduxUser = useSelector((state) => state.userInfo.value);
    const chatUser = useSelector((state) => state.chatMsg.value);



    // ------- Firebase Variables ------- //
    const db = getDatabase()

    // ------- Functions ------- //

    // Send Message
    function handleOnEnter() {
        set(push(ref(db, 'msg/')), {
            senderId: reduxUser.uid,
            reciverId: chatUser.friendId,
            msg: text
        });

        setText('');
    }

    // Get Message
    useEffect(() => {
        onValue(ref(db, 'msg/'), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if (item.val().senderId === reduxUser.uid && item.val().reciverId === chatUser.friendId) {
                    arr.push({ ...item.val(), key: item.key });
                    console.log(item.val());

                } else if (item.val().senderId === chatUser.friendId && item.val().reciverId === reduxUser.uid) {
                    arr.push({ ...item.val(), key: item.key });
                    console.log(item.val());
                }
            })
            setAllMsg(arr);
        });
    }, [chatUser, reduxUser])

    return (
        <>
            <section className='MsgBox'>

                <div className="msgBoxBar">
                    <CommonUser userName={chatUser?.friendName} userImage={chatUser?.friendPhoto} />
                </div>

                <div className="userMsg">
                    {
                        allMsg.map((item) => (

                            item.senderId === reduxUser.uid ?

                                <div className="sendMsg">
                                    {item.msg}
                                </div>
                                :
                                <div className="reciveMsg">
                                    {item.msg}
                                </div>

                        ))
                    }
                </div>

                <div className="msgInput">
                    <InputEmoji
                        value={text}
                        onChange={setText}
                        cleanOnEnter
                        onEnter={handleOnEnter}
                        placeholder="Type a message"
                    />

                    <IoMdSend onClick={handleOnEnter} className="absolute right-[-9px]" />
                </div>

            </section>
        </>
    )
}

export default MsgBox
