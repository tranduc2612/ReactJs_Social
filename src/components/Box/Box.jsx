import classNames from "classnames/bind";
import styles from "./Box.module.scss";

const cx = classNames.bind(styles)

function Box({children,className}) {
    return ( <div className={cx("box",className)}>
        {children}
    </div> );
}

export default Box;