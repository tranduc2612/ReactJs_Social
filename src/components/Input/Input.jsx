import { forwardRef,useRef } from "react";
import styles from "./Input.module.scss"
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function Input({icon, placeholder, onChange, onBlur, onFocus},ref) {
    const refIcon = useRef(null)
    const props = {
        icon,
        placeholder,
        onChange: function(e){
            if(onChange){
                onChange(e)
            }
        }
    }

    const handleFocus = (e)=>{
       refIcon.current.style.width = "0px";
       if(onFocus){
           onFocus(e)
       }
    }

    const handleBlur = (e)=>{
        const valueInput = e.target.value;
        refIcon.current.style.width = "3rem";
        if(onBlur){
            onBlur(e)
        }
    }

    return ( <div className={cx("wrapper")}>
        {icon && <img ref={refIcon} className={cx("icon")} src={icon} />}
        <input onFocus={handleFocus} onBlur={handleBlur} className={cx("input",{
            no_icon: icon === undefined ? true : false
        })} {...props} ref={ref} />
    </div> );
}

export default forwardRef(Input);