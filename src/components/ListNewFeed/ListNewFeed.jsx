import styles from "./ListNewFeed.module.scss"
import classNames from "classnames/bind";
import BoxNewFeed from "../BoxNewFeed/BoxNewFeed";

const cx = classNames.bind(styles);

function ListNewFeed() {
    return ( <div className={cx("list")}>
            <BoxNewFeed shared={true} />
            <BoxNewFeed shared={false} />
            <BoxNewFeed shared={true} />
            <BoxNewFeed shared={false} />
    </div> );
}

export default ListNewFeed;