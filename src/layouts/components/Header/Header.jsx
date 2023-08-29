import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import images from "~/assets/images/index";
import NavbarItem from "~/components/NavbarItem/NavbarItem";
import { useState } from "react";
import Button from "~/components/Button/Button";
import NavbarLeft from "../Navbar/NavbarLeft";
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

const InfoButton =[
    {
        id: 1,
        icon:images.icon.menu_dot_icon,
        full_icon: false 
    },
    {
        id: 2,
        icon: images.icon.messenger_dark_icon,
        full_icon: false
    },
    {
        id: 3,
        icon: images.icon.bell_icon,
        full_icon: false
    },
    {
        id: 4,
        icon: images.icon.avatar_demo,
        full_icon: true
    }
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
                        return(<NavbarItem key={nav.id} isActive={nav.isActive} title={nav.title} icon={nav.icon} />)
                    })}
                </ul>
            </div>
            {/* Right */}
            <div className={cx("header__right")}>
                {InfoButton.map(e=>{
                    return (
                    <Button key={e.id} icon={e.icon} full_icon={e.full_icon} />)
                })}
            </div>
        </div> );
}

export default Header;