import { useEffect, useState, useCallback, useRef } from "react";
import classNames from "classnames/bind";
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux'

import styles from "./Home.module.scss"
import images from "~/assets/images/index";
import SideBar from "~/components/Sidebar/Sidebar";
import SideBarItem from "~/components/SidebarItem/SidebarItem";
import CreatePost from "~/components/CreatePost/CreatePost";
import ListNewFeed from "~/components/ListNewFeed/ListNewFeed";
import { getListPost } from "~/redux/actions/postActions";
import { Get, Post } from "~/services/base";
import { createContext } from "react";
import checkResponse from "~/utils/checkResponse";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL_MEDIA } from "~/services/base";


const cx = classNames.bind(styles);

const SideBarLeft = [{
    id: 1,
    title: "Bạn bè",
    position: "0px -304px",
    img_url: images.icon.list_icon_sidebar,
    link: '/'
}, {
    id: 2,
    title: "Messenger",
    position: "0px 0px",
    img_url: images.icon.list_icon_sidebar_2,
    link: '/messenger'
}, {
    id: 3,
    title: "Kỷ niệm",
    position: "0 -456px",
    img_url: images.icon.list_icon_sidebar,
    link: '/'
}, {
    id: 4,
    title: "Đã lưu",
    position: "0 -190px",
    img_url: images.icon.list_icon_sidebar,
    link: '/'
}, {
    id: 5,
    title: "Chơi game",
    position: "0px -76px",
    img_url: images.icon.list_icon_sidebar,
    link: '/'
}]

const SideBarLeftAll = [{
    id: 1,
    title: "Bạn bè",
    position: "0px -304px",
    img_url: images.icon.list_icon_sidebar
}, {
    id: 2,
    title: "Messenger",
    position: "0px 0px",
    img_url: images.icon.list_icon_sidebar_2
}, {
    id: 3,
    title: "Kỷ niệm",
    position: "0 -456px",
    img_url: images.icon.list_icon_sidebar
}, {
    id: 4,
    title: "Đã lưu",
    position: "0 -190px",
    img_url: images.icon.list_icon_sidebar
}, {
    id: 5,
    title: "Chơi game",
    position: "0px -76px",
    img_url: images.icon.list_icon_sidebar
}, {
    id: 6,
    title: "Chiến dịch dây quỹ",
    position: "0px -342px",
    img_url: images.icon.list_icon_sidebar
}]

export const ListPostContext = createContext();

