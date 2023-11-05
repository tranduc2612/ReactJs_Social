import classNames from "classnames/bind";
import styles from "./NavbarLeft.module.scss";
import images from "~/assets/images/index";
import Input from "~/components/Input/Input";
import { useEffect, useRef, useState } from "react";
import Button from "~/components/Button/Button";
import ItemSearch from "~/components/ItemSearch/ItemSearch";
import useDebounce from "~/hooks/useDebouce";
import { Post } from "~/services/base";
import { useSelector, useDispatch } from 'react-redux'
import checkResponse from "~/utils/checkResponse";
import { Link, useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

function NavbarLeft({ handleRedirect }) {
    const userData = useSelector((state) => state.auth);
    const navigate = useNavigate()
    const searchRef = useRef(null);
    const [searchResult, setSearchResult] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const debounce = useDebounce(inputValue, 500);

    const handleChangeEvent = (event) => {
        displayBoxSearch();
        setInputValue(event.target.value);
    }

    useEffect(() => {
        if (!inputValue.trim()) {
            setSearchResult([])
            return
        }

        Post("/action/search-accounts-posts", {
            search_term: inputValue,
            page_count: 10,
            page_index: 1
        }, userData.access_token)
            .then((res) => {
                if (checkResponse(res)) {
                    const lstUser = res.returnObj?.matched_accounts;
                    setSearchResult([
                        ...lstUser
                    ])
                }
            })
    }, [debounce])

    useEffect(() => {
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
    }, [searchRef])

    const handleFocus = (event) => {
        displayBoxSearch();
    }

    const handleBackBox = (event) => {
        displayBoxSearch()
    }
    const displayBoxSearch = () => {
        searchRef.current.classList.remove("d-none");
    }

    const removeBoxSearch = () => {
        searchRef.current.classList.add("d-none");
    }


    return (<div className={cx("header__left", "d-flex align-items-center justify-content-between")}>
        <div className={cx("logo")} onClick={() => {
            handleRedirect(1, "/")
        }}>
            <img src={images.logo.img_logo} />
        </div>
        <div className={cx("search", "ms-2")}>
            <Input className={cx("search-input")} placeholder={"Tìm kiếm trên facebook"} icon={images.icon.search_icon} onFocus={handleFocus} onChange={handleChangeEvent} />
        </div>
        <div className={cx("box__search", "d-none")} ref={searchRef}>
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
                    {searchResult.length > 0 ? <>
                        {searchResult.map(item => {
                            return (
                                <ItemSearch key={item?.username} removeBoxSearch={removeBoxSearch} username={item?.username} avatar={item?.avatar} fullname={item?.fullname} number_friend={item?.number_friend} />
                            )
                        })}
                    </> : <>
                        <img style={{
                            alignSelf: "center",
                        }} src={images.icon.sad_empty} width={200} height={200} alt="" />
                    </>}
                </div>
                {
                    searchResult.length !== 0 && <Link onClick={() => {
                        removeBoxSearch();
                    }} to={`/search/${inputValue}`} className={cx("see_more", "fs-4 text-center")}>
                        Xem thêm
                    </Link>
                }

            </div>
        </div>
    </div>);
}

export default NavbarLeft;