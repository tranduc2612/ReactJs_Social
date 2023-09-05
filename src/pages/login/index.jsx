import styles from "./Login.module.scss"
import classNames from "classnames/bind";
import images from "~/assets/images/index";
import Box from "~/components/Box/Box";

const cx = classNames.bind(styles);

function Login() {

    const accountItem = () => (
        <div className={cx("account__item")}>
            <a className={cx("account__container")} href="">
                <img src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/337055147_183576517474930_3019352573966962885_n.jpg?stp=dst-jpg_s480x480&_nc_cat=101&ccb=1-7&_nc_sid=5fac6f&_nc_ohc=5z2x-mjnMeMAX-_SGQ0&_nc_ht=scontent.fsgn2-4.fna&oh=00_AfAvLVrLTN0r0a4is_GWX5PRr5nR_fiNqpCfg4__SSizgQ&oe=64FB031B" alt="" />
                <div>Ngọc</div>
            </a>
            <a className={cx("remove_icon")} href="">x</a>
            <span className={cx("number_noti")}>3</span>
        </div>
    );

    return ( 
        <div className={cx("wrapper")}>
            <div className={cx("row")}>
                <div className={cx("recent","col-lg-4 offset-lg-2")}>
                    <div className={cx("logo__container")}>
                        <img className={cx("logo__img")} src={images.logo.logo_fulllname} alt="" />
                    </div>
                    <div className={cx("title")}>
                        Đăng nhập gần đây
                    </div>
                    <div className={cx("descrip")}>
                        Nhấp vào ảnh của bạn hoặc thêm tài khoản.
                    </div>
                    <div className="account">
                        {accountItem()}

                        {/* add account box */}
                        <div className={cx("account__item")}>
                            <a className={cx("account__container")} href="">
                                <div> 
                                    <img className={cx("plus__icon")} src={images.icon.circle_plus_icon} alt="" />
                                </div>
                                <div style={{color: "#1877f2"}}>Thêm tài khoản</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className={cx("box_form","col-lg-3")}>
                    <Box>
                        sadfbgbfdsa
                    </Box>
                </div>
            </div>
        </div>
        
    );
}

export default Login;