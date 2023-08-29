import classNames from "classnames/bind";
import styles from "./NavbarLeft.module.scss";
import images from "~/assets/images/index";
import Input from "~/components/Input/Input";
import { useState } from "react";
import Button from "~/components/Button/Button";

const cx = classNames.bind(styles);

function NavbarLeft() {
    const [searchResult,setSearchResult] = useState("")

    const handleChangeEvent = (event)=>{
        setSearchResult(event.target.value)
    }

    return ( <div className={cx("header__left","d-flex align-items-center justify-content-between")}>
    <div className={cx("header__left-logo")}>
        <img src={images.logo} />
    </div>
    <div className={cx("header__left-search","ms-2")}>
        <Input placeholder={"Tìm kiếm trên facebook"} icon={images.icon.search_icon} onChange={handleChangeEvent}/>
    </div>
    <div className={cx("header__left-result-search")}>
        <div className={cx("header__left-result-search-head")}>
            <button>
                {/* Tạo ra small icon */}

                {/* <img className={cx("header__left-result-search")} src={images.icon.search_icon} /> */}
            </button>
        </div>
        <div className={cx("header__left-result-search-content")}>
            <h3>Gần đây</h3>
        </div>
    </div>
</div> );
}

export default NavbarLeft;