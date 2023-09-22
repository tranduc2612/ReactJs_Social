import classNames from "classnames/bind";
import styles from "./TimeLine.module.scss";
const cx = classNames.bind(styles);

function TimeLine() {
    return ( 
        <div className={cx("line")}>
            <span className={cx("time")}>9:30</span>
        </div> 
    );
}

export default TimeLine;