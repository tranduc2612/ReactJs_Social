import { forwardRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./BoxAvatar.module.scss";
import Box from "~/components/Box/Box";
import images from "~/assets/images/index";
import Button from "../Button/Button";
import { logOut } from "~/redux/actions/authActions";
import { useDispatch, useSelector } from 'react-redux'
import { Post } from "~/services/base";
import checkResponse from "~/utils/checkResponse";
import { removeAllKeyAuthentication } from "~/utils/contactWithLocalStorage";
import { clearPost } from "~/redux/store/postSlide";

const cx = classNames.bind(styles)


function BoxAvatar(props, ref) {
    const userData = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogOut = async () => {
        removeAllKeyAuthentication()
        try {
            const data = await Post("/logout", {}, userData?.access_token);
            if (checkResponse(data)) {
                dispatch(logOut())
                dispatch(clearPost())
                navigate("/login")
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (<div className={cx("wrapper")} ref={ref}>
        <Box className={cx("box")}>
            <div className={cx("header")}>
                <Box className={cx("box__header")}>
                    <div className={cx("header__top")}>
                        <Button icon={images.icon.avatar_demo} full_icon={true} shape={"circle"} />
                        <div className={cx("name")}>
                            Trần Minh Đức
                        </div>
                    </div>

                    <div className={cx("separate__line")}>

                    </div>

                    <div className={cx("header__bottom")}>
                        <Link className={cx("redirect")}>
                            Đi đến trang cá nhân
                        </Link>
                    </div>
                </Box>
            </div>

            <div className={cx("body")}>
                <div className={cx("list")}>

                    <div className={cx("item")}>
                        <div className={cx("icon")}>
                            <Button size={"sm"} shape="circle">
                                <div style={{
                                    backgroundImage: `url(${images.icon.tools__icon})`,
                                    backgroundPosition: "-88px -110px",
                                    backgroundSize: "190px 190px",
                                    width: "20px",
                                    height: "20px",
                                    backgroundRepeat: "no-repeat",
                                    display: "inline-block"
                                }}>

                                </div>
                            </Button>
                        </div>

                        <div className={cx("name")}>
                            Cài đặt
                        </div>
                    </div>

                    <div className={cx("item")}>
                        <div className={cx("icon")}>
                            <Button size={"sm"} shape="circle">
                                <div style={{
                                    backgroundImage: `url(${images.icon.list_icon_5})`,
                                    backgroundPosition: "-0px -548px",
                                    backgroundSize: "26px 1082px",
                                    width: "20px",
                                    height: "20px",
                                    backgroundRepeat: "no-repeat",
                                    display: "inline-block"
                                }}>

                                </div>
                            </Button>
                        </div>

                        <div className={cx("name")} onClick={handleLogOut}>
                            Đăng xuất
                        </div>
                    </div>

                </div>
            </div>
        </Box>
    </div>);
}

export default forwardRef(BoxAvatar);