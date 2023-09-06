import { forwardRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./BoxMessenger.module.scss";
import Box from "~/components/Box/Box"
import Button from "~/components/Button/Button"
import images from "~/assets/images/index";
import Input from "~/components/Input/Input"
import ChatItem from "./components/ChatItem";

const cx = classNames.bind(styles)

const BASE_BTN = {
    box_chat: false,
    box_group: false
 }

function BoxMessenger(props,ref) {
    const [switchBox,setSwitchBox] = useState(BASE_BTN);

    const handleWitchBox = (e) =>{
        const value = e.target.getAttribute("value");
        let newFilter = {...BASE_BTN};

        if(value == "box_chat"){
            newFilter.box_chat = true
        }
        if(value == "box_group"){
            newFilter.box_group = true
        }
        setSwitchBox(newFilter)
    }
    

    return ( <div className={cx("wrapper")} ref={ref}>
    <Box>
        <div className={cx("messenger")}>
            <div className={cx("header","d-flex align-items-center justify-content-between")}>
                <h2>Chat</h2>
                <Button icon={images.icon.three_dot_icon} size={"sm"} shape="circle"/>
            </div>
            <div className={cx("body")}>
                <div className={cx("search__chat")}>
                    <Input icon={images.icon.search_icon} placeholder={"Tìm kiếm trên Messenger"}/>
                </div>
                
                <div className={cx("filter")}>
                    <button className={cx("button__filter",{
                        active: switchBox.box_chat
                    })} onClick={()=>{}}><span value={"box_chat"} onClick={handleWitchBox}>Hộp thư</span></button>
                    <button className={cx("button__filter",{
                        active: switchBox.box_group
                    })} onClick={()=>{}}><span value={"box_group"} onClick={handleWitchBox}>Cộng đồng</span></button>
                </div>

                <ul className={cx("list__chat")}>
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

                </ul>
            </div>
        </div>
    </Box>
</div> );
}

export default forwardRef(BoxMessenger);