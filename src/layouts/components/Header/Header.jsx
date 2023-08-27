import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import images from "~/assets/images/index";
import Input from "~/components/Input/Input";
const cx = classNames.bind(styles);

function Header() {
    return ( <div className={cx("header","d-flex align-items-center justify-content-between")}>
            <div className={cx("header__left","d-flex align-items-center justify-content-between")}>
                <div className={cx("header__left-logo")}>
                    <img src={images.logo} />
                </div>
                <div className={cx("header__left-search","ms-2")}>
                    <Input icon={images.icon.search_icon} />
                </div>
            </div>
            <div className={cx("header__middle")}>
                middle
            </div>
            <div className={cx("header__middle")}>
                right
            </div>
        </div> );
}

export default Header;