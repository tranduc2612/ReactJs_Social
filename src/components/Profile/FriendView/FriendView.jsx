import styles from "./FriendView.module.scss"
import classNames from "classnames/bind";
import Box from "../../../components/Box/Box";
import images from "../../../assets/images/index";
import Input from "../../../components/Input/Input"
import { useEffect, useRef, useState } from "react";
import Button from "../../../components/Button/Button";

const cx = classNames.bind(styles);

const OneBtn = ({onClick, title}) => {
    <Button className={cx("button")}>{title}</Button>
}

const TwoBtn = ({onClick, accept, decline}) => {
    <>
        <Button className={cx("button", "accept")}>{accept}</Button>
        <Button className={cx("button", "decline")}>{decline}</Button>
    </>
}

const LIST_NAV_FRIEND = [
    {
        id: 'FRIEND',
        title: 'Bạn bè',
        action: OneBtn
    },
    {
        id: 'REQUEST',
        title: TwoBtn
    },
    {
        id: 'BLOCK',
        title: OneBtn
    }
]

function FriendView({user}) {
    const [content, setContent] = useState(LIST_NAV_FRIEND[0]);
    
    return (
        <div className={cx("container")}>
            <Box className={cx("box_container")}>
                <div className={cx("title")}>
                    <div>
                        <h2>Bạn bè</h2>
                    </div>
                    <div>
                        <Input className={cx("search")} icon={images.icon.search_icon} placeholder={"Tìm kiếm trên Messenger"}/>
                    </div>
                </div>
                <div className={cx("navbar")}>
                    <div className={cx("navbar_container")}>
                        {LIST_NAV_FRIEND.map((nav)=>{
                            return (
                                <div key={nav.id} className={cx("navbar_item")} onClick={() => setContent(nav)}>
                                    <span className={cx("", {title_active: nav.id == content.id})}>{nav.title}</span>
                                    <div className={cx("", {underline: nav.id == content.id})}></div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={cx("friendview", "row")}>
                    {user.listFriends.map((friend) => {
                        return (
                            <div key={friend.name} className={cx("friend_item", "col-6")}>
                                <div className={cx("friend_box")}>
                                    <div className={cx("info_container")}>
                                        <img className={cx("avatar")} src={friend.avatar} alt="" />
                                        <div className={cx("name")}>{friend.name}</div>
                                    </div>
                                    <div className={cx("button_container")}>
                                        
                                        <Button className={cx("button", "accept")}>Xác nhận</Button>
                                        <Button className={cx("button", "decline")}>Xóa</Button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Box>
        </div>
    );
}

export default FriendView;