function Home({ userData }) {
    // const lstPost = useSelector((state) => state.post);
    // console.log(lstPost, "lstPost")
    const dispatch = useDispatch();
    const refListNewFeed = useRef(null)
    const [listSideBar, setListSidebar] = useState(SideBarLeft);
    const [moreSidebar, setMoreSidebar] = useState(false);
    const [listFriend, setListFriend] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (moreSidebar) {
            setListSidebar(SideBarLeftAll)
        } else {
            setListSidebar(SideBarLeft)
        }
    }, [moreSidebar])

    useEffect(() => {
        getListFriend();
    }, [])

    const getListFriend = () => {
        Post("/action/get-list-account",
            {},
            userData?.access_token)
            .then((res) => {
                if (checkResponse(res)) {
                    let friend = res?.returnObj?.list_friend;
                    setListFriend(friend);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleMoreSidebar = () => {
        // đoạn này xử lí thêm bớt thanh sidebar sau xử lí logic sau // fix tạm
        setMoreSidebar(!moreSidebar);
    }

    const fetchApiPost = useCallback(async (dataFetch) => {
        const res = await Get(`/post/get-list?page_count=${dataFetch.page_count}&page_index=${dataFetch.page_index}`, dataFetch, userData?.access_token)
        return res
    }, [])

    const handlePost = async (dataSend) => {
        const res = await Post(
            "/post/handle-post", dataSend, userData?.access_token
        )

        if (checkResponse(res)) {
            // Thêm bài viết
            const currentListPost = refListNewFeed.current.getListPost();
            const functionName = dataSend?.function;
            if (functionName === "C") {
                const newList = [
                    res.returnObj,
                    ...currentListPost
                ];

                refListNewFeed.current.setListPost(newList);
            } else if (functionName === "U") {
                // Sửa bài viết
                const updatedPost = res.returnObj[0];
                const updatedState = currentListPost.map((post) => {
                    if (post.post_id === updatedPost.post_id) {
                        return updatedPost;
                    }
                    return post;
                });
                refListNewFeed.current.setListPost(updatedState);
            } else if (functionName === "D") {
                // Xóa bài viết
                const deletedList = currentListPost.filter((post) => post.post_id != res.returnObj);
                refListNewFeed.current.setListPost(deletedList);
            } else {
                return null;
            }
            return res;
        }
        return null;
    }

    return (<div className={cx("home")}>
        <SideBar className={cx("left__sidebar")}>
            <ul className={cx("left__sidebar-list")}>
                <SideBarItem onClick={() => navigate('/profile/' + userData.data_user?.username)} avatar={BASE_URL_MEDIA + userData.data_user?.avatar} title={userData.data_user?.fullname} />
                {listSideBar.map(item => {
                    return (
                        <SideBarItem onClick={() => navigate(item.link)} key={item.id} title={item.title} data={item} />
                    )
                })}
                {
                    moreSidebar ?
                        <SideBarItem onClick={handleMoreSidebar} avatar={images.icon.arrow_up} title={"Thu gọn"} />
                        : <SideBarItem onClick={handleMoreSidebar} avatar={images.icon.arrow_down} title={"Xem thêm"} />
                }
                <div className={cx("your__shortcut")}>
                    <h3 className={"pt-4 pb-2 fs-3"} style={{ paddingLeft: "16px", color: "#6f7175" }}>Lối tắt của bạn</h3>
                    <SideBarItem avatar={images.icon.insta} title={"Kết nối với Instagram"} shape={"square"} onClick={() => { window.open('https://www.instagram.com/') }} />
                    <SideBarItem avatar={images.icon.tiktok} title={"Kết nối với Tiktok"} shape={"square"} onClick={() => { window.open('https://tiktok.com/') }} />
                    <SideBarItem avatar={images.icon.twitter} title={"Kết nối với Twitter"} shape={"square"} onClick={() => { window.open('https://twitter.com/') }} />
                    <SideBarItem avatar={images.icon.tinder} title={"Kết nối với Tinder"} shape={"square"} onClick={() => { window.open('https://tinder.com/') }} />
                    <SideBarItem avatar={images.icon.thread} title={"Kết nối với Thread"} shape={"square"} onClick={() => { window.open('https://thread.com/') }} />
                    <SideBarItem avatar={images.icon.github} title={"Có thể bạn đã biết?"} shape={"square"} onClick={() => { window.open('https://github.com/nokiddig/social-network-fb') }} />
                    <SideBarItem />
                    <SideBarItem avatar={images.icon.group_avatar_demo} title={"Màn Hình Máy Tính  Thanh Lý Cũ Mới Giá Rẻ"} shape={"square"} />
                </div>
            </ul>
        </SideBar>

        <div className={cx("body")}>
            <div className={cx("body__page")}>
                <ListPostContext.Provider value={refListNewFeed}>
                    <CreatePost handlePost={handlePost} />
                </ListPostContext.Provider>
                <ListNewFeed handlePost={handlePost} ref={refListNewFeed} userData={userData} fetchApiPost={fetchApiPost} />
            </div>
        </div>


        <SideBar className={cx("right__sidebar")}>
            <h3 className={"pt-4 pb-2 fs-3"} style={{ paddingLeft: "16px", color: "#6f7175" }}>Người liên hệ</h3>
            <ul className={cx("left__sidebar-list")}>
                {listFriend.map((friend) => (
                    <SideBarItem onClick={() => navigate('/profile/' + friend.username)} key={friend.username} active={true} avatar={BASE_URL_MEDIA + friend.avatar} title={friend.fullname} />
                ))}

                {/* <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"} /> */}
            </ul>
        </SideBar>
    </div>);
}

export default Home;