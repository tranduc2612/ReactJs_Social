import classNames from "classnames/bind";
import styles from "./NotiItem.module.scss";
import images from "~/assets/images/index";
import Button from 'react-bootstrap/Button';
import ButtonCustom from "~/components/Button/Button";
import { useRef } from "react";
import { formatDate } from "~/utils/format";
import { useState } from "react";
const cx = classNames.bind(styles)

// 0px -2310px -> video
// 0px -990px -> comment
// 30px 2370px -> group
// 0px -1140px -> user
// 0px -1890px -> post
const TYPE_NOTIFI = {
    ADD_FRIEND: {
        id: "ADD_FRIEND",
        icon: "0px -1140px"
    },
    LIKE_POST: {
        id: "LIKE_POST",
        icon: "0px -2070px"
    },
    COMMENT_POST: {
        id: "ADD_FRIEND",
        icon: "0px -990px"
    },
    UPLOAD_POST: {
        id: "UPLOAD_POST",
        icon: "0px -1890px"
    },
    ACCEPT_FRIEND: {
        id: "ACCEPT_FRIEND",
        icon: "0px -1140px"
    }
}

function NotiItem({ data }) {
    const refItem = useRef(null);
    const [notiIcon, setNotiIcon] = useState(() => {
        const icon = TYPE_NOTIFI[data?.noti_type];
        if (icon) {
            return icon
        }
        return {}
    })
    const handleHover = () => {

    }

    const handleClick = (e) => {
        e.stopPropagation();
    }

    return (<div className={cx("item")} onClick={handleClick}>
        <div className={cx("head")}>
            <ButtonCustom shape="circle" size="xxl" full_icon={true} icon={data?.avatar} />
            <i className={cx("sub_icon")} style={{
                backgroundImage: `url("${images.icon.list_icon}")`,
                backgroundPosition: `${notiIcon?.icon}`, zIndex: "999"
            }}></i>
        </div>
        <div className={cx("body", "fw-normal")}>
            <div className={cx("content")}>
                <span className={cx("author", "fw-bold")}>{data?.fullname}</span> {data?.content_noti}
            </div>
            <div className={cx("time", {
                active: data?.seen === 0 ? true : false
            })}>
                {formatDate(data?.created_at)}
            </div>
            <div className={cx("co_friend")}>
            </div>
            {data?.type_code === "ADD_FRIEND" ?
                <div className={cx("add_friend_btn")}>
                    <Button onClick={handleClick} ref={refItem} attr={"button"} className={cx("custom__btn", "accept")} variant="primary"><span>Xác nhận</span></Button>
                    <ButtonCustom attr={"button"} className={cx("custom__btn", "deny")}><span>Xóa</span></ButtonCustom>
                </div>
                : null}
        </div>
    </div>);
}

export default NotiItem;