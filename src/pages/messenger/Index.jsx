import classNames from "classnames/bind";
import styles from "./Messenger.module.scss"
import SideBar from '~/components/Sidebar/Sidebar';
import CustomBox from "~/components/CustomBox/CustomBox";
import Sidebar from "~/components/Sidebar/Sidebar";
import Button from "~/components/Button/Button";
import images from "~/assets/images/index";
import Input from "~/components/Input/Input";
import {useState} from "react"
import ChatItem from "~/components/BoxMessenger/components/ChatItem";

const cx = classNames.bind(styles);

const BASE_BTN = {
    box_chat: false,
    box_group: false
 }

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

    return ( 
        <div className={cx("chat__page")}>
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

            <div className={cx("body")}>
                <div>
                    asdasd
                </div>
            </div>
        </div> 
    );
}

export default Chat;