import classNames from "classnames/bind";
import styles from "./NavbarItem.module.scss";
import Tippy from '@tippyjs/react/headless'; // import headless sẽ mất hiệu ứng hover tồn tại

const cx = classNames.bind(styles);

function NavbarItem({ Icon, isActive = false, title, onClick, nav_id, url }) {
    return (
        <>
            <Tippy
                interactive
                placement="bottom"
                trigger="mouseenter"
                delay={[100, 50]}
                render={attrs => (
                    <div className={cx("message")} tabIndex="-1" {...attrs}>
                        {title || "Chưa có title"}
                    </div>
                )}>
                <div className={cx("item", {
                    active: isActive
                })} onClick={() => onClick(nav_id, url)}>
                    <Icon className={cx("icon", {
                        active: isActive
                    })} />
                    {/* <img className={cx("icon",{
                active: isActive
            })} src={icon} /> */}
                </div>
            </Tippy>
        </>
    );
}

export default NavbarItem;