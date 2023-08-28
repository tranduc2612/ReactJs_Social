import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import images from "~/assets/images/index";
import Input from "~/components/Input/Input";
import NavbarItem from "~/components/NavbarItem/NavbarItem";
import { useState } from "react";
const cx = classNames.bind(styles);

const ListNav = [
    {
        id: 1,
        title: "Trang chủ",
        icon: images.icon.home_icon,
        isActive: true
    },
    {
        id: 2,
        title: "Video",
        icon: images.icon.youtube_icon,
        isActive: false
    },
    {
        id: 3,
        title: "Marketplace",
        icon: images.icon.shop_icon,
        isActive: false
    },
    {
        id: 4,
        title: "Nhóm",
        icon: images.icon.group_icon,
        isActive: false
    },
    {
        id: 5,
        title: "Trò chơi",
        icon: images.icon.game_icon,
        isActive: false
    }
]

function Header() {
    const [listNav,setListNav] = useState(ListNav);
    return ( <div className={cx("header","d-flex align-items-center justify-content-between")}>
            {/* Left */}
            <div className={cx("header__left","d-flex align-items-center justify-content-between")}>
                <div className={cx("header__left-logo")}>
                    <img src={images.logo} />
                </div>
                <div className={cx("header__left-search","ms-2")}>
                    <Input icon={images.icon.search_icon} />
                </div>
            </div>
            {/* Middle */}
            <div className={cx("header__middle")}>
                <ul className={cx("header__navbar","m-0 p-0")}>
                    {listNav.map((nav)=>{
                        return(<NavbarItem key={nav.id} isActive={nav.isActive} title={nav.title} icon={nav.icon} />)
                    })}
                </ul>
            </div>
            {/* Right */}
            <div className={cx("header__right")} style={{width: "220px"}}>
                right
            </div>
        </div> );
}

export default Header;