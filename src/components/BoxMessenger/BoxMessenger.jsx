import { forwardRef } from "react";
import classNames from "classnames/bind";
import styles from "./BoxMessenger.module.scss";
import Box from "~/components/Box/Box";
import Button from "~/components/Button/Button";
import images from "~/assets/images/index";
import Input from "~/components/Input/Input";

const cx = classNames.bind(styles)

function BoxMessenger(props,ref) {
    return ( <div className={cx("wrapper")} ref={ref}>
    <Box>
        <div className={cx("messenger")}>
            <div className={cx("header","d-flex align-items-center justify-content-between")}>
                <h2>Chat</h2>
                <Button icon={images.icon.three_dot_icon} size={"sm"} shape="circle"/>
            </div>
            <div className={cx("body")}>
                <div className={cx("search__chat")}>
                    <Input icon={images.icon.search_icon} placeholder={"Tìm kiếm trên Messenger"}/>
                </div>
            </div>
        </div>
    </Box>
</div> );
}

export default forwardRef(BoxMessenger);