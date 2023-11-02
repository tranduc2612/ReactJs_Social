import classNames from "classnames/bind";
import Box from "~/components/Box/Box";
import styles from "./Profile.module.scss";
import Button from "~/components/Button/Button";
import images from "~/assets/images/index";
import PostView from "~/components/Profile/PostView/PostView";
import IntroView from "~/components/Profile/IntroView/IntroView";
import FriendView from "~/components/Profile/FriendView/FriendView";
import { useEffect, useState } from "react";
import getParamUrl from "~/utils/getParamUrl";
import { Post } from "~/services/base";
import checkResponse from "~/utils/checkResponse";
import { useNavigate } from "react-router-dom";

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

function Profile({ userData }) {
    
    const [content, setContent] = useState(LIST_NAVBAR[0]);
    const [userProfile, setUserProfile] = useState({});
    const [chatId, setChatId] = useState('undefined');
    const navigate = useNavigate();

    useEffect(() => {
        let profileUsername = getParamUrl();

        getProfileInfo(profileUsername);
        getChatId(profileUsername);
    }, [])

    const getProfileInfo = (profileUsername) => {
        Post("/action/get-profile", 
        {
            profile_username: profileUsername,
        }, 
        userData?.access_token)
        .then((res) => {
            if(checkResponse(res)) {
                console.log('react',res)
                let profileUserData = res?.returnObj?.[0];
                setUserProfile(profileUserData);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const getChatId = (profileUsername) => {
        Post("/message/get-chat-id-by-username", 
        {
            username: profileUsername,
        }, 
        userData?.access_token)
        .then((res) => {
            if(checkResponse(res)) {
                console.log('chatid', res)
                let chat_id = res?.returnObj;
                setChatId(chat_id);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const handleFriends = (type) => {
        Post("/action/handle-relationship", 
        {
            action: type,
            target_username: userProfile.username
        }, 
        userData?.access_token)
        .then((res) => {
            if(checkResponse(res)) {
                let type = res?.returnObj?.type_relation;
                setUserProfile((prev) => {return {...prev, type_relationship: type}});
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }
console.log('to', userProfile.type_relationship);
    const renderButton = () => {
        if (userProfile.username == userData.data_user.username) {
            return (
                <Button className={cx("update")} icon={images.icon.pen_icon} size={"text_icon"} onClick={console.log} >
                    Chỉnh sửa trang cá nhân
                </Button>
            )
        }
        switch (userProfile.type_relationship) {
            case 'FRIEND':
                return (
                    <>
                        <Button className={cx("message")} icon={images.icon.unfriend} size={"text_icon"} onClick={console.log} >
                            Chặn
                        </Button>
                        <Button className={cx("relationship")} icon={images.icon.messager} size={"text_icon"} onClick={() => navigate(`/messenger/${chatId}`)} >
                            Nhắn tin
                        </Button>
                    </>
                ) 
            case 'SOURCE_REQUEST': 
                return (
                    <>
                        <Button className={cx("relationship")} icon={images.icon.unfriend} size={"text_icon"} onClick={() => handleFriends('CANCEL')} >
                            Hủy lời mời
                        </Button>
                        <Button className={cx("message")} icon={images.icon.messager} size={"text_icon"} onClick={() => navigate(`/messenger/${chatId}`)} >
                            Nhắn tin
                        </Button>
                    </>
                ) 
            case 'TARGET_REQUEST': 
                return (
                    <>
                        <Button className={cx("message")} size={"text_icon"} onClick={() => handleFriends('ACCEPT')} >
                            Chấp nhận lời mời
                        </Button>
                        <Button className={cx("relationship")} size={"text_icon"} onClick={() => handleFriends('CANCEL')} >
                            Xóa lời mời
                        </Button>
                    </>
                ) 
            default: 
                return (
                    <>
                        <Button className={cx("message")} icon={images.icon.add_friend} size={"text_icon"} onClick={() => handleFriends('ADD_FRIEND')} >
                            Thêm bạn bè
                        </Button>
                        <Button className={cx("relationship")} icon={images.icon.messager} size={"text_icon"} onClick={() => navigate(`/messenger/${chatId}`)} >
                            Nhắn tin
                        </Button>
                    </>
                )
        }
    }

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
                            <div className={cx("name")}>{userProfile.fullname}</div>
                            <div className={cx("num_friend")}>{userProfile.number_friend} bạn bè</div>
                        </div>
                        <div className={cx("option_container")}>
                        {renderButton()}    
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
                    <content.component userData={userData} userProfileData={userProfile}/>
                    
                </div>
            </div>
        </div>
    );
}

export default Profile;