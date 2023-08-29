import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);
function Button({to, content, icon, full_icon}) {
    let props = {
        
    }
    let Comp = "button";
    if(to){
        props.to = to;
        Comp = Link
    }
    if(full_icon){
        props.style = {
            backgroundImage: `url(${icon})`,
            objectFit: "contain",
            backgroundSize: "cover"
        }
    }
    console.log(full_icon)
    return ( 
        <Comp className={cx("button")} {...props}>
            {!full_icon ? <img className={cx("icon",{
                full: full_icon
            })} src={icon} /> : null}
            {content}
        </Comp> 
    );
}

export default Button;