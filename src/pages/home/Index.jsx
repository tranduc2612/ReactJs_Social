import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import Modal from 'react-bootstrap/Modal';

import styles from "./Home.module.scss"
import images from "~/assets/images/index";
import SideBar from "~/components/Sidebar/Sidebar";
import SideBarItem from "~/components/SidebarItem/SidebarItem";
import Box from "~/components/Box/Box";
import Input from "~/components/Input/Input";
import Button from "~/components/Button/Button";
import ModalPost from "~/components/ModalPost/ModalPost";
import BoxNewFeed from "~/components/BoxNewFeed/BoxNewFeed";



const cx = classNames.bind(styles);

const SideBarLeft = [{
    id: 1,
    title: "Bạn bè",
    position: "0px -304px",
    img_url: images.icon.list_icon_sidebar
},{
    id: 2,
    title: "Messenger",
    position: "0px 0px",
    img_url: images.icon.list_icon_sidebar_2
},{
    id: 3,
    title: "Kỷ niệm",
    position: "0 -456px",
    img_url: images.icon.list_icon_sidebar
},{
    id: 4,
    title: "Đã lưu",
    position: "0 -190px",
    img_url: images.icon.list_icon_sidebar
},{
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
},{
    id: 2,
    title: "Messenger",
    position: "0px 0px",
    img_url: images.icon.list_icon_sidebar_2
},{
    id: 3,
    title: "Kỷ niệm",
    position: "0 -456px",
    img_url: images.icon.list_icon_sidebar
},{
    id: 4,
    title: "Đã lưu",
    position: "0 -190px",
    img_url: images.icon.list_icon_sidebar
},{
    id: 5,
    title: "Chơi game",
    position: "0px -76px",
    img_url: images.icon.list_icon_sidebar
},{
    id: 6,
    title: "Chiến dịch dây quỹ",
    position: "0px -342px",
    img_url: images.icon.list_icon_sidebar
}]

