import styles from "./PostView.module.scss"
import classNames from "classnames/bind";
import Box from "~/components/Box/Box";
import images from "~/assets/images/index";
import CreatePost from "~/components/CreatePost/CreatePost";
import ListNewFeed from "~/components/ListNewFeed/ListNewFeed";
import { useEffect, useRef, useState } from "react";
import { Get, Post, BASE_URL_MEDIA } from "~/services/base";
import getParamUrl from "~/utils/getParamUrl";
import checkResponse from "~/utils/checkResponse";
import { useCallback } from "react";
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function PostView({ userData, userProfileData, handleUpdateInfo = null }) {
    const styled = {
        position: "sticky",
    }
    const [indexPage, setIndexPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const refListProfileFeed = useRef(null)
    const [lstPostProfile, setLstPostProfile] = useState([]);

    // const [userProfile, setUserProfile] = useState(userData?.data_user || {});

    const refSidebar = useRef(null);
    const navigate = useNavigate();

    const handleMouseMove = (event) => {
        console.log(event)
        if (event.clientY > -388) {
            refSidebar.current.style.top = "-188px"
            refSidebar.current.style.bottom = null
        } else if (event.clientY < -504) {
            refSidebar.current.style.bottom = "-504px"
            refSidebar.current.style.top = null
        }

    };

    useEffect(() => {
        window.addEventListener('wheel', handleMouseMove);

        return () => {
            window.removeEventListener('wheel', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        if (lstPostProfile.length > 0 && lstPostProfile) {
            setTotalPage(lstPostProfile[0]?.total_page)
        }
    }, [lstPostProfile]);

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
        const res = await Get(`/post/get-list-profile?page_index=${dataFetch.page_index}&page_count=${dataFetch.page_count}&profile_username=${userProfileData?.username}`, dataFetch, userData?.access_token);

        return res
    }

    return (
        <div className={cx("container")} style={{ height: "100%" }}>
            <div className={cx("right_content")}>
                <div style={styled} ref={refSidebar}>
                    <Box className={cx("box_container")}>
                        <div className={cx("title")}>
                            <h2>Giới thiệu</h2>
                        </div>
                        {/* about me */}
                        {!userProfileData.about_me ? null :
                            <div className={cx("aboutme")}>
                                {userProfileData?.about_me}
                            </div>
                        }

                        {/* info ... */}
                        <div className={cx("info_container")}>
                            {/* <div className={cx("info_item")}>
                                <div className={cx("icon")}>
                                    <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/H804hWf2rBh.png" alt="" />
                                </div>
                                <div className={cx("content")}>
                                    Học tại <span className={cx("content_bold")}>THPT Hưng yên </span>
                                </div>
                            </div> */}
                            <div className={cx("info_item")}>
                                <div className={cx("icon")}>
                                    <img src={images.icon.address_icon} alt="" />
                                </div>
                                <div className={cx("content")}>
                                    Đến từ <span className={cx("content_bold")}>{userProfileData?.location}</span>
                                </div>
                            </div>

                            <div className={cx("info_item")}>
                                <div className={cx("icon")}>
                                    {userProfileData?.gender == "1" ? <img src={images.icon.gender_male_icon} alt="" /> : <img src={images.icon.gender_female_icon} alt="" />}
                                </div>
                                <div className={cx("content")}>
                                    {userProfileData?.gender == "1" ? "Nam" : "Nữ"}
                                </div>
                            </div>
                            {/* Ngày sinh */}
                            <div className={cx("info_item")}>
                                <div className={cx("icon")}>
                                    <img src={images.icon.cake_icon} alt="" />
                                </div>
                                <div className={cx("content")}>
                                    Sinh ngày {(new Date(userProfileData?.day_of_birth)).getDate() + '/' + ((new Date(userProfileData?.day_of_birth)).getMonth() + 1) + '/' + (new Date(userProfileData?.day_of_birth)).getFullYear()}
                                </div>
                            </div>
                            <div className={cx("info_item")}>
                                <div className={cx("icon")}>
                                    <img src={images.icon.mail_icon} alt="" />
                                </div>
                                <div className={cx("content")}>
                                    {userProfileData?.email}
                                </div>
                            </div>
                        </div>
                    </Box>

                    <Box className={cx("box_container")}>
                        <div className={cx("title")}>
                            <div>
                                <h2>Bạn bè</h2>
                                <div className={cx("info")}>{userProfileData.number_friend} bạn bè</div>
                            </div>
                            <a className={cx("link")}>Xem tất cả bạn bè</a>
                        </div>

                        {/* info ... */}
                        <div className={cx("friend_container", "row")}>
                            {userProfileData?.listFriend && userProfileData?.listFriend.map((friend) => {
                                return (
                                    <div key={friend.username} className={cx("friend_item", "col-4")}>
                                        {/* <a onClick={() => navigate(`/message`)}> */}
                                        <a href={`/profile/${friend.username}`}>
                                            <img className={cx("avatar")} src={BASE_URL_MEDIA + friend.avatar} alt="" />
                                            <div className={cx("name")}>{friend.fullname}</div>
                                        </a>
                                    </div>
                                )
                            })}
                        </div>
                    </Box>

                </div>

            </div>
            <div className={cx("main_content")}>
                {
                    userProfileData?.username &&
                    <>
                        <CreatePost />
                        <ListNewFeed key={userProfileData?.username} userData={userData} fetchApiPost={fetchApiPost} ref={refListProfileFeed} handlePost={handlePost} username={userProfileData?.username} />
                    </>
                }
            </div>

        </div>
    );
}

export default PostView;