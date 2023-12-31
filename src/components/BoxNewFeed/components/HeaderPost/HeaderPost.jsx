import { useRef, useState, useCallback, useId, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import classNames from "classnames/bind";
import 'swiper/css';
import 'swiper/swiper-bundle.css';
import Tippy from '@tippyjs/react/headless'; // import headless sẽ mất hiệu ứng hover tồn tại

import styles from "./HeaderPost.module.scss"
import images from "~/assets/images/index";
import Button from "~/components/Button/Button"
import Box from "~/components/Box/Box";
import { formatDate } from "~/utils/format";
import { AUDIENCE_TYPE } from "~/utils/constant";
import { useSelector, useDispatch } from 'react-redux'
import { BASE_URL_MEDIA, Post } from "~/services/base";
import { Link, useNavigate } from "react-router-dom";
import checkResponse from "~/utils/checkResponse";

const cx = classNames.bind(styles);

function HeaderPost({ handleOpenConfirmDeleteModal, handleOpenEditModal, handleReport, showModalEditPost, showConfirmBoxDelete, data, readOnly = false }) {
    const navigate = useNavigate();
    const [showSetting, setShowSetting] = useState(false);
    const userData = useSelector((state) => state.auth);
    const type_audience = AUDIENCE_TYPE.find(type => type.code === data?.audience_type) && AUDIENCE_TYPE.find(type => type.code === data?.audience_type)?.image;

    useEffect(() => {
        if (showModalEditPost || showConfirmBoxDelete) {
            setShowSetting(false)
        }
    }, [showModalEditPost, showConfirmBoxDelete])


    const handleRedirectProfile = () => {
        window.open(`/profile/${data?.username}`, "_self")
        // navigate(`/profile/${data?.username}`)
    }

    return (<>
        <div className={cx("header")}>
            <div className={cx("header__left")}>
                <div className={cx("avatar")} onClick={handleRedirectProfile}>
                    <Button icon={BASE_URL_MEDIA + data?.avatar} full_icon={true} shape="circle" />
                </div>
                <div className={cx("info")}>
                    <div className={cx("name__author")} onClick={handleRedirectProfile}>
                        <span>{data?.fullname || "Cần cập nhật thông tin"}</span>
                    </div>

                    <div className={cx("time__created")}>
                        <span>{formatDate(data?.created_at)}</span>
                        <span className={cx("privacy")}><img className={cx("privacy_icon")} src={type_audience} /></span>
                    </div>
                </div>
            </div>
            {
                userData.data_user?.username === data?.username && !readOnly ?
                    <div className={cx("header__right")}>
                        {handleOpenConfirmDeleteModal == null || handleOpenEditModal == null ? null : <>
                            <div className={cx("setting")}>
                                <Tippy
                                    interactive
                                    visible={showSetting}
                                    placement="bottom"
                                    delay={[100, 50]}
                                    arrow="true"
                                    onClickOutside={() => setShowSetting(false)}
                                    render={attrs => (
                                        <div tabIndex="-1" {...attrs}>
                                            <Box className={cx("box__setting")} style={{ width: "300px" }}>
                                                <ul className={cx("list__setting")}>
                                                    <li className={cx("item__setting")}>
                                                        <div style={{
                                                            backgroundImage: `url(${images.icon.list_icon_4})`,
                                                            backgroundPosition: "0px -374px",
                                                            backgroundSize: "22px 616px",
                                                            width: "20px",
                                                            height: "20px",
                                                            backgroundRepeat: "no-repeat",
                                                            display: "inline-block"
                                                        }}>
                                                        </div>
                                                        <span className={cx("setting__title")} onClick={(e) => handleOpenEditModal(e, data?.post_id)}>
                                                            Chỉnh sừa bài viết
                                                        </span>
                                                    </li>

                                                    <li className={cx("item__setting")} onClick={(e) => handleOpenConfirmDeleteModal(e, data?.post_id)}>
                                                        <div style={{
                                                            backgroundImage: `url('https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/msdW_D9Y2bQ.png')`,
                                                            backgroundPosition: "0px -1120px",
                                                            backgroundSize: "26px 1258px",
                                                            width: "20px",
                                                            height: "20px",
                                                            backgroundRepeat: "no-repeat",
                                                            display: "inline-block"
                                                        }}>
                                                        </div>
                                                        <span className={cx("setting__title")}>
                                                            Xóa bài viết
                                                        </span>
                                                    </li>
                                                </ul>
                                            </Box>
                                        </div>
                                    )}>
                                    <div>
                                        <Button icon={images.icon.three_dot_icon} size={"sm"} shape="circle" onClick={() => setShowSetting(!showSetting)} />
                                    </div>
                                </Tippy>
                            </div>
                        </>}
                    </div>
                    : <div className={cx("setting")}>
                        <Tippy
                            interactive
                            visible={showSetting}
                            placement="bottom"
                            delay={[100, 50]}
                            arrow="true"
                            onClickOutside={() => setShowSetting(false)}
                            render={attrs => (
                                <div tabIndex="-1" {...attrs}>
                                    <Box className={cx("box__setting")} style={{ width: "300px" }}>
                                        <ul className={cx("list__setting")}>
                                            <li className={cx("item__setting")}>
                                                <img className="x1b0d499 xep6ejk" src={images.icon.warning_post} alt="" height="20" width="20" />
                                                <span className={cx("setting__title")} onClick={handleReport}>
                                                    Báo cáo bài viết
                                                </span>
                                            </li>

                                        </ul>
                                    </Box>
                                </div>
                            )}>
                            <div>
                                <Button icon={images.icon.three_dot_icon} size={"sm"} shape="circle" onClick={() => setShowSetting(!showSetting)} />
                            </div>
                        </Tippy>
                    </div>
            }
        </div>

        <div className={cx("title")}>
            <span>{data?.content}</span>
        </div>



    </>);
}

export default HeaderPost;