import classNames from "classnames/bind";
import styles from "./BoxIcon.module.scss";
import {LIST_ICON} from "../../utils/constant"

const cx = classNames.bind(styles);

function BoxIcon({onClick}) {
    return ( <div className={cx("box__icon","box-custom")}>
        <ul className={cx("list__icon")}>
            {LIST_ICON.map((icon,index)=>{
                return (<li key={index} onClick={(e)=>onClick(e)} className={cx("icon")}><span>{icon}</span></li>)
            })}
        </ul>
    </div> );
}

export default BoxIcon;