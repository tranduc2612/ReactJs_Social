import styles from "./BoxNewFeed.module.scss"
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function BoxNewFeed() {
    return ( <div className={cx("box__newfeed","box-custom")}>
        <div className={cx("info")}>
            
        </div>

        <div className={cx("title")}>
            
        </div>

        <div className={cx("images")}>
            
        </div>

        <div className={cx("info__contact")}>
            <div className={cx("info__react")}>
                haha
            </div>

            <div className={cx("info__comment")}>
                65 comment
            </div>
        </div>

        <div className={cx("tools__contact")}>
            <div className={cx("react")}>
                like
            </div>
            <div className={cx("comment")}>
                comment
            </div>
            <div className={cx("send")}>
                gửi
            </div>
        </div>

        <div className={cx("list__comment")}>
            list comment
        </div>
    </div> );
}

export default BoxNewFeed;