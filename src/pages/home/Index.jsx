import { useEffect, useState } from "react";
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



const cx = classNames.bind(styles);

const SideBarLeft = [{
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

function Home({ userData }) {
    const lstPost = useSelector((state) => state.post);
    const dispatch = useDispatch();
    const [listSideBar, setListSidebar] = useState(SideBarLeft);
    const [moreSidebar, setMoreSidebar] = useState(false);
    const [indexPage, setIndexPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const dataFetch = {
        pageIndex: indexPage,
        pageCount: 10,
        token: userData?.access_token,
    }
    useEffect(() => {
        if (lstPost.length > 0 && lstPost) {
            setTotalPage(lstPost[0]?.total_page)
        }
    }, [lstPost]);

    useEffect(() => {
        if (moreSidebar) {
            setListSidebar(SideBarLeftAll)
        } else {
            setListSidebar(SideBarLeft)
        }
    }, [moreSidebar])

    const handleMoreSidebar = () => {
        // đoạn này xử lí thêm bớt thanh sidebar sau xử lí logic sau // fix tạm
        setMoreSidebar(!moreSidebar);
    }

    const fetchApiPost = async () => {
        if (indexPage == totalPage) {
            return
        }
        const res = await dispatch(getListPost(dataFetch));
        setIndexPage(indexPage + 1);
        return res
    }



    return (<div className={cx("home")}>
        <SideBar className={cx("left__sidebar")}>
            <ul className={cx("left__sidebar-list")}>
                <SideBarItem avatar={images.icon.avatar_demo} title={"Trần Minh Đức"} />
                {listSideBar.map(item => {
                    return (
                        <SideBarItem key={item.id} title={item.title} data={item} />
                    )
                })}
                {
                    moreSidebar ?
                        <SideBarItem onClick={handleMoreSidebar} avatar={images.icon.arrow_up} title={"Thu gọn"} />
                        : <SideBarItem onClick={handleMoreSidebar} avatar={images.icon.arrow_down} title={"Xem thêm"} />
                }
                <div className={cx("your__shortcut")}>
                    <h3 className={"pt-4 pb-2 fs-3"} style={{ paddingLeft: "16px", color: "#6f7175" }}>Lối tắt của bạn</h3>
                    <SideBarItem avatar={images.icon.group_avatar_demo} title={"MUA MÁY TÍNH CŨ"} shape={"square"} />
                    <SideBarItem avatar={images.icon.group_avatar_demo} title={"Màn Hình Máy Tính  Thanh Lý Cũ Mới Giá Rẻ"} shape={"square"} />
                    <SideBarItem avatar={images.icon.group_avatar_demo} title={"Màn Hình Máy Tính  Thanh Lý Cũ Mới Giá Rẻ"} shape={"square"} />
                    <SideBarItem avatar={images.icon.group_avatar_demo} title={"Màn Hình Máy Tính  Thanh Lý Cũ Mới Giá Rẻ"} shape={"square"} />
                    <SideBarItem avatar={images.icon.group_avatar_demo} title={"Màn Hình Máy Tính  Thanh Lý Cũ Mới Giá Rẻ"} shape={"square"} />
                    <SideBarItem avatar={images.icon.group_avatar_demo} title={"Màn Hình Máy Tính  Thanh Lý Cũ Mới Giá Rẻ"} shape={"square"} />
                    <SideBarItem avatar={images.icon.group_avatar_demo} title={"Màn Hình Máy Tính  Thanh Lý Cũ Mới Giá Rẻ"} shape={"square"} />
                    <SideBarItem avatar={images.icon.group_avatar_demo} title={"Màn Hình Máy Tính  Thanh Lý Cũ Mới Giá Rẻ"} shape={"square"} />

                </div>
            </ul>
        </SideBar>

        <div className={cx("body")}>
            <div className={cx("body__page")}>

                <CreatePost />

                <ListNewFeed userData={userData} lstPost={lstPost} fetchApiPost={fetchApiPost} />
            </div>
        </div>


        <SideBar className={cx("right__sidebar")}>
            <h3 className={"pt-4 pb-2 fs-3"} style={{ paddingLeft: "16px", color: "#6f7175" }}>Người liên hệ</h3>
            <ul className={cx("left__sidebar-list")}>
                <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"} />
                <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"} />
                <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"} />
                <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"} />
                <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"} />
                <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"} />
                <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"} />
                <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"} />
                <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"} />
                <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"} />
                <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"} />
                <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"} />
                <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"} />
                <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"} />
                <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"} />
                <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"} />
                <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"} />
                <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"} />
                <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"} />
                <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"} />
                <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"} />
                <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"} />
                <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"} />
                <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"} />
                <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"} />
                <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"} />
                <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"} />
                <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"} />
                <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"} />
                <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"} />
                <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"} />
                <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"} />
                <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"} />
                <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"} />
                <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"} />
                <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"} />

            </ul>
        </SideBar>
    </div>);
}

export default Home;