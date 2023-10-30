import classNames from "classnames/bind";
import styles from "./TimeLine.module.scss";
const cx = classNames.bind(styles);

function TimeLine({time}) {
    return ( 
        <div className={cx("line")}>
            <span className={cx("time")}>{time}</span>
        </div> 
    );
}

export default TimeLine;