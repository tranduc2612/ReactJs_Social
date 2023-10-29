import classNames from "classnames/bind";
import styles from "./CustomBox.module.scss";
import { forwardRef, useImperativeHandle } from "react";

const cx = classNames.bind(styles)

function CustomBox({ header, children, footer, className, classBody }, ref) {

    return (<div className={cx("custom__box", {
        [className]: true
    })}>
        <div className={cx("header")}>
            {header}
        </div>
        <div className={cx("body", { [classBody]: classBody && true })} ref={ref}>
            {children}
        </div>
        <div className={cx("footer")}>
            {footer}
        </div>
    </div>);
}

export default forwardRef(CustomBox);