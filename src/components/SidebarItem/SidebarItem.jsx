import classNames from "classnames/bind";
import styles from "./SidebarItem.module.scss";

const cx = classNames.bind(styles);

function SideBarItem(props) {
    const {data,avatar,title, onClick,active = false, shape = "circle"} = props;
    const styles = {
        backgroundImage: `url(${data?.img_url})`,
        backgroundPosition: data?.position
    }
    return ( <div className={cx("item")} onClick={onClick}>
        <div className={cx("wrapper")}>
            <div className={cx("icon",{[shape]: true})}>
                {(avatar ? <img className={cx("avatar")} src={avatar} /> : <i style={styles}></i>)}
                {active ? <div className={cx("status")}>
                    <div className={cx("dot")}>
                        
                    </div>
                </div>: null}
            </div>
            <div className={cx("title")}>
                <span className={cx("text")}>{title}</span>
            </div>
        </div>
    </div> );
}

export default SideBarItem;