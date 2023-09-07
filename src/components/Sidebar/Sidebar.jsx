import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";

const cx = classNames.bind(styles);

function Sidebar({children}) {
    return ( <div className={cx("sidebar")}>{children}</div> );
}

export default Sidebar;