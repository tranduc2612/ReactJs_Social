import classNames from "classnames/bind";
import styles from "./BoxNotification.module.scss";
import Box from "~/components/Box/Box"
import Button from "~/components/Button/Button"
import images from "~/assets/images/index";
import { forwardRef, useState } from "react";
import NotiItem from "./component/NotiItem";

const cx = classNames.bind(styles)

function BoxNotification(props,ref) {
    
    const [filterNotify, setFilterNotify] = useState(false);

    const handleBtnFilter = (e)=> {
        setFilterNotify(!filterNotify)
    }

    return ( <div className={cx("wrapper")} ref={ref}>
        <Box>
            <div className={cx("notify")}>
                <div className={cx("header","d-flex")}>
                    <h2>Thông báo</h2>
                    <div className={cx("btn__header")}>
                        <Button icon={images.icon.three_dot_icon} size={"sm"} shape="circle">
                            
                        </Button>
                    </div>
                </div>
                <div className={cx("body")}>
                    <div className={cx("filter")}>
                        <button className={cx("button__filter",{
                            active: !filterNotify
                        })} onClick={handleBtnFilter}><span value={"all"}>Tất cả</span></button>
                        <button className={cx("button__filter",{
                            active: filterNotify
                        })} onClick={handleBtnFilter}><span value={"unread"}>Chưa được</span></button>
                    </div>
                    <div className={cx("title")}>
                        Mới
                    </div>
                    <ul className={cx("list")}>
                        <NotiItem />
                        <NotiItem />
                        <NotiItem />
                        <NotiItem />
                        <NotiItem />
                        <NotiItem />
                        <NotiItem />
                        <NotiItem />
                        <NotiItem />
                        <NotiItem />
                        <NotiItem />
                        <NotiItem />
                        <NotiItem />
                        <NotiItem />
                        <NotiItem />
                        <NotiItem />
                    </ul>
                </div>
            </div>
        </Box>
    </div> );
}

export default forwardRef(BoxNotification);