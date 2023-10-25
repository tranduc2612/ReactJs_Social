import classNames from "classnames/bind";
import styles from "./BoxNotification.module.scss";
import Box from "~/components/Box/Box"
import Button from "~/components/Button/Button"
import images from "~/assets/images/index";
import { forwardRef, useEffect, useState } from "react";
import NotiItem from "./component/NotiItem";
import Loading from "../Loading/Loading";
const cx = classNames.bind(styles)

function BoxNotification(props, ref) {
    const { data, loading } = props;
    const [filterNotify, setFilterNotify] = useState(false);
    const [message, setMessage] = useState("")
    const handleBtnFilter = (e) => {
        setFilterNotify(!filterNotify)
    }

    return (<div className={cx("wrapper")} ref={ref}>
        {/* <input onChange={(e) => setMessage(e.target.value)}>{message}</input> */}
        <Box>
            <div className={cx("notify")}>
                <div className={cx("header", "d-flex")}>
                    <h2>Thông báo</h2>
                    <div className={cx("btn__header")}>
                        <Button icon={images.icon.three_dot_icon} size={"sm"} shape="circle">
                            
                        </Button>
                    </div>
                </div>
                <div className={cx("body")}>
                    <div className={cx("filter")}>
                        <button className={cx("button__filter", {
                            active: !filterNotify
                        })} onClick={handleBtnFilter}><span value={"all"}>Tất cả</span></button>
                        <button className={cx("button__filter", {
                            active: filterNotify
                        })} onClick={handleBtnFilter}><span value={"unread"}>Chưa được</span></button>
                    </div>
                    <div className={cx("title")}>
                        Mới
                    </div>
                    <ul className={cx("list")}>
                        {data?.lstData.map(noti => {
                            return (
                                <NotiItem key={noti?.noti_id} data={noti} />
                            )
                        })}
                    </ul>
                </div>
            </div>
            {data?.loading && <div className="d-flex justify-content-center mt-3">
                <Loading />
            </div>}
        </Box>
    </div>);
}

export default forwardRef(BoxNotification);