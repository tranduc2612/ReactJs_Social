import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import NavbarItem from "~/components/NavbarItem/NavbarItem";
import { useState } from "react";
import NavbarLeft from "../Navbar/NavbarLeft";
import NavbarRight from "../Navbar/NavbarRight";
import HomeIcon from "../IconSvg/Home/HomeIcon";
import VideoIcon from "../IconSvg/Video/VideoIcon";
import ProfileIcon from "../IconSvg/Profile/ProfileIcon";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import getCurrentUrl from "~/utils/getCurrentUrl";
const cx = classNames.bind(styles);



function Header() {
    const userData = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const ListNav = [
        {
            id: 1,
            title: "Trang chủ",
            icon: HomeIcon,
            isActive: getCurrentUrl() === "/",
            url: "/"
        },
        {
            id: 2,
            title: "Trò chuyện",
            icon: VideoIcon,
            isActive: getCurrentUrl() === "/messenger" || getCurrentUrl().includes("/messenger/"),
            url: "/messenger"
        },
        {
            id: 3,
            title: "Cá nhân",
            icon: ProfileIcon,
            isActive: getCurrentUrl() === `/profile/${userData.data_user?.username}`,
            url: `/profile/${userData.data_user?.username}`
        },
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
    const [listNav, setListNav] = useState(ListNav);

    const handleRedirect = (nav_id, url) => {
        const newLstNav = listNav.map(item => {
            // kiểm tra navitem nào đang hoạt động thì tắt
            if (item.isActive && nav_id !== item.id) {
                return {
                    ...item,
                    isActive: false
                }
            }
            // chuyển navitem được chọn thành hoạt động
            if (item.id === nav_id) {
                return {
                    ...item,
                    isActive: true
                }
            }

            return item
        })
        navigate(url)
        setListNav(newLstNav);
    }

    return (<div className={cx("header", "d-flex align-items-center justify-content-between")}>
        {/* Left */}
        <NavbarLeft handleRedirect={handleRedirect} />
        {/* Middle */}
        <div className={cx("header__middle")}>
            <ul className={cx("header__navbar", "m-0 p-0")}>
                {listNav.map((nav) => {
                    return (<NavbarItem key={nav.id} url={nav.url} nav_id={nav.id} isActive={nav.isActive} title={nav.title} Icon={nav.icon} onClick={handleRedirect} />)
                })}
            </ul>
        </div>
        {/* Right */}
        <div className={cx("header__right")}>
            <NavbarRight handleRedirect={handleRedirect} />
        </div>
    </div>);
}

export default Header;