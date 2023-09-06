import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./ItemSearch.module.scss"
import images from "~/assets/images/index"

const cx = classNames.bind(styles);
function ItemSearch({nameUser,avatar,relative,url}) {
    return ( <Link to={url} className={cx("item")}>
        <div className={cx("avatar")}>
            <img src={images.logo.img_logo} />
        </div>
        <div className={cx("info")}>
            <div className={cx("name")}>
                <span>Trần Minh Đức</span>
            </div>
            <div className={cx("relative")}>
                <span>Bạn bè</span>
            </div>
        </div>
    </Link> );
}

export default ItemSearch;