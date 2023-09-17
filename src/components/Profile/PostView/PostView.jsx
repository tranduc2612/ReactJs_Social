import styles from "./PostView.module.scss"
import classNames from "classnames/bind";
import Box from "~/components/Box/Box";
import images from "~/assets/images/index";

const cx = classNames.bind(styles);

function PostView({user}) {
    
    return (
        <div className={cx("container")}>
            <div className={cx("right_content")}>
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
                <Box 
                    
                />  
            </div>
            <div className={cx("main_content")}>
                <Box 
                    
                />  
            </div>
            
        </div>
    );
}

export default PostView;