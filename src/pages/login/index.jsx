import classNames from "classnames/bind";
import { Formik } from 'formik';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';
import images from "../../assets/images/index";
import Box from "../../components/Box/Box";
import InputForm from "../../components/InputForm/InputForm";
import styles from "./Login.module.scss";

const cx = classNames.bind(styles);

function Login() {
    const [errormsg, setErrormsg] = useState("");
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        password: '',
    }
    const schema = yup.object().shape({
        email: yup.string().required(),
        password: yup.string().required(),
      });

    const handleSubmit = (values, formikHelpers) => {
        console.log(values);
    
    }

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
                <div className="col-lg-4 d-flex justify-content-center">
                    <div className={cx("box_container")}>
                        <Box className={cx("box_form")}>
                            <Formik 
                                initialValues={initialValues} 
                                onSubmit={(values, formikHelpers) => handleSubmit(values, formikHelpers)}
                                validationSchema = {schema}
                            >
                                {({ handleSubmit, handleChange, values, touched, errors }) => (
                                
                                <Form noValidate onSubmit={handleSubmit}>
                                    <div className={cx("input_container")}>
                                        <InputForm 
                                            type="text"
                                            name = "email"
                                            value = {values.email}
                                            onChange = {handleChange}
                                            component = "Control"
                                            isInvalid={touched.email && !!errors.email}
                                            errorMsg = {errors.email}
                                            placeholder = "Email hoặc số điện thoại"
                                        />
                                    </div>
                                    
                                    <div className={cx("input_container")}>
                                        <InputForm 
                                            type="password"
                                            name = "password"
                                            value = {values.password}
                                            onChange = {handleChange}
                                            component = "Control"
                                            isInvalid={touched.password && !!errors.password}
                                            errorMsg = {errors.password}
                                            placeholder = "Mật khẩu"
                                        />
                                    </div>
                                    
                                    <Button className={cx("buttonForm")} type="submit">Đăng nhập</Button> 
                                    <div className={cx("forgot_pass")}>
                                        <a href="">Quên mật khẩu?</a>
                                    </div>
                                    <div className={cx("divider")}></div><Button onClick={(e)=>{navigate("/register")}} className={cx("buttonForm", "create")}>Tạo tài khoản mới</Button> 
                                    
                                    
                                </Form>
                            )}
                                                        
                            </Formik>
                        </Box>
                        <div className={cx("bottom_text")}>
                            <a href="#"> Tạo Trang </a> dành cho người nổi tiếng, thương hiệu hoặc doanh nghiệp.
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        
    );
}

export default Login;