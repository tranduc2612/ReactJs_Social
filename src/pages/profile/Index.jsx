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

const InCommingView = () => {
    return (
        <div style={{ fontSize: '17px', fontWeight: '600' }}>Tính năng đang được phát triển</div>
    )
}

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
    },
    {
        id: "IMAGE",
        title: "Ảnh",
        component: InCommingView,
    },
    {
        id: "VIDEO",
        title: "Video",
        component: InCommingView,
    },
    {
        id: "CHECKIN",
        title: "Check in",
        component: InCommingView,
    }
];

const user = {
    aboutMe: "What does the matter with you?",
    address: "Hà Nội, Việt Nam",
    dayOfBirth: '05/10/2002',
    gender: "MALE",
    email: "ngoc43552@gmail.com",
    phone: "0399620226",
    listFriends: [
        {
            name: "Sỹ",
            avatar: "https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/320714942_3100507576913304_599481984247371992_n.jpg?stp=dst-jpg_p148x148&_nc_cat=111&ccb=1-7&_nc_sid=471e40&_nc_ohc=pCwgGMHMB_wAX9R0NyJ&_nc_ht=scontent.fhan2-3.fna&oh=00_AfDYXSJZ2rv4S0wpDXOsndHUfuXe4MWqVhjBOqqYKdHxTQ&oe=650F641A",
            link: "https://www.facebook.com/lxq.2002"
        },
        {
            name: "Phạm Trung Hiếu",
            avatar: "https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/354235367_3556111618005013_5886006779707150620_n.jpg?stp=c0.49.148.148a_dst-jpg_p148x148&_nc_cat=102&ccb=1-7&_nc_sid=471e40&_nc_ohc=yWghVyy1GogAX93s4TG&_nc_ht=scontent.fhan2-3.fna&oh=00_AfCaDxsmDSxOkrpKL8faalzfuMkTffmR3_qLY1kkZkmthg&oe=650FA902",
            link: "https://www.facebook.com/lxq.2002"
        },
        {
            name: "Phạm Hưng Thịnh",
            avatar: "https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/349064724_3074187822876031_8221662170781482853_n.jpg?stp=dst-jpg_p148x148&_nc_cat=104&ccb=1-7&_nc_sid=471e40&_nc_ohc=GC0MzK85DWsAX-5z4ew&_nc_ht=scontent.fhan2-3.fna&oh=00_AfA76WcMNzES-aGztekgkmcFLiepE4sHOtjkkNU2o7_ROQ&oe=6510C86B",
            link: "https://www.facebook.com/lxq.2002"
        },
        {
            name: "Lộc Nguyễn",
            avatar: "https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/278662494_1642511472763191_6945221345735626720_n.jpg?stp=dst-jpg_p148x148&_nc_cat=102&ccb=1-7&_nc_sid=471e40&_nc_ohc=tRg59ds1450AX-6mUO7&_nc_ht=scontent.fhan2-3.fna&oh=00_AfAbvU0O5k1f4oWZOIBxiDyjnhlt3mTk-Ha-HDIVFgUY0g&oe=650F0DCD",
            link: "https://www.facebook.com/lxq.2002"
        },
        {
            name: "Liêm Đức Đỗ",
            avatar: "https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/272155317_1682064768794927_7216782382904572955_n.jpg?stp=c2.0.148.148a_dst-jpg_p148x148&_nc_cat=106&ccb=1-7&_nc_sid=471e40&_nc_ohc=Z8YSAGoeYLIAX__k5ZO&_nc_ht=scontent.fhan2-3.fna&oh=00_AfDFO7TqGj6UoR7UUZeD6-UZOxNe0T0sVxR4ZuSCvo1BGg&oe=651038D3",
            link: "https://www.facebook.com/lxq.2002"
        },
        {
            name: "Vinh Thành",
            avatar: "https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/353785177_1804781826583275_2742571180989001880_n.jpg?stp=dst-jpg_p148x148&_nc_cat=108&ccb=1-7&_nc_sid=471e40&_nc_ohc=KZnvFHH2H3kAX_XoF8P&_nc_ht=scontent.fhan2-3.fna&oh=00_AfCBvKvDuSk-I_WPQMnAbAzn4OpWCtY5na4wGp0uOZubbg&oe=650F2BD0",
            link: "https://www.facebook.com/lxq.2002"
        },
        {
            name: "Nam Gino",
            avatar: "https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/326199239_544861714341954_7162155349869791935_n.jpg?stp=dst-jpg_p148x148&_nc_cat=108&ccb=1-7&_nc_sid=471e40&_nc_ohc=koCxv-po3tUAX958Ofg&_nc_ht=scontent.fhan2-3.fna&oh=00_AfC-bPvs-82eQRD8eQcilwJRQfUnbTYZEiSrHd0qPFivhQ&oe=650F727E",
            link: "https://www.facebook.com/lxq.2002"
        },
        {
            name: "Hào Vũ",
            avatar: "https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/345891680_202868235431529_4095745457861929540_n.jpg?stp=dst-jpg_p148x148&_nc_cat=101&ccb=1-7&_nc_sid=471e40&_nc_ohc=mnk-GSmSAVgAX85h5gE&_nc_ht=scontent.fhan2-3.fna&oh=00_AfBsjfgxFybWVEx5EqKK1uasv1aQyEF_53jGEBe0aR2XbQ&oe=650FEF7A",
            link: "https://www.facebook.com/lxq.2002"
        },
        {
            name: "Liêm Đức Đỗ",
            avatar: "https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/272155317_1682064768794927_7216782382904572955_n.jpg?stp=c2.0.148.148a_dst-jpg_p148x148&_nc_cat=106&ccb=1-7&_nc_sid=471e40&_nc_ohc=Z8YSAGoeYLIAX__k5ZO&_nc_ht=scontent.fhan2-3.fna&oh=00_AfDFO7TqGj6UoR7UUZeD6-UZOxNe0T0sVxR4ZuSCvo1BGg&oe=651038D3",
            link: "https://www.facebook.com/lxq.2002"
        },
    ]
}

