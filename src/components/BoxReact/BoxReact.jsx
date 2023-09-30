import Box from "../../components/Box/Box";
import styles from "./BoxReact.module.scss"
import classNames from "classnames/bind";
import {IMAGES_REACT} from "../../utils/constant"
import { forwardRef, memo } from "react";

const cx = classNames.bind(styles);



function BoxReact(props,ref) {
    const {className,children, ...lastProps} = props;
    

    return ( <>
        <Box ref={ref} className={cx("box__react",{
            [className]:true
        })} {...lastProps}>
            <ul className={cx("list")}>
                {IMAGES_REACT.map(e=>{
                    return (
                        <li key={e.id} className={cx("item")} id-icon={e.id}>
                            <img className={cx("icon")} src={e.img} alt="" id-icon={e.id}/>
                        </li>
                    )
                })}
            </ul>
        </Box>
    </> );
}

export default forwardRef(BoxReact);