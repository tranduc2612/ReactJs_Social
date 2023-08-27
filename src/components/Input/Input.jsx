import { forwardRef } from "react";
import styles from "./Input.module.scss"
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function Input({icon, placeholder, onChange},ref) {
    const props = {
        icon,
        placeholder,
        onChange: function(e){
            if(onChange){
                onChange(e)
            }
        }
    }

    return ( <div className={cx("wrapper")}>
        {icon && <img className={cx("icon")} src={icon} />}
        <input className={cx("input",{
            no_icon: icon === undefined ? true : false
        })} {...props} ref={ref} />
    </div> );
}

export default forwardRef(Input);