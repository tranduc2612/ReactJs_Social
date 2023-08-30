import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);
function Button({to, content, icon, full_icon,no_background ,size, onClick, className}) {
    let props = {
        onClick
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
            [size]: true,
            [className]: true,
            no_background: no_background
        })} {...props}>
            {!full_icon ? <img className={cx("icon",{
                full: full_icon,
            })} src={icon} /> : null}
            {content}
        </Comp> 
    );
}

export default Button;