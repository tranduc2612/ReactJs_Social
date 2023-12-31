import classNames from "classnames/bind";
import Pusher from "pusher-js";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import images from "~/assets/images/index";
import Button from "~/components/Button/Button";
import CustomBox from "~/components/CustomBox/CustomBox";
import InputEditor from '~/components/InputEditor/InputEditor';
import MessengerContent from "~/components/MessegerItem/MessageContent/MessegerItem";
import TimeLine from "~/components/MessegerItem/TimeLine/TimeLine";
import { Get, Post, BASE_URL_MEDIA } from "~/services/base";
import checkResponse from "~/utils/checkResponse";
import styles from "./ListChat.module.scss";

const cx = classNames.bind(styles);

const BASE_BTN = {
    box_chat: false,
    box_group: false
}

function ListChat({ userData, curentChatId, handleSortChatSession }) {

    const [valueInputChat, setValueInputChat] = useState("");
    const inputEditRef = useRef(null)
    const refBoxChat = useRef(null)
    // const [curentChatId, setCurentChatId] = useState(getParamUrl());

    const [lstMessage, setLstMessage] = useState([]);
    const [currentInfo, setCurrentInfo] = useState({});
    const navigate = useNavigate();
    const chanelRef = useRef(null);

    useEffect(() => {
        // gọi khi render ra lst chat scroll đến cuối cùng
        scrollToBottom();
    }, [lstMessage.length]);

    useEffect(() => {
        // Gọi API lấy thông tin đoạn chat
        if (curentChatId == 'message') return;

        Get(`/message/get-chatsession/${curentChatId}`, {}, userData?.access_token)
            .then((res) => {
                if (checkResponse(res)) {
                    setLstMessage(res.returnObj.messages);
                    setCurrentInfo(res.returnObj.accounts[0]);
                }

                const pusher = new Pusher('83b6c124825dc255f114', {
                    cluster: 'ap1'
                })
                const nameChannel = `chat.${curentChatId}.${userData.data_user?.username}`;

                // Đăng ký kênh bạn muốn lắng nghe
                const channel = pusher.subscribe(nameChannel);

                console.log('curr', curentChatId, userData.data_user?.username);
                // Lắng nghe sự kiện từ kênh
                channel.bind("messageNotification", handleEvent);

                chanelRef.current = {
                    channel, nameChannel
                };
            })

        const handleEvent = (data) => {
            const jsonRes = data?.data;
            console.log(typeof jsonRes);

            if (jsonRes) {
                const dataRes = JSON.parse(jsonRes);
                console.log('appen', dataRes);
                setLstMessage((prev) => [...prev, dataRes]);
            }

            console.log("Received a new post event:", data);
        }

        // gọi khi render ra lst chat scroll đến cuối cùng
        scrollToBottom();

        return () => {
            if (chanelRef.current) {
                chanelRef.current.channel.unbind(chanelRef.current.nameChannel, handleEvent)
                chanelRef.current.channel.unsubscribe();
            }
        }
    }, [curentChatId]);

    const renderHeaderBoxChat = () => {
        return (
            <div className={cx("header")}>
                <div className={cx("header__left")}>
                    <div onClick={() => navigate('/profile/' + currentInfo.username)} className={cx("avatar")}>
                        <Button icon={BASE_URL_MEDIA + currentInfo.avatar} shape="circle" full_icon={true} />
                    </div>
                    <div className={cx("info")}>
                        <span>{currentInfo.fullname}</span>
                        <span>
                            {!currentInfo.is_active ? 'Đang hoạt động' : 'Hoạt động gần đây'}
                            <div style={{
                                backgroundImage: "url('https://static.xx.fbcdn.net/rsrc.php/v3/y0/r/Q3LgX05mDcX.png')",
                                backgroundPosition: "0px -244px",
                                backgroundSize: "22px 272px",
                                width: "12px",
                                height: "12px",
                                backgroundRepeat: "no-repeat",
                                display: "inline-block"
                            }}>

                            </div>
                        </span>
                    </div>

                </div>

                <div className={cx("header__right")}>
                    <Button shape={"circle"}>
                        <svg height="34px" role="presentation" viewBox="-5 -5 30 30" width="34px"><path d="M10.952 14.044c.074.044.147.086.22.125a.842.842 0 001.161-.367c.096-.195.167-.185.337-.42.204-.283.552-.689.91-.772.341-.078.686-.105.92-.11.435-.01 1.118.174 1.926.648a15.9 15.9 0 011.713 1.147c.224.175.37.43.393.711.042.494-.034 1.318-.754 2.137-1.135 1.291-2.859 1.772-4.942 1.088a17.47 17.47 0 01-6.855-4.212 17.485 17.485 0 01-4.213-6.855c-.683-2.083-.202-3.808 1.09-4.942.818-.72 1.642-.796 2.136-.754.282.023.536.17.711.392.25.32.663.89 1.146 1.714.475.808.681 1.491.65 1.926-.024.31-.026.647-.112.921-.11.35-.488.705-.77.91-.236.17-.226.24-.42.336a.841.841 0 00-.368 1.161c.04.072.081.146.125.22a14.012 14.012 0 004.996 4.996z" fill="#0084ff"></path><path d="M10.952 14.044c.074.044.147.086.22.125a.842.842 0 001.161-.367c.096-.195.167-.185.337-.42.204-.283.552-.689.91-.772.341-.078.686-.105.92-.11.435-.01 1.118.174 1.926.648.824.484 1.394.898 1.713 1.147.224.175.37.43.393.711.042.494-.034 1.318-.754 2.137-1.135 1.291-2.859 1.772-4.942 1.088a17.47 17.47 0 01-6.855-4.212 17.485 17.485 0 01-4.213-6.855c-.683-2.083-.202-3.808 1.09-4.942.818-.72 1.642-.796 2.136-.754.282.023.536.17.711.392.25.32.663.89 1.146 1.714.475.808.681 1.491.65 1.926-.024.31-.026.647-.112.921-.11.35-.488.705-.77.91-.236.17-.226.24-.42.336a.841.841 0 00-.368 1.161c.04.072.081.146.125.22a14.012 14.012 0 004.996 4.996z" fill="none" stroke="#0084ff"></path></svg>
                    </Button>
                    <Button shape={"circle"}>
                        <svg height="34px" role="presentation" viewBox="-3 -5 30 30" width="34px"><path d="M19.492 4.112a.972.972 0 00-1.01.063l-3.052 2.12a.998.998 0 00-.43.822v5.766a1 1 0 00.43.823l3.051 2.12a.978.978 0 001.011.063.936.936 0 00.508-.829V4.94a.936.936 0 00-.508-.828zM10.996 18A3.008 3.008 0 0014 14.996V5.004A3.008 3.008 0 0010.996 2H3.004A3.008 3.008 0 000 5.004v9.992A3.008 3.008 0 003.004 18h7.992z" fill="#0084ff"></path><circle className="x1xgahvj" cx="24" cy="10" r="2"></circle></svg>
                    </Button>
                    <Button shape={"circle"}>
                        <svg height="24px" name="icon" role="presentation" viewBox="0 0 36 36" width="24px"><g transform="translate(18,18)scale(1.2)translate(-18,-18)"><path d="M18,10 C16.6195,10 15.5,11.119 15.5,12.5 C15.5,13.881 16.6195,15 18,15 C19.381,15 20.5,13.881 20.5,12.5 C20.5,11.119 19.381,10 18,10 Z M16,25 C16,25.552 16.448,26 17,26 L19,26 C19.552,26 20,25.552 20,25 L20,18 C20,17.448 19.552,17 19,17 L17,17 C16.448,17 16,17.448 16,18 L16,25 Z M18,30 C11.3725,30 6,24.6275 6,18 C6,11.3725 11.3725,6 18,6 C24.6275,6 30,11.3725 30,18 C30,24.6275 24.6275,30 18,30 Z" fill="#0084ff" stroke="#0084ff"></path></g></svg>
                    </Button>
                </div>
            </div>
        )
    }

    const scrollToBottom = () => {
        refBoxChat.current.scrollTop = refBoxChat.current.scrollHeight;
    }

    const handleSubmitChat = () => {
        if (valueInputChat.length === 0) {
            return
        }
        // window.alert(`Tin nhắn gửi là: ${valueInputChat}`);
        inputEditRef.current.resetInputValue("");

        Post(`/message/add-message`,
            {
                message: valueInputChat,
                chat_id: curentChatId
            },
            userData?.access_token)
            .then((res) => {
                if (checkResponse(res)) {
                    let mes = res.returnObj
                    setLstMessage((prev) => [...prev, mes])
                    handleSortChatSession(curentChatId, valueInputChat);
                }

            })

        setValueInputChat("")
    }

    const handleKeyDown = (e) => {
        if (e.code === "Enter") {
            e.preventDefault();
            handleSubmitChat()
        }
    }

    const renderFooterBoxChat = () => {
        return (
            <div className={cx("footer")}>
                <InputEditor onKeyDown={handleKeyDown} ref={inputEditRef} onChange={(value) => setValueInputChat(value)} className={cx("input__editor")} />
                <svg onClick={handleSubmitChat} ref={inputEditRef} className={cx("icon__submit", {
                    active: valueInputChat.length > 0
                })} height="20px" viewBox="0 0 24 24" width="20px"><title>Nhấn Enter để gửi</title><path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 C22.8132856,11.0605983 22.3423792,10.4322088 21.714504,10.118014 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.8376543,3.0486314 1.15159189,3.99121575 L3.03521743,10.4322088 C3.03521743,10.5893061 3.34915502,10.7464035 3.50612381,10.7464035 L16.6915026,11.5318905 C16.6915026,11.5318905 17.1624089,11.5318905 17.1624089,12.0031827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z" ></path></svg>
            </div>
        )
    }

    return (
        <div className={cx("list__chat")}>
            <CustomBox classBody={cx("custom__body")} className={cx("box__chat")} header={renderHeaderBoxChat()} footer={renderFooterBoxChat()} ref={refBoxChat}>

                <div className={cx("list__message")}>
                    {/* <MessengerContent />
    <MessengerContent type="partner" />
    <MessengerContent />
    <MessengerContent type="partner" />
    <MessengerContent />
    <MessengerContent />
    <MessengerContent /> */}
                    {lstMessage.map((mess, index) => {
                        {/* có 1 cái cờ để bt là đâu là tin cuối cùng đã được xem */ }
                        // let flag = false;
                        // if (mess === 7) {
                        //     flag = true;
                        // }
                        let checkShowTime = true;
                        if (index <= 0) {
                            checkShowTime = false;
                        } else {
                            let currTime = new Date(mess.created_at);
                            let lastTime = new Date(lstMessage[index - 1].created_at);
                            lastTime.setMinutes(lastTime.getMinutes() + 10);
                            if (currTime < lastTime) checkShowTime = false;
                        }
                        return (
                            <div key={index}>
                                {checkShowTime ? <TimeLine time={mess.created_at} /> : <></>}
                                <MessengerContent
                                    key={mess}
                                    // flag={true} 
                                    content={mess.message}
                                    type={mess.username != userData.data_user?.username ? "partner" : null} />
                            </div>
                        )
                    })}

                </div>
            </CustomBox>
        </div>

    );
}

export default ListChat;