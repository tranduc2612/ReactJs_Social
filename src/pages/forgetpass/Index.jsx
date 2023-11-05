import styles from "./Forgetpass.module.scss";
import classNames from "classnames/bind";
import Box from "~/components/Box/Box";
import { Formik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';
import images from "~/assets/images/index";
import InputForm from "~/components/InputForm/InputForm";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { LIST_DAY, LIST_MONTH, LIST_YEAR } from "~/utils/constant";
import { Post } from "~/services/base";
import checkResponse from "~/utils/checkResponse";
import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react";

const cx = classNames.bind(styles);

function ForgetPassword({ userData }) {

    const navigate = useNavigate();
    const [sendSMS, setSendSMS] = useState(false);

    useEffect(() => {
        if (userData.data_user && userData.access_token) {
            navigate("/")
        }
    }, [userData])

    const handleSubmit = (values, formikHelpers) => {

        Post("/reset-password",
            {
                email: values.email,
            },
            null)
            .then((res) => {
                if (checkResponse(res)) {
                    console.log(res);
                    setSendSMS(true)
                } else {
                    formikHelpers.setFieldError('email', res.msg);
                    setSendSMS(false)
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error('Gửi thất bại');
            })
    }

    const initialValues = {
        fullname: '',
        email: '',
        password: '',
        username: ''
    }
    const schema = yup.object().shape({
        email: yup.string().required('Hãy nhập Email của bạn').email('Email không hợp lệ'),
    });

    if (userData.data_user && userData.access_token) {
        return
    }

    return (
        <div className={cx("wrapper")}>
            <Box className={cx("box_form")}>
                <div className={cx("header")}>
                    <div className={cx("title")}>Quên mật khẩu</div>
                    {/* <div className={cx("descrip")}>Nhanh chóng và dễ dàng.</div> */}
                </div>
                <div className={cx("body")}>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values, formikHelpers) => handleSubmit(values, formikHelpers)}
                        validationSchema={schema}
                    >
                        {({ handleSubmit, handleChange, values, touched, errors }) => (

                            <Form noValidate onSubmit={handleSubmit}>
                                {/* <div className={cx("input_container")}>
                                    <InputForm
                                        type="text"
                                        name="username"
                                        value={values.username}
                                        onChange={handleChange}
                                        component="Control"
                                        isInvalid={touched.username && !!errors.username}
                                        errorMsg={errors.username}
                                        placeholder="Tên tài khoản"
                                        size="small"
                                    />
                                </div> */}
                                <div className={cx("input_container")}>
                                    <InputForm
                                        type="text"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        component="Control"
                                        isInvalid={touched.email && !!errors.email}
                                        errorMsg={errors.email}
                                        placeholder="Email"
                                        size="small"
                                    />
                                </div>
                                {
                                    sendSMS && <div className={cx("info")}>
                                        Chúng tôi đã gửi mật khẩu mới vào email của bạn ! Nếu đã nhận được bạn vui lòng bấm <a href="/login">Đăng nhập</a> để quay lại trang đăng nhập !
                                    </div>
                                }

                                <div className="d-flex justify-content-center">
                                    <Button className={cx("buttonForm")} type="submit">{sendSMS ? "Gửi lại yêu cầu" : "Gửi yêu cầu"}</Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Box>
        </div>
    );
}

export default ForgetPassword;