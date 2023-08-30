import classNames from "classnames/bind";
import styles from "./Popper.module.scss";
import Button from "~/components/Button/Button";
import { useState } from "react";

const cx = classNames.bind(styles);

function Popper({item, PopperRender}) {
    let Comp = "div"
    const [showBox,setShowBox] = useState(true)
    
    if(PopperRender){
        Comp = PopperRender
    }

    const handleClick = (event)=>{
        // setShowBox(!showBox);
    }

    const handleBlur = (event)=>{
        // setShowBox(false);
    }
    return ( <div className={cx("wrapper")}>
            <Button active={showBox} icon={item.icon} full_icon={item.full_icon} size={"xl"} onBlur={handleBlur} onClick={handleClick} />
            {
                showBox && <Comp />
            }
        </div> );
}

export default Popper;