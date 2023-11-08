import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import Modal from 'react-bootstrap/Modal';

import styles from "./Search.module.scss"
import images from "~/assets/images/index";
import SideBar from "~/components/Sidebar/Sidebar";
import SideBarItem from "~/components/SidebarItem/SidebarItem";
import Box from "~/components/Box/Box";
import Button from "~/components/Button/Button";
import ListNewFeed from "~/components/ListNewFeed/ListNewFeed";
import getParamUrl from "~/utils/getParamUrl";
import checkResponse from "~/utils/checkResponse";
import { BASE_URL_MEDIA, Post, Get } from "~/services/base";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import BoxNewFeed from "~/components/BoxNewFeed/BoxNewFeed";


const cx = classNames.bind(styles);

const SideBarLeft = [{
    id: 1,
    title: "Mọi người",
    img_url: images.icon.add_camera_post
}, {
    id: 2,
    title: "Bài viết",
    img_url: images.icon.group_icon
}]

// const user = {
//     aboutMe: "What does the matter with you?",
//     address: "Hà Nội, Việt Nam",
//     dayOfBirth: '05/10/2002',
//     gender: "MALE",
//     email: "ngoc43552@gmail.com",
//     phone: "0399620226",
//     listFriends: [
//         {
//             name: "Sỹ",
//             avatar: "https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/320714942_3100507576913304_599481984247371992_n.jpg?stp=dst-jpg_p148x148&_nc_cat=111&ccb=1-7&_nc_sid=471e40&_nc_ohc=pCwgGMHMB_wAX9R0NyJ&_nc_ht=scontent.fhan2-3.fna&oh=00_AfDYXSJZ2rv4S0wpDXOsndHUfuXe4MWqVhjBOqqYKdHxTQ&oe=650F641A",
//             link: "https://www.facebook.com/lxq.2002",
//             numFriend: 30
//         },
//         {
//             name: "Phạm Trung Hiếu",
//             avatar: "https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/354235367_3556111618005013_5886006779707150620_n.jpg?stp=c0.49.148.148a_dst-jpg_p148x148&_nc_cat=102&ccb=1-7&_nc_sid=471e40&_nc_ohc=yWghVyy1GogAX93s4TG&_nc_ht=scontent.fhan2-3.fna&oh=00_AfCaDxsmDSxOkrpKL8faalzfuMkTffmR3_qLY1kkZkmthg&oe=650FA902",
//             link: "https://www.facebook.com/lxq.2002",
//             numFriend: 30
//         },
//         {
//             name: "Phạm Hưng Thịnh",
//             avatar: "https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/349064724_3074187822876031_8221662170781482853_n.jpg?stp=dst-jpg_p148x148&_nc_cat=104&ccb=1-7&_nc_sid=471e40&_nc_ohc=GC0MzK85DWsAX-5z4ew&_nc_ht=scontent.fhan2-3.fna&oh=00_AfA76WcMNzES-aGztekgkmcFLiepE4sHOtjkkNU2o7_ROQ&oe=6510C86B",
//             link: "https://www.facebook.com/lxq.2002",
//             numFriend: 30
//         },
//         {
//             name: "Lộc Nguyễn",
//             avatar: "https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/278662494_1642511472763191_6945221345735626720_n.jpg?stp=dst-jpg_p148x148&_nc_cat=102&ccb=1-7&_nc_sid=471e40&_nc_ohc=tRg59ds1450AX-6mUO7&_nc_ht=scontent.fhan2-3.fna&oh=00_AfAbvU0O5k1f4oWZOIBxiDyjnhlt3mTk-Ha-HDIVFgUY0g&oe=650F0DCD",
//             link: "https://www.facebook.com/lxq.2002",
//             numFriend: 30
//         },
//         {
//             name: "Liêm Đức Đỗ",
//             avatar: "https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/272155317_1682064768794927_7216782382904572955_n.jpg?stp=c2.0.148.148a_dst-jpg_p148x148&_nc_cat=106&ccb=1-7&_nc_sid=471e40&_nc_ohc=Z8YSAGoeYLIAX__k5ZO&_nc_ht=scontent.fhan2-3.fna&oh=00_AfDFO7TqGj6UoR7UUZeD6-UZOxNe0T0sVxR4ZuSCvo1BGg&oe=651038D3",
//             link: "https://www.facebook.com/lxq.2002",
//             numFriend: 30
//         },
//         {
//             name: "Vinh Thành",
//             avatar: "https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/353785177_1804781826583275_2742571180989001880_n.jpg?stp=dst-jpg_p148x148&_nc_cat=108&ccb=1-7&_nc_sid=471e40&_nc_ohc=KZnvFHH2H3kAX_XoF8P&_nc_ht=scontent.fhan2-3.fna&oh=00_AfCBvKvDuSk-I_WPQMnAbAzn4OpWCtY5na4wGp0uOZubbg&oe=650F2BD0",
//             link: "https://www.facebook.com/lxq.2002",
//             numFriend: 30
//         },
//         {
//             name: "Nam Gino",
//             avatar: "https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/326199239_544861714341954_7162155349869791935_n.jpg?stp=dst-jpg_p148x148&_nc_cat=108&ccb=1-7&_nc_sid=471e40&_nc_ohc=koCxv-po3tUAX958Ofg&_nc_ht=scontent.fhan2-3.fna&oh=00_AfC-bPvs-82eQRD8eQcilwJRQfUnbTYZEiSrHd0qPFivhQ&oe=650F727E",
//             link: "https://www.facebook.com/lxq.2002",
//             numFriend: 30
//         },
//         {
//             name: "Hào Vũ",
//             avatar: "https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/345891680_202868235431529_4095745457861929540_n.jpg?stp=dst-jpg_p148x148&_nc_cat=101&ccb=1-7&_nc_sid=471e40&_nc_ohc=mnk-GSmSAVgAX85h5gE&_nc_ht=scontent.fhan2-3.fna&oh=00_AfBsjfgxFybWVEx5EqKK1uasv1aQyEF_53jGEBe0aR2XbQ&oe=650FEF7A",
//             link: "https://www.facebook.com/lxq.2002"
//         },
//         {
//             name: "Liêm Đức Đỗ",
//             avatar: "https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/272155317_1682064768794927_7216782382904572955_n.jpg?stp=c2.0.148.148a_dst-jpg_p148x148&_nc_cat=106&ccb=1-7&_nc_sid=471e40&_nc_ohc=Z8YSAGoeYLIAX__k5ZO&_nc_ht=scontent.fhan2-3.fna&oh=00_AfDFO7TqGj6UoR7UUZeD6-UZOxNe0T0sVxR4ZuSCvo1BGg&oe=651038D3",
//             link: "https://www.facebook.com/lxq.2002"
//         },
//     ]
// }


