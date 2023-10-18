import styles from "./PostView.module.scss"
import classNames from "classnames/bind";
import Box from "~/components/Box/Box";
import images from "~/assets/images/index";
import CreatePost from "~/components/CreatePost/CreatePost";
import ListNewFeed from "~/components/ListNewFeed/ListNewFeed";
import { useEffect, useRef, useState } from "react";
import { Get } from "~/services/base";
import getParamUrl from "~/utils/getParamUrl";
import checkResponse from "~/utils/checkResponse";

const cx = classNames.bind(styles);

function PostView({ userData }) {
    const styled = {
        position: "sticky",
    }
    const [indexPage, setIndexPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [lstPostProfile, setLstPostProfile] = useState([]);

    const [userProfile, setUserProfile] = useState(userData?.data_user || {});

    const refSidebar = useRef(null)

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

    const fetchApiPost = async () => {
        try {
            const username = getParamUrl();
            if (indexPage == totalPage) {
                return
            }
            const getListResult = await Get(`/post/get-list-profile?page_index=${indexPage}&page_count=10&profile_username=${username}`, {}, userData?.access_token);
            if (checkResponse(getListResult)) {
                setLstPostProfile(getListResult.returnObj)
            }
        } catch (error) {

        }
        setIndexPage(indexPage + 1);
        return fetchApiPost
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
                        {!userProfile.aboutMe ? null :
                            <div className={cx("aboutme")}>
                                {userProfile?.aboutMe}
                            </div>
                        }

                        {/* info ... */}
                        <div className={cx("info_container")}>
                            <div className={cx("info_item")}>
                                <div className={cx("icon")}>
                                    <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/H804hWf2rBh.png" alt="" />
                                </div>
                                <div className={cx("content")}>
                                    Học tại <span className={cx("content_bold")}>THPT Hưng yên </span>
                                </div>
                            </div>
                            <div className={cx("info_item")}>
                                <div className={cx("icon")}>
                                    <img src={images.icon.address_icon} alt="" />
                                </div>
                                <div className={cx("content")}>
                                    Đến từ <span className={cx("content_bold")}>{userProfile?.address}</span>
                                </div>
                            </div>

                            <div className={cx("info_item")}>
                                <div className={cx("icon")}>
                                    {userProfile?.gender == "MALE" ? <img src={images.icon.gender_male_icon} alt="" /> : <img src={images.icon.gender_female_icon} alt="" />}
                                </div>
                                <div className={cx("content")}>
                                    {userData?.gender == "MALE" ? "Nam" : "Nữ"}
                                </div>
                            </div>
                            <div className={cx("info_item")}>
                                <div className={cx("icon")}>
                                    <img src={images.icon.mail_icon} alt="" />
                                </div>
                                <div className={cx("content")}>
                                    {userProfile?.email}
                                </div>
                            </div>
                        </div>
                    </Box>

                    <Box className={cx("box_container")}>
                        <div className={cx("title")}>
                            <div>
                                <h2>Bạn bè</h2>
                                <div className={cx("info")}>50 bạn bè</div>
                            </div>
                            <a className={cx("link")}>Xem tất cả bạn bè</a>
                        </div>

                        {/* info ... */}
                        <div className={cx("friend_container", "row")}>
                            {userProfile?.listFriends && userProfile?.listFriends.map((friend) => {
                                return (
                                    <div key={friend.name} className={cx("friend_item", "col-4")}>
                                        <a href={friend.link}>
                                            <img className={cx("avatar")} src={friend.avatar} alt="" />
                                            <div className={cx("name")}>{friend.name}</div>
                                        </a>
                                    </div>
                                )
                            })}
                        </div>
                    </Box>

                </div>

            </div>
            <div className={cx("main_content")}>
                <CreatePost />

                <ListNewFeed userData={userData} lstPost={lstPostProfile} fetchApiPost={fetchApiPost} />
            </div>

        </div>
    );
}

export default PostView;