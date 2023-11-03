import styles from "./FriendView.module.scss"
import classNames from "classnames/bind";
import Box from "~/components/Box/Box";
import images from "~/assets/images/index";
import Input from "~/components/Input/Input"
import { useEffect, useRef, useState } from "react";
import Button from "~/components/Button/Button";
import { Get, Post, BASE_URL_MEDIA } from "~/services/base";
import checkResponse from "~/utils/checkResponse";

const cx = classNames.bind(styles);

const FriendBtn = ({onClick, targetUsername}) => (
    <>
        <Button onClick={() => onClick('CANCEL', targetUsername)} className={cx("button", "decline")}>Hủy kết bạn</Button>
        <Button onClick={() => onClick('BLOCK', targetUsername)} className={cx("button", "decline")}>Chặn</Button>
    </>
)

const RequestBtn = ({onClick, targetUsername}) => (
    <>
        <Button onClick={() => onClick('ACCEPT', targetUsername)} className={cx("button", "accept")}>Chấp nhận</Button>
        <Button onClick={() => onClick('CANCEL', targetUsername)} className={cx("button", "decline")}>Từ chối</Button>
    </>
)

const BlockBtn = ({onClick, targetUsername}) => (
    <>
        <Button onClick={() => onClick('UNBLOCK', targetUsername)} className={cx("button", "accept")}>Bỏ Chặn</Button>
    </>
)

function FriendView({ userData, userProfileData, handleUpdateInfo= null }) {
    const [content, setContent] = useState({
        id: 'FRIEND',
        title: 'Bạn bè',
        listAcc: userProfileData.listFriend,
        action: FriendBtn
    });
    const [listRequest, setListRequest] = useState([]);
    const [listBlock, setListBlock] = useState([]);
    const [listFriend, setListFriend] = useState(userProfileData.listFriend);

    useEffect(()=> {
        if (userData.data_user.username == userProfileData.username) {
            getProfileInfo();
        }
    }, [])
    
    const getProfileInfo = () => {
        Post("/action/get-list-account", 
        {}, 
        userData?.access_token)
        .then((res) => {
            if(checkResponse(res)) {
                let request = res?.returnObj?.list_request;
                let block = res?.returnObj?.list_block;
                setListRequest(request);
                setListBlock(block);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const handleFriends = (type, targetUsername) => {
        Post("/action/handle-relationship", 
        {
            action: type,
            target_username: targetUsername
        }, 
        userData?.access_token)
        .then((res) => {
            if(checkResponse(res)) {
                // let type = res?.returnObj?.[0].type_relation ?? null;
                // setUserProfile((prev) => {return {...prev, type_relationship: type}});
                switch (content.id) {

                    case 'FRIEND':
                        let listNewFriend = listFriend.filter((item) => item.username != targetUsername);
                        setListFriend(listNewFriend);
                        break;
                    case 'BLOCK':
                        let listNewBlock = listBlock.filter((item) => item.username != targetUsername);
                        console.log(listNewBlock);
                        setListBlock(listNewBlock);
                        break;
                    case 'REQUEST':
                        let newFriend = listRequest.find((item) => item.username == targetUsername);
                        let listNewRequest = listFriend.filter((item) => item.username != targetUsername);
                        setListRequest(listNewRequest);
                        if (type == 'ACCEPT') {
                            setListFriend((prev) => {return {newFriend, ...prev }});
                        }
                        break;
                }
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const LIST_NAV_FRIEND = [
        {
            id: 'FRIEND',
            title: 'Bạn bè',
            listAcc: listFriend,
            action: FriendBtn
        },
        {
            id: 'REQUEST',
            title: 'Yêu cầu kết bạn',
            listAcc: listRequest,
            action: RequestBtn,
        },
        {
            id: 'BLOCK',
            title: 'Tài khoản đã chặn',
            listAcc: listBlock,
            action: BlockBtn
        }
    ]

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
                        {LIST_NAV_FRIEND.map((nav, index)=>{
                            if (userData.data_user.username != userProfileData.username && index > 0) return <div key={index}></div>
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
                    {content?.listAcc?.map((friend) => {
                        return (
                            <div key={friend.username} className={cx("friend_item", "col-6")}>
                                <div className={cx("friend_box")}>
                                    <div className={cx("info_container")}>
                                        <img className={cx("avatar")} src={`${BASE_URL_MEDIA}/${friend.avatar}`} alt="" />
                                        <div className={cx("name")}>{friend.fullname}</div>
                                    </div>
                                    <div className={cx("button_container")}>
                                        <content.action onClick={handleFriends} targetUsername={friend.username}/>
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