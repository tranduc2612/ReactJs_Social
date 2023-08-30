import classNames from "classnames/bind"; // import headless sẽ mất hiệu ứng hover tồn tại
import { Link } from "react-router-dom";
import styles from "./Button.module.scss";
import { forwardRef } from "react";

const cx = classNames.bind(styles);
function Button({to, content, icon, full_icon,no_background ,size, onClick, onBlur, className, active},ref) {
    let props = {
        onClick,
        onBlur
    }
   
    let Comp = "button";
    if(to){
        props.to = to;
        props.style = {
            padding: "6px 1px",
        }
        Comp = Link
    }
    if(full_icon){
        props.style = {
            backgroundImage: `url(${icon})`,
            objectFit: "contain",
            backgroundSize: "cover"
        }
    }

    return (
            <Comp className={cx("button",{
                [size]: size ? true : false,
                [className]: className ? true : false,
                active: active,
                no_background: no_background
            })} {...props}>
                {!full_icon ? <img className={cx("icon",{
                    full: full_icon,
                    active: active
                })} src={icon} /> : null}
                {content}
            </Comp> 
    );
}

export default forwardRef(Button);