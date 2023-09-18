import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";

const cx = classNames.bind(styles);

function Sidebar({children,className}) {
    return ( 
    <div className={cx("sidebar",{[className]:className && true})}>
        {children}
    </div> );
}

export default Sidebar;