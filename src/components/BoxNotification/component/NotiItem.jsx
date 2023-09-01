import classNames from "classnames/bind";
import styles from "./NotiItem.module.scss";
import images from "~/assets/images/index";
import Button from 'react-bootstrap/Button';
import ButtonCustom from "~/components/Button/Button";
const cx = classNames.bind(styles)

// 0px -2310px -> video
// 0px -990px -> comment
// 30px 2370px -> group
// 0px -1140px -> user

function NotiItem() {
    return ( <div className={cx("item")}>
        <div className={cx("head")}>
            <ButtonCustom shape="circle" size="xxl" full_icon={true} icon={"https://scontent.fhan17-1.fna.fbcdn.net/v/t1.6435-1/169976456_307817477370018_4461305293324667115_n.jpg?stp=dst-jpg_p130x130&_nc_cat=109&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=UJ1mXEtwIwMAX-27wKk&_nc_ht=scontent.fhan17-1.fna&oh=00_AfD5ToYpfbsArzyTVSDkUQZsg3iL5-M1YvQdy40QU6oZqA&oe=65175F37"} />
            <i className={cx("sub_icon")} style={{backgroundImage: `url("${images.icon.list_icon}")`,backgroundPosition: "0px -2310px",zIndex:"999"}}></i>
        </div>
        <div className={cx("body","fw-normal")}>
            <div className={cx("content")}>
                <span className={cx("author","fw-bold")}>Tuấn Tiền Tỉ</span> đã gửi lời mời kết bạn kết bạn                
            </div>
            <div className={cx("time")}>
                Khoảng 1 phút trước
            </div>
            <div className={cx("co_friend")}>
                43 bạn chung
            </div>
            <div className={cx("add_friend_btn")}>
                <Button className={cx("custom__btn","accept")} variant="primary"><span>Xác nhận</span></Button>
                <ButtonCustom className={cx("custom__btn","deny")}><span>Xóa</span></ButtonCustom>
            </div>
            {/* <div>
                đã chấp nhận lời mời kết bạn
            </div> */}
        </div>
    </div> );
}

export default NotiItem;