import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./ItemSearch.module.scss"
import images from "~/assets/images/index"
import { useEffect, useState } from "react";
import { BASE_URL_MEDIA } from "~/services/base";

const cx = classNames.bind(styles);

function ItemSearch({ fullname, avatar, number_friend, username, removeBoxSearch }) {
    return (<Link to={`/profile/${username}`} className={cx("item")} onClick={() => removeBoxSearch()}>
        <div className={cx("avatar")}>
            <img src={BASE_URL_MEDIA + avatar} />
        </div>
        <div className={cx("info")}>
            <div className={cx("name")}>
                <span>{fullname}</span>
            </div>
            <div className={cx("relative")}>
                <span>{number_friend} Bạn bè</span>
            </div>
        </div>
    </Link>);
}

export default ItemSearch;