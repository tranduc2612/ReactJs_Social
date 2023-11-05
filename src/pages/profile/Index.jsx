import classNames from "classnames/bind";
import Box from "~/components/Box/Box";
import styles from "./Profile.module.scss";
import Button from "~/components/Button/Button";
import images from "~/assets/images/index";
import PostView from "~/components/Profile/PostView/PostView";
import IntroView from "~/components/Profile/IntroView/IntroView";
import FriendView from "~/components/Profile/FriendView/FriendView";
import { useEffect, useRef, useState } from "react";
import getParamUrl from "~/utils/getParamUrl";
import { BASE_URL_MEDIA, Post } from "~/services/base";
import checkResponse from "~/utils/checkResponse";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { INPUT_ACCEPT_TYPE_IMAGE } from "~/utils/constant";
import { useDispatch } from 'react-redux'
import { updateAccount } from "~/redux/store/authSlide";


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
    const [listFriends, setListFriends] = useState([]);
    const [chatId, setChatId] = useState('undefined');
    const navigate = useNavigate();
    const [linkAvatar, setLinkAvatar] = useState(null);
    const [linkCover, setLinkCover] = useState(null);
    const refAvatarInput = useRef(null);
    const refCoverInput = useRef(null);
    const dispatch = useDispatch();
    console.log(userData);
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
                if (checkResponse(res)) {
                    let profileUserData = res?.returnObj?.profile?.[0];
                    let listFriend = res?.returnObj?.friends;
                    setUserProfile({
                        ...profileUserData,
                        listFriend
                    });
                    setListFriends(listFriend);
                    setLinkAvatar(profileUserData.avatar)
                    setLinkCover(profileUserData.cover)

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
                if (checkResponse(res)) {
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
        console.log('x', userProfile.username)
        Post("/action/handle-relationship",
            {
                action: type,
                target_username: userProfile.username
            },
            userData?.access_token)
            .then((res) => {
                if (checkResponse(res)) {
                    let type = res?.returnObj?.[0].type_relation ?? null;
                    setUserProfile((prev) => { return { ...prev, type_relationship: type } });
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleUpdateInfo = (info) => {
        setUserProfile((prev) => {
            return {
                ...prev,
                ...info
            }
        });
        setContent(LIST_NAVBAR[0]);
    }

    const handleUpAvatar = async (input) => {
        const file = input.target.files[0];
        if (!(INPUT_ACCEPT_TYPE_IMAGE.includes(file.type))) {
            input.target.value = "";
            toast.warn("Định dạng file ảnh không hợp lệ");
            return;
        }
        const formData = new FormData();
        formData.append('media', file);
        await Post("/action/change-avatar", formData, userData.access_token)
            .then(res => {
                if (checkResponse(res)) {
                    setLinkAvatar(res.returnObj)
                    dispatch(updateAccount({
                        avatar: res.returnObj
                    }))
                    toast.success("Tải ảnh đại diện thành công");
                }
            })
    }

    const handleUpCover = async (input) => {
        const file = input.target.files[0];
        if (!(INPUT_ACCEPT_TYPE_IMAGE.includes(file.type))) {
            input.target.value = "";
            toast.warn("Định dạng file ảnh không hợp lệ");
            return;
        }
        const formData = new FormData();
        formData.append('media', file);
        await Post("/action/change-cover-bg", formData, userData.access_token)
            .then(res => {
                if (checkResponse(res)) {
                    setLinkCover(res.returnObj)
                    dispatch(updateAccount({
                        cover: res.returnObj
                    }))
                    toast.success("Tải ảnh bìa thành công");
                }
            })
    }



    const renderButton = () => {
        if (userProfile.username == userData.data_user.username) {
            return (
                <>
                    <Button className={cx("update")} icon={images.icon.pen_icon} size={"text_icon"} onClick={() => refCoverInput.current.click()} >
                        Thay đổi ảnh bìa
                    </Button>
                    <input className="d-none" type="file" ref={refCoverInput} onChange={handleUpCover} />
                </>
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
    if (!userProfile?.username) {
        return <></>
    }
    return (
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <div className={cx("cover_container")}>
                    <div className={cx("cover")} style={{ backgroundImage: `url("${BASE_URL_MEDIA + linkCover}")` }}>
                    </div>
                </div>
                <div className={cx("info_container")}>
                    <div className={cx("info")}>
                        <div className={cx("avatar_container")}>
                            <Button className={cx("avatar")} shape="circle" icon={BASE_URL_MEDIA + linkAvatar} full_icon={true} size={"avt"} />
                            <Button className={cx("upload")} shape="circle" icon={images.icon.icon_camera} size={"sm"} onClick={() => refAvatarInput.current.click()} />
                            <input className="d-none" type="file" ref={refAvatarInput} onChange={handleUpAvatar} />
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
                    <content.component userData={userData} userProfileData={userProfile} handleUpdateInfo={handleUpdateInfo} />

                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Profile;