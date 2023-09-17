import classNames from "classnames/bind";
import styles from "./Box.module.scss";
import { forwardRef, memo } from "react";

const cx = classNames.bind(styles)

function Box(props,ref) {
    const {children, className, ...lastProps} = props
    return ( <div ref={ref} className={cx("box",{
        [className]: true
    })} {...lastProps}>
        {children}
    </div> );
}

export default forwardRef(Box);