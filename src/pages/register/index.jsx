import styles from "./Register.module.scss";
import classNames from "classnames/bind";
import Box from "~/components/Box/Box";
import { Formik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';
import images from "~/assets/images/index";
import InputForm from "~/components/InputForm/InputForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const cx = classNames.bind(styles);

function Register({userData}) {
    const navigate = useNavigate();

    useEffect(()=>{
        if(userData.data_user && userData.access_token){
            navigate("/")
        }
    },[userData])

    const initialValues = {
        email: '',
        password: '',
    }
    const schema = yup.object().shape({
        email: yup.string().required(),
        password: yup.string().required(),
    });

    if(userData.data_user && userData.access_token){
        return
    }
    return (
        <div className={cx("wrapper")}>
            <Box className={cx("box_form")}>
                <div className={cx("header")}>
                    <div className={cx("title")}>Đăng ký</div>
                    <div className={cx("descrip")}>Nhanh chóng và dễ dàng.</div>
                </div>
                <div className={cx("body")}>
                    <Formik 
                        initialValues={initialValues} 
                        onSubmit={(values, formikHelpers) => handleSubmit(values, formikHelpers)}
                        validationSchema = {schema}
                    >
                        {({ handleSubmit, handleChange, values, touched, errors }) => (
                        
                        <Form noValidate onSubmit={handleSubmit}>
                            {/* <div className="row">
                                <div className="col lg-6">
                                    <InputForm 
                                        type="text"
                                        name = "email"
                                        value = {values.email}
                                        onChange = {handleChange}
                                        component = "Control"
                                        isInvalid={touched.email && !!errors.email}
                                        errorMsg = {errors.email}
                                        placeholder = "Email hoặc số điện thoại"
                                        size = "small"
                                    />
                                </div>
                                <div className="col lg-6">
                                    <InputForm 
                                        type="text"
                                        name = "email"
                                        value = {values.email}
                                        onChange = {handleChange}
                                        component = "Control"
                                        isInvalid={touched.email && !!errors.email}
                                        errorMsg = {errors.email}
                                        placeholder = "Email hoặc số điện thoại"
                                        size = "small"
                                    />
                                </div>
                            </div> */}
                            <div className={cx("input_container")}>
                                <InputForm 
                                    type="text"
                                    name = "name"
                                    value = {values.name}
                                    onChange = {handleChange}
                                    component = "Control"
                                    isInvalid={touched.name && !!errors.name}
                                    errorMsg = {errors.name}
                                    placeholder = "Họ tên"
                                    size="small"
                                />
                            </div>
                            <div className={cx("input_container")}>
                                <InputForm 
                                    type="text"
                                    name = "email"
                                    value = {values.email}
                                    onChange = {handleChange}
                                    component = "Control"
                                    isInvalid={touched.email && !!errors.email}
                                    errorMsg = {errors.email}
                                    placeholder = "Số di động hoặc email"
                                    size="small"
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
                                    placeholder = "Mật khẩu mới"
                                    size="small"
                                />
                            </div>

                            <div className={cx("title")}>Ngày sinh</div>
                            <div className={cx("input_container", "row")}>
                                <div className="col lg-4">
                                    <InputForm 
                                        name = "day"
                                        value = {values.day}
                                        onChange = {handleChange}
                                        component = "Select"
                                        isInvalid={touched.day && !!errors.day}
                                        errorMsg = {errors.day}
                                        size="small"
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </InputForm>
                                </div>
                                <div className="col lg-4">
                                    <InputForm 
                                        name = "month"
                                        value = {values.month}
                                        onChange = {handleChange}
                                        component = "Select"
                                        isInvalid={touched.month && !!errors.month}
                                        errorMsg = {errors.month}
                                        size="small"
                                    >
                                        <option value="1">Tháng 1</option>
                                        <option value="2">Tháng 2</option>
                                        <option value="3">Tháng 3</option>
                                    </InputForm>
                                </div>
                                <div className="col lg-4">
                                    <InputForm 
                                        name = "year"
                                        value = {values.year}
                                        onChange = {handleChange}
                                        component = "Select"
                                        isInvalid={touched.year && !!errors.year}
                                        errorMsg = {errors.year}
                                        size="small"
                                    >
                                        <option value="1">2021</option>
                                        <option value="2">2022</option>
                                        <option value="3">2023</option>
                                    </InputForm>
                                </div>
                            </div>

                            <div className={cx("title")}>Giới tính</div>
                            <div className={cx("input_container", "row")}>
                                <div className="col lg-4">
                                    <InputForm 
                                        type="radio"
                                        inline
                                        name = "gender"
                                        component = "Check"
                                        id = "female"
                                        label = "Nữ"
                                        feedback="You must agree before submitting."
                                        feedbackType="invalid"
                                    />
                                </div>
                                <div className="col lg-4">
                                    <InputForm 
                                        type="radio"
                                        inline
                                        name = "gender"
                                        component = "Check"
                                        id = "male"
                                        label = "Nam"
                                    />
                                </div>
                                <div className="col lg-4">
                                    <InputForm 
                                        type="radio"
                                        inline
                                        id = "none"
                                        name = "gender"
                                        component = "Check"
                                        label = "Tùy chỉnh"
                                    />
                                </div>
                            </div>
                            
                            <div className={cx("info")}>
                                Những người dùng dịch vụ của chúng tôi có thể đã tải thông tin liên hệ của bạn lên Facebook. <a>Tìm hiểu thêm.</a>
                            </div>
                            <div className={cx("info")}>
                                Bằng cách nhấp vào Đăng ký, bạn đồng ý với Điều khoản, Chính sách quyền riêng tư và Chính sách cookie của chúng tôi. Bạn có thể nhận được thông báo của chúng tôi qua SMS và hủy nhận bất kỳ lúc nào.
                            </div>
                            <div className="d-flex justify-content-center">
                                <Button className={cx("buttonForm")} type="submit">Đăng ký</Button> 
                            </div>
                        </Form>
                        )}               
                    </Formik>
                </div>
            </Box>
        </div>
    );
}

export default Register;