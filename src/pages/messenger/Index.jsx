import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";
import images from "~/assets/images/index";
import ChatItemInfo from "~/components/BoxMessenger/components/ChatItemInfo";
import Button from "~/components/Button/Button";
import CustomBox from "~/components/CustomBox/CustomBox";
import Input from "~/components/Input/Input";
import ListChat from "~/components/ListChat/ListChat";
import Sidebar from "~/components/Sidebar/Sidebar";
import { Get } from "~/services/base";
import checkResponse from "~/utils/checkResponse";
import getParamUrl from "~/utils/getParamUrl";
import styles from "./Messenger.module.scss";

const cx = classNames.bind(styles);

const BASE_BTN = {
    box_chat: false,
    box_group: false
}

function Chat({ userData }) {

    const [switchBox, setSwitchBox] = useState(false);
    const [valueInputChat, setValueInputChat] = useState("");
    const [listChatSessions, setListChatSessions] = useState([]);
    const inputEditRef = useRef(null)
    const refBoxChat = useRef(null)
    const [curentChatId, setCurentChatId] = useState(getParamUrl());

    // const [lstMessage, setLstMessage] = useState([]);
    const [currentInfo, setCurrentInfo] = useState({});
    const navigate = useNavigate();

    // useEffect(() => {
    //     // gọi khi render ra lst chat scroll đến cuối cùng
    //     // scrollToBottom();
    // }, [lstMessage.length]);

    // Gọi hết mịa chatsession luôn vì chắc ko nhìu chat lắm đâu và scroll thì ko biết làm :) 
    useEffect(() => {
        Get("/message", {}, userData?.access_token)
            .then((res) => {
                if (checkResponse(res)) {
                    let listChatSession = res.returnObj;

                    setListChatSessions(listChatSession);

                    const pusher = new Pusher('83b6c124825dc255f114', {
                        cluster: 'ap1'
                    })
                    const nameChannel = `chatsession.${userData.data_user?.username}`;

                    // Đăng ký kênh bạn muốn lắng nghe
                    const channel = pusher.subscribe(nameChannel);

                    // Lắng nghe sự kiện từ kênh
                    channel.bind("chatsession", handleEvent);
                }
            })
    }, []);

    const handleEvent = (data) => {
        const jsonRes = data?.data;
        console.log(typeof jsonRes);

        if (jsonRes) {
            const dataRes = JSON.parse(jsonRes);
            console.log('appen', dataRes);
            if (dataRes.type == 'U') {
                handleSortChatSession(dataRes)
            }
            if (dataRes.type == 'C') {
                let newChat = {
                    account: [
                        { fullname: dataRes.fullname },
                    ],
                    chatSession: {
                        chat_id: dataRes.chat_id,
                    },
                    message: {
                        message: 'Hãy gửi lời chào'
                    }
                }
                setListChatSessions((prev) => [newChat, ...prev]);
            }
        }

        console.log("Received a new post event:", data);
    }

    const handleWitchBox = (e) => {
        setSwitchBox(!switchBox)
    }

    const renderHeaderChatSidebar = () => {
        return (
            <div className={cx("header")}>
                <div className={cx("header__title")}>
                    <span className={cx("text")}>Chat</span>
                    <div className={cx("option")}>
                        <Button icon={images.icon.three_dot_icon} shape="circle" />
                    </div>
                </div>

                <div className={cx("header__search")}>
                    <Input isIconBack={false} className={cx("search-input")} placeholder={"Tìm kiếm trên facebook"} icon={images.icon.search_icon} />
                </div>

                <div className={cx("filter")}>
                    <button className={cx("button__filter", {
                        active: !switchBox
                    })} onClick={handleWitchBox}><span value={"box_chat"} onClick={handleWitchBox}>Hộp thư</span></button>
                    <button className={cx("button__filter", {
                        active: switchBox
                    })} onClick={handleWitchBox}><span value={"box_group"} onClick={handleWitchBox}>Cộng đồng</span></button>
                </div>
            </div>
        )
    }

    const renderFooterChatSidebar = () => {
        return (
            <div className={cx("sidebar__footer")}>
                <div style={{
                    backgroundImage: "url('https://static.xx.fbcdn.net/rsrc.php/v3/yP/r/mkY1vqHcE0o.png')",
                    backgroundPosition: "-18px -594px",
                    backgroundSize: "38px 630px",
                    width: "16px",
                    height: "16px",
                    backgroundRepeat: "no-repeat",
                    display: "inline-block"
                }}>

                </div>
                <span>Mở Messenger dành cho Windows</span>
            </div>
        )
    }

    const handleSortChatSession = (dataRes) => {

        setListChatSessions((prev) => {
            let newChat = prev.find((item) => item.chatSession.chat_id == dataRes?.chat_id);
            if (newChat) newChat.message.message = dataRes.new_message;
            let newList = prev.filter((item) => item.chatSession.chat_id != dataRes?.chat_id);

            return [
                newChat,
                ...newList
            ]
        });
    };

    const handleSortChatSessionChild = (chatId, content) => {
        let newChat = listChatSessions.find((item) => item.chatSession.chat_id == chatId);
        if (newChat) newChat.message.message = content;
        let newList = listChatSessions.filter((item) => item.chatSession.chat_id != chatId);

        setListChatSessions([
            newChat,
            ...newList
        ]);
    };

    return (
        <div className={cx("chat__page")}>
            <Row className="g-0">
                <Col xs={3} style={{ width: "23.5%", height: "100%" }}>
                    <Sidebar className={cx("sidebar_chat")}>
                        <CustomBox classBody={cx("custom__body")} header={renderHeaderChatSidebar()} footer={renderFooterChatSidebar()}>
                            <div className={cx("list__chat")}>
                                {listChatSessions?.map((item) => (
                                    <ChatItemInfo
                                        key={item.chatSession.chat_id}
                                        data={item}
                                        onClick={() => {
                                            setCurentChatId(item.chatSession.chat_id);
                                            navigate(`/messenger/${item.chatSession.chat_id}`)
                                        }}
                                    />
                                ))}
                            </div>
                        </CustomBox>
                    </Sidebar>
                </Col>
                <Col xs={9} style={{ width: 'auto', height: "100%", flex: 100 }}>
                    <div className={cx("body__page")}>
                        {curentChatId == 'messenger' ?
                            (<div className={cx("box__init")} style={{
                                backgroundImage: `url(${images.icon.message_notfound})`
                            }}>
                            </div>) :

                            <ListChat key={curentChatId} userData={userData} curentChatId={curentChatId} handleSortChatSession={handleSortChatSessionChild} />
                        }

                    </div>
                </Col>
            </Row>

        </div>
    );
}

export default Chat;