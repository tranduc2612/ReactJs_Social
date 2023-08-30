import classNames from "classnames/bind";
import styles from "./BoxNotification.module.scss";
import Box from "~/components/Box/Box"
import Button from "~/components/Button/Button"
import images from "~/assets/images/index";
import { useState } from "react";

const cx = classNames.bind(styles)




const BASE_BTN = {
    all: false,
    unRead: false
 }
function BoxNotification() {
    
    const [filterNotify, setFilterNotify] = useState(BASE_BTN);

    const handleBtnFilter = (e)=> {
        const value = e.target.getAttribute("value");
        let newFilter = {...BASE_BTN};

        if(value == "all"){
            newFilter.all = true
        }
        if(value == "unread"){
            newFilter.unRead = true
        }
        setFilterNotify(newFilter)
    }

    return ( <div className={cx("wrapper")}>
        <Box>
            <div className={cx("notify")}>
                <div className={cx("header","d-flex")}>
                    <h2>Thông báo</h2>
                    <Button icon={images.icon.three_dot_icon} size={"sm"} />
                </div>
                <div className={cx("body")}>
                    <div className={cx("filter")}>
                        <button className={cx("button__filter",{
                            active: filterNotify.all
                        })} onClick={handleBtnFilter}><span value={"all"}>Tất cả</span></button>
                        <button className={cx("button__filter",{
                            active: filterNotify.unRead
                        })} onClick={handleBtnFilter}><span value={"unread"}>Chưa được</span></button>
                    </div>
                    <ul className={cx("list")}>
                        
                    </ul>
                </div>
            </div>
        </Box>
    </div> );
}

export default BoxNotification;