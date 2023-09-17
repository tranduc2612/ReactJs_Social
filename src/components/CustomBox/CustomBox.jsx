import classNames from "classnames/bind";
import styles from "./CustomBox.module.scss";

const cx = classNames.bind(styles)

function CustomBox({header,children,footer,className}) {
    return ( <div className={cx("custom__box",{
        [className]:true
    })}>
        <div className={cx("header")}>
            {header}
        </div>
        <div className={cx("body")}>
            {children}
        </div>
        <div className={cx("footer")}>
            {footer}
        </div>
    </div> );
}

export default CustomBox;