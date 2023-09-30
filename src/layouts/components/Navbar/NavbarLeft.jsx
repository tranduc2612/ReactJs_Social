import classNames from "classnames/bind";
import styles from "./NavbarLeft.module.scss";
import images from "../../../assets/images/index";
import Input from "../../../components/Input/Input";
import { useEffect, useRef, useState } from "react";
import Button from "../../../components/Button/Button";
import ItemSearch from "../../../components/ItemSearch/ItemSearch";

const cx = classNames.bind(styles);

function NavbarLeft() {
    const searchRef = useRef(null);
    const [searchResult,setSearchResult] = useState([]);
    const [inputValue,setInputValue] = useState(null);

    const handleChangeEvent = (event)=>{
        displayBoxSearch();
        setInputValue(event.target.value);
    }

    useEffect(()=>{
         
        setSearchResult([1,2,3,4])
    },[])

    useEffect(()=>{
        function handleClickOutside(event) {
            const btnLayerClick = searchRef.current;
            if (searchRef.current && !searchRef.current.contains(event.target) && !btnLayerClick.isEqualNode(event.target)) { 
                removeBoxSearch()
            }
          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
          };
    },[searchRef])

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
        <img src={images.logo.img_logo} />
    </div>
    <div className={cx("search","ms-2")}>
        <Input className={cx("search-input")} placeholder={"Tìm kiếm trên facebook"} icon={images.icon.search_icon} onFocus={handleFocus} onChange={handleChangeEvent}/>
    </div>
    <div className={cx("box__search","d-none")} ref={searchRef}>
        <div className={cx("search__back")} onClick={removeBoxSearch}>
            <Button shape="circle" icon={images.icon.back_left_icon} size={"xl"} no_background={true} onClick={handleBackBox} />
        </div>
        <div className={cx("list__result")}>
            {/* inputValue render biến này ở đây */}
            {/* <div className={cx("list__result-header")}>
                <span>Gần đây</span>
                <span>Chỉnh sửa</span>
            </div> */}

            <div className={cx("list__result-list")}>
                <ItemSearch url="/2" />
                <ItemSearch url="/2" />
                <ItemSearch url="/2" />
            </div>
        </div>
    </div>
</div> );
}

export default NavbarLeft;