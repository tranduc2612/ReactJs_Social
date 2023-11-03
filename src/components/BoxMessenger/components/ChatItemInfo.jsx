import classNames from "classnames/bind";
import styles from "./ChatItemInfo.module.scss";
import Button from '~/components/Button/Button';
import images from "~/assets/images/index";

const cx = classNames.bind(styles)

function ChatItemInfo(props) {
    const { data, onClick } = props;

    return (<div onClick={onClick} className={cx("item")}>
        <div className={cx("avatar")}>
            <Button size={"xxl"} icon={data?.acccount?.avatar} full_icon={true} shape={"circle"} />
        </div>
        <div className={cx("body")}>
            <div className={cx("name")}>
                <span>{data?.account[0].fullname}</span>
            </div>
            <div className={cx("last__message")}>
                <span className={cx("message")}>{data?.message?.message ?? "Hãy gửi lời chào"}</span>
                <span className={cx("time")}>{data?.created_at}</span>
            </div>
        </div>
    </div>);
}

export default ChatItemInfo;