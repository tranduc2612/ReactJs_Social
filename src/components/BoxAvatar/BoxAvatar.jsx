import { forwardRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./BoxAvatar.module.scss";
import Box from "~/components/Box/Box";
import images from "~/assets/images/index";

const cx = classNames.bind(styles)


function BoxAvatar(props,ref) {

    return ( <div className={cx("wrapper")} ref={ref}>
        <Box>
            <div className={cx("header")}>
                <div className={cx("header__top")}>
                    
                </div>
                <div className={cx("header__bottom")}>
                    
                </div>
            </div>

            <div className={cx("body")}>
                <div className={cx("list__setting")}>
                    <div className={cx("item__setting")}>
                        <div className={cx("icon")}>
                            <img src={images.icon.three_dot_icon} alt="" />
                        </div>

                        <div className={cx("name")}>
                            Đăng xuất
                        </div>
                    </div>
                </div>
            </div>
        </Box>
</div> );
}

export default forwardRef(BoxAvatar);