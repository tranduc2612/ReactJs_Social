import classNames from "classnames/bind";
import styles from "./ChatItem.module.scss";
import Button from '../../../components/Button/Button';
import images from "../../../assets/images/index";

const cx = classNames.bind(styles)

function ChatItem() {
    return ( <div className={cx("item")}>
        <div className={cx("avatar")}>
            <Button size={"xxl"} icon={images.icon.avatar_demo} full_icon={true} shape={"circle"} />
        </div>
        <div className={cx("body")}>
            <div className={cx("name")}>
                <span>Cùng Lấy Học Bổng Xuất Sắc Cùng Đức</span>
            </div>
            <div className={cx("last__message")}>
                <span className={cx("message")}>Gọi em là JS vì anh không thể hiểu được em</span>
                <span className={cx("time")}>13 phút</span>
            </div>
        </div>
    </div> );
}

export default ChatItem;