function Search() {
    const userData = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const currentParram = getParamUrl();
    const [listSideBar, setListSidebar] = useState(SideBarLeft);
    const [listAccount, setListAccount] = useState([]);
    const [listPost, setListPost] = useState([]);
    const [showAccount, setShowAccount] = useState(true);

    useEffect(() => {
        Post("/action/search-accounts-posts", {
            search_term: currentParram,
            page_count: 99,
            page_index: 1
        }, userData.access_token)
            .then((res) => {
                if (checkResponse(res)) {
                    const lstUser = res.returnObj?.matched_accounts;
                    const lstPost = res.returnObj?.matched_posts;
                    setListAccount([
                        ...lstUser
                    ])
                    setListPost(
                        [...lstPost]
                    )
                }
            })
    }, [currentParram])
console.log('cur',currentParram);
    const FriendView = ({ listAccount }) => {
        return (
            <div className={cx("friendview", "row")}>
         
                {listAccount.map((friend) => {
                    return (
                        <Box className={cx("box_container")} key={friend?.username}>
                            <div className={cx("info_container")}>
                                <img className={cx("avatar")} src={BASE_URL_MEDIA + friend?.avatar} alt="" />
                                <div className={cx("info")}>
                                    <div className={cx("name")}>{friend?.fullname}</div>
                                    <div className={cx("numFriend")}>{friend?.number_friend} bạn bè</div>
                                </div>
                            </div>
                            <div className={cx("button_container")} onClick={() => {
                                navigate("/profile/" + friend?.username)
                            }}>
                                <Button className={cx("button", "view")}>Xem chi tiết</Button>
                            </div>
                        </Box>
                    )
                })}
            </div>
        );
    }

    const handlePost = async (dataSend) => {
        const res = await Post(
            "/post/handle-post", dataSend, userData?.access_token
        )

        if (checkResponse(res)) {
            // Thêm bài viết
            const currentListPost = refListProfileFeed.current.getListPost();
            const functionName = dataSend?.function;
            if (functionName === "C") {
                const newList = [
                    res.returnObj,
                    ...currentListPost
                ];

                refListProfileFeed.current.setListPost(newList);
            } else if (functionName === "U") {
                // Sửa bài viết
                const updatedPost = res.returnObj[0];
                const updatedState = currentListPost.map((post) => {
                    if (post.post_id === updatedPost.post_id) {
                        return updatedPost;
                    }
                    return post;
                });
                refListProfileFeed.current.setListPost(updatedState);
            } else if (functionName === "D") {
                // Xóa bài viết
                const deletedList = currentListPost.filter((post) => post.post_id != res.returnObj);
                refListProfileFeed.current.setListPost(deletedList);
            } else {
                return null;
            }
            return res;
        }
        return null;
    }

    const fetchApiPost = async (dataFetch) => {
        const res = await Get(`/post/get-list-profile?page_index=${dataFetch.page_index}&page_count=${dataFetch.page_count}&profile_username=${userData.data_user?.username}`, dataFetch, userData?.access_token);

        return res
    }

    return (
        <div className={cx("container")}>
            <SideBar className={cx("left__sidebar")}>
                <h1 className={cx("left__sidebar-title")}>Kết quả tìm kiếm</h1>
                <div className={cx("devider")}></div>
                <ul className={cx("left__sidebar-list")}>
                    {/* {listSideBar.map(item =>{
                    return(
                        <SideBarItem key={item.id} title={item.title} data={item} />
                    )
                })} */}
                    {/* {listSideBar.map((item) => {
                        return (
                            )
                        })} */}
                    <SideBarItem className={cx("", {
                        active: showAccount
                    })} title="Mọi người" avatar={images.icon.group_icon} onClick={() => setShowAccount(true)} />
                    <SideBarItem className={cx("", {
                        active: !showAccount
                    })} title="Bài viết" avatar={images.icon.clock_icon} onClick={() => setShowAccount(false)} />
                </ul>
            </SideBar>

            <div className={cx("body")}>
                <div className={cx("body__page")}>
                    {showAccount ? <FriendView listAccount={listAccount} /> : <>
                        {listPost.map((post) => {
                            return (
                                <BoxNewFeed handlePost={handlePost} key={post.post_id} data={post} shared={false} userData={userData} readOnly={true} />
                            )
                        })}
                    </>}
                </div>
            </div>
        </div>
    );
}

{/* <ListNewFeed handlePost={handlePost} fetchApiPost={fetchApiPost} userData={userData} /> */ }
export default Search;