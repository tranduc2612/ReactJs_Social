import images from "~/assets/images/index";
import styles from "./Notfound.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function NotFound() {
    function goBack() {
        window.history.back();
    }
    return (<div className={cx("body_page")}>
        <div className={cx("text")}>
            <h1>Oops...! Not Found Page !!! <span onClick={goBack}>Quay lại</span></h1>
        </div>
        <img src={images.icon.sad_empty} alt="" />
    </div>);
}

export default NotFound;