function Home() {
    const [listSideBar,setListSidebar] = useState(SideBarLeft);
    const [moreSidebar,setMoreSidebar] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    useEffect(()=>{
        if(moreSidebar){
            setListSidebar(SideBarLeftAll)
        }else{
            setListSidebar(SideBarLeft)
        }
    },[moreSidebar])

    const handleMoreSidebar = ()=>{
        // đoạn này xử lí thêm bớt thanh sidebar sau xử lí logic sau // fix tạm
        setMoreSidebar(!moreSidebar);
    }

    const handlePopupPost = ()=>{
        setModalShow(true)
    }

    

    return ( <div className={cx("home")}>
                <SideBar className={cx("left__sidebar")}>
                    <ul className={cx("left__sidebar-list")}>
                        <SideBarItem avatar={images.icon.avatar_demo} title={"Trần Minh Đức"}/>
                        {listSideBar.map(item =>{
                            return(
                                <SideBarItem key={item.id} title={item.title} data={item} />
                            )
                        })}
                        {
                            moreSidebar ? 
                            <SideBarItem onClick={handleMoreSidebar} avatar={images.icon.arrow_up} title={"Thu gọn"} /> 
                            :<SideBarItem onClick={handleMoreSidebar} avatar={images.icon.arrow_down} title={"Xem thêm"} />
                        }
                        <div className={cx("your__shortcut")}>
                            <h3 className={"pt-4 pb-2 fs-3"} style={{paddingLeft: "16px", color: "#6f7175"}}>Lối tắt của bạn</h3>
                            <SideBarItem avatar={images.icon.group_avatar_demo} title={"MUA MÁY TÍNH CŨ"} shape={"square"}/>
                            <SideBarItem avatar={images.icon.group_avatar_demo} title={"Màn Hình Máy Tính  Thanh Lý Cũ Mới Giá Rẻ"} shape={"square"}/>
                            <SideBarItem avatar={images.icon.group_avatar_demo} title={"Màn Hình Máy Tính  Thanh Lý Cũ Mới Giá Rẻ"} shape={"square"}/>
                            <SideBarItem avatar={images.icon.group_avatar_demo} title={"Màn Hình Máy Tính  Thanh Lý Cũ Mới Giá Rẻ"} shape={"square"}/>
                            <SideBarItem avatar={images.icon.group_avatar_demo} title={"Màn Hình Máy Tính  Thanh Lý Cũ Mới Giá Rẻ"} shape={"square"}/>
                            <SideBarItem avatar={images.icon.group_avatar_demo} title={"Màn Hình Máy Tính  Thanh Lý Cũ Mới Giá Rẻ"} shape={"square"}/>
                            <SideBarItem avatar={images.icon.group_avatar_demo} title={"Màn Hình Máy Tính  Thanh Lý Cũ Mới Giá Rẻ"} shape={"square"}/>
                            <SideBarItem avatar={images.icon.group_avatar_demo} title={"Màn Hình Máy Tính  Thanh Lý Cũ Mới Giá Rẻ"} shape={"square"}/>

                        </div>
                    </ul>
                </SideBar>
                <div className={cx("body")}>
                    <div className={cx("body__page")}>
                        <Box className={cx("box__post")}>
                            <div className={cx("box__post-header")} onClick={handlePopupPost}>
                                <div className={cx("box__post-avatar")}>
                                    <Button icon={images.icon.avatar_demo} full_icon={true} shape={"circle"} />
                                </div>
                                <div className={cx("box__post-input")}>
                                    <span>Đức ơi, bạn đang nghĩ gì thế?</span>
                                </div>
                            </div>


                            <div className={cx("box__post-body")}>
                                <div className={cx("box__post-item")}>
                                    <div className={cx("box__post-img")}>
                                        <img src={images.icon.add_camera_post} />
                                    </div>
                                    <div className={cx("box__post-function")}>
                                        <span>Video trực tuyến</span>
                                    </div>
                                </div>

                                <div className={cx("box__post-item")}>
                                    <div className={cx("box__post-img")}>
                                        <img src={images.icon.add_image_post} />
                                    </div>
                                    <div className={cx("box__post-function")}>
                                        <span>Ảnh/Video</span>
                                    </div>
                                </div>

                                <div className={cx("box__post-item")}>
                                    <div className={cx("box__post-img")}>
                                        <img src={images.icon.add_icon_post} />
                                    </div>
                                    <div className={cx("box__post-function")}>
                                        <span>Cảm xúc/hoạt động</span>
                                    </div>
                                </div>
                            </div>
                        </Box>

                        <div className={cx("list__newfeed")}>
                            <BoxNewFeed />
                            <BoxNewFeed />
                            <BoxNewFeed />
                            <BoxNewFeed />

                        </div>
                    </div>
                </div>


                <SideBar className={cx("right__sidebar")}>
                    <h3 className={"pt-4 pb-2 fs-3"} style={{paddingLeft: "16px", color: "#6f7175"}}>Người liên hệ</h3>
                    <ul className={cx("left__sidebar-list")}>
                        <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"}/>
                        <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"}/>
                        <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"}/>
                        <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"}/>
                        <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"}/>
                        <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"}/>
                        <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"}/>
                        <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"}/>
                        <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"}/>
                        <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"}/>
                        <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"}/>
                        <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"}/>
                        <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"}/>
                        <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"}/>
                        <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"}/>
                        <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"}/>
                        <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"}/>
                        <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"}/>
                        <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"}/>
                        <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"}/>
                        <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"}/>
                        <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"}/>
                        <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"}/>
                        <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"}/>
                        <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"}/>
                        <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"}/>
                        <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"}/>
                        <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"}/>
                        <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"}/>
                        <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"}/>
                        <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"}/>
                        <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"}/>
                        <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"}/>
                        <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"}/>
                        <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"}/>
                        <SideBarItem active={true} avatar={images.icon.avatar_demo} title={"Trần Minh Đức"}/>

                    </ul>
                </SideBar>
    
                <Modal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    size="md"
                >
                        <ModalPost setModalShow={setModalShow} />
                </Modal>
    </div> );
}

export default Home;