import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import NavbarItem from "~/components/NavbarItem/NavbarItem";
import { useState } from "react";
import NavbarLeft from "../Navbar/NavbarLeft";
import NavbarRight from "../Navbar/NavbarRight";
import HomeIcon from "../IconSvg/Home/HomeIcon";
import VideoIcon from "../IconSvg/Video/VideoIcon";
const cx = classNames.bind(styles);

const ListNav = [
    {
        id: 1,
        title: "Trang chủ",
        icon: HomeIcon,
        isActive: true
    },
    {
        id: 2,
        title: "Video",
        icon: VideoIcon,
        isActive: false
    },
    // {
    //     id: 3,
    //     title: "Marketplace",
    //     icon: images.icon.shop_icon,
    //     isActive: false
    // },
    // {
    //     id: 4,
    //     title: "Nhóm",
    //     icon: images.icon.group_icon,
    //     isActive: false
    // },
    // {
    //     id: 5,
    //     title: "Trò chơi",
    //     icon: images.icon.game_icon,
    //     isActive: false
    // }
]

function Header() {
    const [listNav,setListNav] = useState(ListNav);
    return ( <div className={cx("header","d-flex align-items-center justify-content-between")}>
            {/* Left */}
            <NavbarLeft />
            {/* Middle */}
            <div className={cx("header__middle")}>
                <ul className={cx("header__navbar","m-0 p-0")}>
                    {listNav.map((nav)=>{
                        return(<NavbarItem key={nav.id} isActive={nav.isActive} title={nav.title} Icon={nav.icon} />)
                    })}
                </ul>
            </div>
            {/* Right */}
            <div className={cx("header__right")}>
                <NavbarRight />
            </div>
        </div> );
}

export default Header;