function Profile({ userData }) {

    const [content, setContent] = useState(LIST_NAVBAR[0]);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <div className={cx("cover_container")}>
                    <div className={cx("cover")} style={{ backgroundImage: 'url("https://scontent.fhan4-1.fna.fbcdn.net/v/t39.30808-6/324025292_1314744665765839_8870951313051136517_n.jpg?stp=dst-jpg_p960x960&_nc_cat=104&ccb=1-7&_nc_sid=52f669&_nc_ohc=cnk052oTQS4AX_0Ybva&_nc_ht=scontent.fhan4-1.fna&oh=00_AfAkn4CKVmgEohzlSV0Dgr_z2GFX4BvrzWs1RvprXYzt2w&oe=65006A57")' }}>
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
                            <Button className={cx("relationship")} icon={images.icon.friend_icon_check} size={"text_icon"} onClick={console.log} >
                                Bạn bè
                            </Button>
                            <Button className={cx("message")} icon={images.icon.messager} size={"text_icon"} onClick={console.log} >
                                Nhắn tin
                            </Button>
                            {/* <Button className={cx("update")} icon={images.icon.pen_icon} size={"text_icon"} onClick={console.log} >
                                Chỉnh sửa trang cá nhân
                            </Button> */}
                        </div>
                    </div>
                </div>
                <div className={cx("divider")}>
                </div>
            </div>
            <div className={cx("navbar")}>
                <div className={cx("navbar_container")}>
                    {LIST_NAVBAR.map((nav) => {
                        return (
                            <div key={nav.id} className={cx("navbar_item")} onClick={() => setContent(nav)}>
                                <span className={cx("", { title_active: nav.id == content.id })}>{nav.title}</span>
                                <div className={cx("", { underline: nav.id == content.id })}></div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={cx("content")}>
                <div className={cx("content_container")}>
                    <content.component userData={userData} />
                </div>
            </div>
        </div>
    );
}

export default Profile;