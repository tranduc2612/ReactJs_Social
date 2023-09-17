import classNames from "classnames/bind";
import Box from "~/components/Box/Box";
import styles from "./Profile.module.scss";
import Button from "~/components/Button/Button";
import images from "~/assets/images/index";
import PostView from "~/components/Profile/PostView/PostView";
import IntroView from "~/components/Profile/IntroView/IntroView";
import FriendView from "~/components/Profile/FriendView/FriendView";
import { useState } from "react";

const cx = classNames.bind(styles);
const LIST_NAVBAR = [
    {
        id: "POST",
        title: "Bài viết",
        component: PostView
    },
    {
        id: "INTRO",
        title: "Giới thiệu",
        component: IntroView,
    },
    {
        id: "FRIEND",
        title: "Bạn bè",
        component: FriendView,
    }
]

const user = {
    aboutMe: "What does the matter with you ✿",
    address: "Hà Nội, Việt Nam",
    dayOfBirth: '05/10/2002',
    gender: "MALE",
    email: "ngoc43552@gmail.com",
    phone: "0399620226"
}

function Profile() {

    const [content, setContent] = useState(LIST_NAVBAR[0]);

    return ( 
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <div className={cx("cover_container")}>
                    <div className={cx("cover")} style={{backgroundImage: 'url("https://scontent.fhan4-1.fna.fbcdn.net/v/t39.30808-6/324025292_1314744665765839_8870951313051136517_n.jpg?stp=dst-jpg_p960x960&_nc_cat=104&ccb=1-7&_nc_sid=52f669&_nc_ohc=cnk052oTQS4AX_0Ybva&_nc_ht=scontent.fhan4-1.fna&oh=00_AfAkn4CKVmgEohzlSV0Dgr_z2GFX4BvrzWs1RvprXYzt2w&oe=65006A57")'}}>
                    </div>
                </div>
                <div className={cx("info_container")}>
                    <div className={cx("info")}>
                        <div className={cx("avatar_container")}>
                            <Button className={cx("avatar")} shape="circle" icon={"https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-1/362667540_1732772347140444_7909649419937236249_n.jpg?stp=dst-jpg_p320x320&_nc_cat=110&ccb=1-7&_nc_sid=fe8171&_nc_ohc=SsCLa0svyD4AX-2Yktg&_nc_ht=scontent.fhan19-1.fna&oh=00_AfBp2YUjh-LQAJlN-XJOhbJz8hhtLdg7fYdyqNPCv3_RHw&oe=65029827"} full_icon={true} size={"avt"} onClick={console.log} />
                            <Button className={cx("upload")} shape="circle" icon={images.icon.icon_camera} size={"sm"} onClick={console.log} />
                        </div>
                        <div className={cx("name_container")}>
                            <div className={cx("name")}>Quỳnh Lê</div>
                            <div className={cx("num_friend")}>50 bạn bè</div>
                        </div>
                        <div className={cx("option_container")}>
                            {/* <Button className={cx("relationship")} icon={images.icon.friend_icon_check} size={"text_icon"} onClick={console.log} >
                                Bạn bè
                            </Button>
                            <Button className={cx("message")} icon={images.icon.messager} size={"text_icon"} onClick={console.log} >
                                Nhắn tin
                            </Button> */}
                            <Button className={cx("update")} icon={images.icon.pen_icon} size={"text_icon"} onClick={console.log} >
                                Chỉnh sửa trang cá nhân
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={cx("divider")}>
                </div>
            </div>
            <div className={cx("navbar")}>
                <div className={cx("navbar_container")}>
                    {LIST_NAVBAR.map((nav)=>{
                        return (
                            <div key={nav.id} className={cx("navbar_item")} onClick={() => setContent(nav)}>
                                <span className={cx(`${nav.id == content.id ? "title_active" : ""}`)}>{nav.title}</span>
                                <div className={cx(`${nav.id == content.id ? "underline" : ""}`)}></div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={cx("content")}>
                <div className={cx("content_container")}>
                    <content.component user={user}/>
                </div>
            </div>
        </div>
    );
}

export default Profile;