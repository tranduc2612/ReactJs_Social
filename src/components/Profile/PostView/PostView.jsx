import styles from "./PostView.module.scss"
import classNames from "classnames/bind";
import Box from "~/components/Box/Box";
import images from "~/assets/images/index";
import CreatePost from "~/components/CreatePost/CreatePost";
import ListNewFeed from "~/components/ListNewFeed/ListNewFeed";
import { useEffect, useRef, useState } from "react";

const cx = classNames.bind(styles);

function PostView({user}) {
    const styled = {
        position: "sticky",
    }

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
    
    return (
        <div className={cx("container")} style={{height: "100%"}}>
            <div className={cx("right_content")}>
                <div style={styled} ref={refSidebar}>
                <Box className={cx("box_container")}> 
                    <div className={cx("title")}>
                        <h2>Giới thiệu</h2>
                    </div>
                    {/* about me */}
                    {!user.aboutMe ? null : 
                        <div className={cx("aboutme")}>
                            {user.aboutMe}
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
                                Đến từ <span className={cx("content_bold")}>{user.address}</span>
                            </div>
                        </div>

                        <div className={cx("info_item")}>
                            <div className={cx("icon")}>
                                {user.gender == "MALE" ? <img src={images.icon.gender_male_icon} alt="" /> : <img src={images.icon.gender_female_icon} alt="" />}
                            </div>
                            <div className={cx("content")}>
                                {user.gender == "MALE" ? "Nam" : "Nữ"}
                            </div>
                        </div>
                        <div className={cx("info_item")}>
                            <div className={cx("icon")}>
                                <img src={images.icon.mail_icon} alt="" />
                            </div>
                            <div className={cx("content")}>
                                {user.email}
                            </div>
                        </div>
                    </div>
                </Box>

                <Box className={cx("box_container")}> 
                    <div className={cx("title")}>
                        <h2>Giới thiệu</h2>
                    </div>
                    {/* about me */}
                    {!user.aboutMe ? null : 
                        <div className={cx("aboutme")}>
                            {user.aboutMe}
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
                                Đến từ <span className={cx("content_bold")}>{user.address}</span>
                            </div>
                        </div>

                        <div className={cx("info_item")}>
                            <div className={cx("icon")}>
                                {user.gender == "MALE" ? <img src={images.icon.gender_male_icon} alt="" /> : <img src={images.icon.gender_female_icon} alt="" />}
                            </div>
                            <div className={cx("content")}>
                                {user.gender == "MALE" ? "Nam" : "Nữ"}
                            </div>
                        </div>
                        <div className={cx("info_item")}>
                            <div className={cx("icon")}>
                                <img src={images.icon.mail_icon} alt="" />
                            </div>
                            <div className={cx("content")}>
                                {user.email}
                            </div>
                        </div>
                    </div>
                </Box>

                <Box className={cx("box_container")}> 
                    <div className={cx("title")}>
                        <h2>Giới thiệu</h2>
                    </div>
                    {/* about me */}
                    {!user.aboutMe ? null : 
                        <div className={cx("aboutme")}>
                            {user.aboutMe}
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
                                Đến từ <span className={cx("content_bold")}>{user.address}</span>
                            </div>
                        </div>

                        <div className={cx("info_item")}>
                            <div className={cx("icon")}>
                                {user.gender == "MALE" ? <img src={images.icon.gender_male_icon} alt="" /> : <img src={images.icon.gender_female_icon} alt="" />}
                            </div>
                            <div className={cx("content")}>
                                {user.gender == "MALE" ? "Nam" : "Nữ"}
                            </div>
                        </div>
                        <div className={cx("info_item")}>
                            <div className={cx("icon")}>
                                <img src={images.icon.mail_icon} alt="" />
                            </div>
                            <div className={cx("content")}>
                                {user.email}
                            </div>
                        </div>
                    </div>
                </Box>
                </div>
                
            </div>
            <div className={cx("main_content")}>
                <CreatePost />

                <ListNewFeed />
            </div>
            
        </div>
    );
}

export default PostView;