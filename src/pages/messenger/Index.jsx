import classNames from "classnames/bind";
import styles from "./Messenger.module.scss"
import CustomBox from "~/components/CustomBox/CustomBox";
import Sidebar from "~/components/Sidebar/Sidebar";
import Button from "~/components/Button/Button";
import images from "~/assets/images/index";
import Input from "~/components/Input/Input";
import {useState} from "react"
import ChatItem from "~/components/BoxMessenger/components/ChatItem";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputEditor from '~/components/InputEditor/InputEditor';
import MessengerContent from "~/components/MessegerItem/MessageContent/MessegerItem";
import SeenItem from "~/components/MessegerItem/SeenItem/SeenItem";
import TimeLine from "~/components/MessegerItem/TimeLine/TimeLine";
const cx = classNames.bind(styles);

const BASE_BTN = {
    box_chat: false,
    box_group: false
 }

 const LIST_MESSAGE = [
    1,2,3,4,6,7
 ]

function Chat() {
    const [switchBox,setSwitchBox] = useState(false);

    const handleWitchBox = (e) =>{
        setSwitchBox(!switchBox)
    }

    const renderHeaderChatSidebar = () =>{
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
                    <button className={cx("button__filter",{
                        active: !switchBox
                    })} onClick={handleWitchBox}><span value={"box_chat"} onClick={handleWitchBox}>Hộp thư</span></button>
                    <button className={cx("button__filter",{
                        active: switchBox
                    })} onClick={handleWitchBox}><span value={"box_group"} onClick={handleWitchBox}>Cộng đồng</span></button>
                </div>
            </div>
        )
    }

    const renderFooterChatSidebar = () =>{
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

    const renderHeaderBoxChat = () =>{
        return (
            <div className={cx("header")}>
                <div className={cx("header__left")}>
                    <div className={cx("avatar")}>
                        <Button icon={images.icon.avatar_demo} shape="circle" full_icon={true} />
                    </div>
                    <div className={cx("info")}>
                        <span>Cùng Lấy Học Bổng Xuất Sắc Cùng Đức Nào !</span>
                        <span>
                            Đang hoạt động
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
                        <svg height="34px" role="presentation" viewBox="-3 -5 30 30" width="34px"><path d="M19.492 4.112a.972.972 0 00-1.01.063l-3.052 2.12a.998.998 0 00-.43.822v5.766a1 1 0 00.43.823l3.051 2.12a.978.978 0 001.011.063.936.936 0 00.508-.829V4.94a.936.936 0 00-.508-.828zM10.996 18A3.008 3.008 0 0014 14.996V5.004A3.008 3.008 0 0010.996 2H3.004A3.008 3.008 0 000 5.004v9.992A3.008 3.008 0 003.004 18h7.992z" fill="#0084ff"></path><circle class="x1xgahvj" cx="24" cy="10" r="2"></circle></svg>
                    </Button>
                    <Button shape={"circle"}>
                        <svg height="24px" name="icon" role="presentation" viewBox="0 0 36 36" width="24px"><g transform="translate(18,18)scale(1.2)translate(-18,-18)"><path d="M18,10 C16.6195,10 15.5,11.119 15.5,12.5 C15.5,13.881 16.6195,15 18,15 C19.381,15 20.5,13.881 20.5,12.5 C20.5,11.119 19.381,10 18,10 Z M16,25 C16,25.552 16.448,26 17,26 L19,26 C19.552,26 20,25.552 20,25 L20,18 C20,17.448 19.552,17 19,17 L17,17 C16.448,17 16,17.448 16,18 L16,25 Z M18,30 C11.3725,30 6,24.6275 6,18 C6,11.3725 11.3725,6 18,6 C24.6275,6 30,11.3725 30,18 C30,24.6275 24.6275,30 18,30 Z" fill="#0084ff" stroke="#0084ff"></path></g></svg>
                    </Button>
                </div>
            </div>
        )
    }   

    const renderFooterBoxChat = () =>{
        return (
            <div className={cx("footer")}>
                <InputEditor />
            </div>
        )
    }

    return ( 
        <div className={cx("chat__page")}>
            <Row className="g-0">
                <Col xs={3} style={{width: "23.5%",height: "100%"}}>
                    <Sidebar className={cx("sidebar_chat")}>
                        <CustomBox classBody={cx("custom__body")} header={renderHeaderChatSidebar()} footer={renderFooterChatSidebar()}>
                            <div className={cx("list__chat")}>
                                <ChatItem />
                                {/* <ChatItem />
                                <ChatItem />
                                <ChatItem />
                                <ChatItem />
                                <ChatItem />
                                <ChatItem />
                                <ChatItem />
                                <ChatItem />
                                <ChatItem />
                                <ChatItem />
                                <ChatItem />
                                <ChatItem />
                                <ChatItem />
                                <ChatItem />
                                <ChatItem />
                                <ChatItem /> */}

                            </div>

                        </CustomBox>
                    </Sidebar>
                </Col>
                <Col xs={9} style={{width: '76.5%',height: "100%"}}>
                    <div className={cx("body__page")}>
                        {/* <div className={cx("box__init")}>
                            <span>Hãy chọn một đoạn chat hoặc bắt đầu cuộc trò chuyện mới</span>
                        </div> */}
                        <CustomBox classBody={cx("custom__body")} className={cx("box__chat")} header={renderHeaderBoxChat()} footer={renderFooterBoxChat()}>
                            <div className={cx("list__message")}>
                                {/* <MessengerContent />
                                <MessengerContent type="partner" />
                                <MessengerContent />
                                <MessengerContent type="partner" />
                                <MessengerContent />
                                <MessengerContent />
                                <MessengerContent /> */}
                                {LIST_MESSAGE.map(mess=>{
                                    {/* có 1 cái cờ để bt là đâu là tin cuối cùng đã được xem */}
                                    let flag = false;
                                    if(mess === 7){
                                        flag = true;
                                    }
                                    return (
                                        <>
                                            {mess === 2 ? <TimeLine /> : <></>}
                                            <MessengerContent key={mess} flag={flag} type={mess % 2 == 0 ? "partner": null} />
                                        </>
                                    )
                                })}
                                
                            </div>

                        </CustomBox>
                    </div>
                </Col>
            </Row>
                        
        </div> 
    );
}

export default Chat;