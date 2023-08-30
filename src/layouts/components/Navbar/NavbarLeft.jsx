import classNames from "classnames/bind";
import styles from "./NavbarLeft.module.scss";
import images from "~/assets/images/index";
import Input from "~/components/Input/Input";
import { useEffect, useRef, useState } from "react";
import Button from "~/components/Button/Button";
import ItemSearch from "~/components/ItemSearch/ItemSearch";

const cx = classNames.bind(styles);

function NavbarLeft() {
    const searchRef = useRef(null);
    const [searchResult,setSearchResult] = useState([]);
    const [inputValue,setInputValue] = useState(null);

    const handleChangeEvent = (event)=>{
        setInputValue(event.target.value);
    }

    useEffect(()=>{
         
        setSearchResult([1,2,3,4])
    },[])

    const handleBlur = (event)=>{
        removeBoxSearch()
    }

    const handleFocus = (event) =>{
        displayBoxSearch();
    }

    const handleBackBox = (event) =>{
        displayBoxSearch()
    }

    

    const displayBoxSearch = ()=>{
        searchRef.current.classList.remove("d-none");
    }

    const removeBoxSearch = ()=>{
        searchRef.current.classList.add("d-none");
    }


    return ( <div className={cx("header__left","d-flex align-items-center justify-content-between")}>
    <div className={cx("logo")}>
        <img src={images.logo} />
    </div>
    <div className={cx("search","ms-2")}>
        <Input placeholder={"Tìm kiếm trên facebook"} icon={images.icon.search_icon} onFocus={handleFocus} onChange={handleChangeEvent} onBlur={handleBlur}/>
    </div>
    <div className={cx("box__search","d-none")} ref={searchRef}>
        <div className={cx("search__back")}>
            <Button icon={images.icon.back_left_icon} size={"xl"} no_background={true} onClick={handleBackBox} />
        </div>
        <div className={cx("list__result")}>
            {/* inputValue render biến này ở đây */}
            {/* <div className={cx("list__result-header")}>
                <span>Gần đây</span>
                <span>Chỉnh sửa</span>
            </div> */}

            <div className={cx("list__result-list")}>
                <ItemSearch />
                <ItemSearch />
                <ItemSearch />
            </div>
        </div>
    </div>
</div> );
}

export default NavbarLeft;