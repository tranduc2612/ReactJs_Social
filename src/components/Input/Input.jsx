import { forwardRef,useRef,useState } from "react";
import styles from "./Input.module.scss"
import classNames from "classnames/bind";
import Button from "../Button/Button";
import images from "../../assets/images/index";
const cx = classNames.bind(styles);

function Input({icon, placeholder, onChange, onBlur, onFocus, className, isIconBack},ref) {
    const refIcon = useRef(null)
    const [isFocus, setIsFocus] = useState(false)
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
       setIsFocus(true)
       if(onFocus){
           onFocus(e)
       }
    }

    const handleBlur = (e)=>{
        refIcon.current.style.width = "3rem";
        setIsFocus(false)
        if(onBlur){
            onBlur(e)
        }
    }

    return ( <div className={cx("wrapper")}>
        {isIconBack && <Button icon={images.icon.back_left_icon} shape="circle" className={cx("custom__btn",{active: isFocus})} />}
        <div className={cx("input__form",{
        [className]: true
    })}>
        {icon && <img ref={refIcon} className={cx("icon")} src={icon} />}
        <input 
            onFocus={handleFocus} 
            onBlur={handleBlur} 
            className={cx("input",{
            no_icon: icon === undefined ? true : false,
            })}  
            ref={ref}
            {...props} 
        />
    </div>
    </div> );
}

export default forwardRef(Input);