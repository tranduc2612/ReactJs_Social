import classNames from "classnames/bind"; // import headless sẽ mất hiệu ứng hover tồn tại
import { Link } from "react-router-dom";
import styles from "./Button.module.scss";
import { forwardRef,useId,useImperativeHandle, useRef } from "react";

const cx = classNames.bind(styles);
function Button({to, children, icon, full_icon,no_background ,size, onClick, onBlur, onMouseOver, className, active, shape = "default"},ref) {
    const idBtn = useId()
    const btnRef = useRef();
    const layoutRef = useRef();
    let props = {
        onClick,
        onBlur,
        onMouseOver,
        ref: btnRef
    }

    useImperativeHandle(ref,()=>(
        {
            getParentButton(){
                return btnRef.current    
            },
            getLayoutClick(){
                return layoutRef.current    
            }
        }
    ))
   
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
                no_background: no_background,
                [shape]: true
            })} {...props}>
                {!full_icon && icon ? <img className={cx("icon",{
                    full: full_icon,
                    active: active,
                })} src={icon} /> : null}
                {children}
                <div className={cx("layout")} id={idBtn} ref={layoutRef}></div>
            </Comp> 
    );
}

export default forwardRef(Button);