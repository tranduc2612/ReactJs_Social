import classNames from "classnames/bind";
import { Formik } from 'formik';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';
import images from "~/assets/images/index";
import Box from "~/components/Box/Box";
import InputForm from "~/components/InputForm/InputForm";
import styles from "./Login.module.scss";
import { logIn, logOut } from "~/redux/actions/authActions";
import { useSelector, useDispatch } from 'react-redux'

const cx = classNames.bind(styles);

function Login({ userData }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialValues = {
        login: '',
        password: '',
    }
    const schema = yup.object().shape({
        login: yup.string().required('Hãy nhập tên tài khoản hoặc email'),
        password: yup.string().required('Hãy nhập mật khẩu'),
    });

    const handleSubmit = async (values, formikHelpers) => {
        let res = await dispatch(logIn(values))
        if (res.payload.status == 401) {
            formikHelpers.setFieldError('password', res.payload.msg);
        }
        if (res.payload.status == 402) {
            formikHelpers.setFieldError('login', res.payload.msg);
        }
        if (res.payload.status == 403) {
            formikHelpers.setFieldError('login', ' ');
            formikHelpers.setFieldError('password', res.payload.msg);
        }
        
    }

    const accountItem = () => (
        <div className={cx("account__item")}>
            <a className={cx("account__container")} href="">
                <img src="https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-1/337055147_183576517474930_3019352573966962885_n.jpg?stp=dst-jpg_s480x480&_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=U2-7z962joEAX-KuJQd&_nc_ht=scontent.fhan18-1.fna&oh=00_AfAFX5pmx8MKpnYTeVlfcUCL4l-MmBGhxIdVySMxtdpG8A&oe=6554005B" alt="" />
                <div>Ngọc</div>
            </a>
            <a className={cx("remove_icon")} href="">x</a>
            <span className={cx("number_noti")}>3</span>
        </div>
    );


    return (
        <div className={cx("wrapper")}>
            <div className={cx("row")}>
                <div className={cx("recent", "col-lg-4 offset-lg-2")}>
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
                        {/* {accountItem()} */}

                        {/* add account box */}
                        <div className={cx("account__item")}>
                            <a className={cx("account__container")} href="">
                                <div>
                                    <img className={cx("plus__icon")} src={images.icon.circle_plus_icon} alt="" />
                                </div>
                                <div style={{ color: "#1877f2" }}>Thêm tài khoản</div>
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
                                validationSchema={schema}
                            >
                                {({ handleSubmit, handleChange, values, touched, errors }) => (
                                    <Form noValidate onSubmit={handleSubmit}>
                                        <div className={cx("input_container")}>
                                            <InputForm
                                                type="text"
                                                name="login"
                                                value={values.login}
                                                onChange={handleChange}
                                                component="Control"
                                                isInvalid={touched.login && !!errors.login}
                                                errorMsg={errors.login}
                                                placeholder="Email hoặc tên đăng nhập"
                                            />
                                        </div>

                                        <div className={cx("input_container")}>
                                            <InputForm
                                                type="password"
                                                name="password"
                                                value={values.password}
                                                onChange={handleChange}
                                                component="Control"
                                                isInvalid={touched.password && !!errors.password}
                                                errorMsg={errors.password}
                                                placeholder="Mật khẩu"
                                            />
                                        </div>

                                        <Button className={cx("buttonForm")} type="submit">Đăng nhập</Button>
                                        <div className={cx("forgot_pass")}>
                                            <a href="/forgetpass">Quên mật khẩu?</a>
                                        </div>
                                        <div className={cx("divider")}></div><Button onClick={(e) => { navigate("/register") }} className={cx("buttonForm", "create")}>Tạo tài khoản mới</Button>


                                    </Form>
                                )}
                            </Formik>
                        </Box>
                        <div className={cx("bottom_text")}>
                            <a href="#"> Tạo Trang </a> dành cho người nổi tiếng, thương hiệu hoặc doanh nghiệp. Tài khoản test: admin, password: 123456
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
}

export default Login;