import classNames from "classnames/bind";
import styles from "./BoxNotification.module.scss";
import Pusher from "pusher-js";
import Box from "~/components/Box/Box"
import Button from "~/components/Button/Button"
import images from "~/assets/images/index";
import { forwardRef, useEffect, useState } from "react";
import NotiItem from "./component/NotiItem";

const cx = classNames.bind(styles)

function BoxNotification(props, ref) {

    const [filterNotify, setFilterNotify] = useState(false);
    const [noti, setNoti] = useState([]);
    const [message, setMessage] = useState("")
    useEffect(() => {
        const pusher = new Pusher('83b6c124825dc255f114', {
            cluster: 'ap1'
        })

        // Đăng ký kênh bạn muốn lắng nghe
        const channel = pusher.subscribe("chat");

        // Lắng nghe sự kiện từ kênh
        channel.bind("message", (data) => {
            console.log("Received a new post event:", data);
            // Xử lý thông báo realtime ở đây
        });
    }, [])

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
    </div>);
}

export default forwardRef(BoxNotification);