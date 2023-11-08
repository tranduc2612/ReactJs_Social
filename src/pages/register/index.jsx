import styles from "./Register.module.scss";
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

const cx = classNames.bind(styles);

function Register({userData}) {
    const navigate = useNavigate();

    useEffect(()=>{
        if(userData.data_user && userData.access_token){
            navigate("/")
        }
    },[userData])

    const handleSubmit = (values, formikHelpers) => {
        let birth = new Date(values.year, values.month - 1, values.day);
        
        if (birth >= (new Date()) ) {
            formikHelpers.setFieldError('day', 'Ngày sinh không hợp lệ');
            formikHelpers.setFieldError('month', ' ');
            formikHelpers.setFieldError('year', ' ');
            return;
        }
        console.log('x',values)
        Post("/register", 
        {
            fullname: values.fullname,
            email: values.email,
            password: values.password,
            username: values.username,
            gender: values.gender ?? "1",
            day_of_birth: birth
        }, 
        null)
        .then((res) => {
            if(checkResponse(res)) {
                toast.success('Đăng ký thành công');
                setTimeout (() => navigate('/login'), 2500 );
            }
            else if (res.status == 400) {
                formikHelpers.setFieldError('email', res.msg);
            }
            else {
                toast.error('Đăng kí tài khoản thất bại');
            }
        })
        .catch((err) => {
            console.log(err);
            toast.error('Cập nhật thất bại');
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
        password: yup.string().required('Hãy nhập mật khẩu')
                     .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Mật khẩu phải bao gồm ít nhất một kí tự số, kí tự viết hoa, kí tự đặc biệt và có độ dài ít nhất 8 kí tự'),
        username: yup.string().required('Hãy nhập tên tài khoản').matches(/^[a-zA-Z0-9_-]+$/, 'Tên tài khoản không được chứa kí tự đặc biệt và dấu cách'),
        fullname: yup.string().required('Hãy nhập tên hiển thị').matches(/^[a-zàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz0-9_·•,;:?!()/ -]+$/i, 'Tên hiển thị không được chứa kí tự đặc biệt'),
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
                            <div className={cx("input_container")}>
                                <InputForm 
                                    type="text"
                                    name = "fullname"
                                    value = {values.fullname}
                                    onChange = {handleChange}
                                    component = "Control"
                                    isInvalid={touched.fullname && !!errors.fullname}
                                    errorMsg = {errors.fullname}
                                    placeholder = "Họ tên"
                                    size="small"
                                />
                            </div>
                            <div className={cx("input_container")}>
                                <InputForm 
                                    type="text"
                                    name = "username"
                                    value = {values.username}
                                    onChange = {handleChange}
                                    component = "Control"
                                    isInvalid={touched.username && !!errors.username}
                                    errorMsg = {errors.username}
                                    placeholder = "Tên tài khoản"
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
                                    placeholder = "Email"
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
                                        {LIST_DAY.map((item) => (
                                            <option key={item.value} value={item.value}>{item.label}</option>
                                        ))}
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
                                        {LIST_MONTH.map((item) => (
                                            <option key={item.value} value={item.value}>{item.label}</option>
                                        ))}
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
                                        {LIST_YEAR.map((item) => (
                                            <option key={item.value} value={item.value}>{item.label}</option>
                                        ))}
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
                                        value = "0"
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
                                        value = "1"
                                        label = "Nam"
                                    />
                                </div>
                                <div className="col lg-4">
                                    <InputForm 
                                        type="radio"
                                        inline
                                        id = "none"
                                        name = "gender"
                                        value = "2"
                                        component = "Check"
                                        label = "Khác"
                                    />
                                </div>
                            </div>
                            
                            <div className={cx("info")}>
                                Những người dùng dịch vụ của chúng tôi có thể đã tải thông tin liên hệ của bạn lên Facebook. <a>Tìm hiểu thêm.</a>
                            </div>
                            <div className={cx("info")}>
                                Bằng cách nhấp vào Đăng ký, bạn đồng ý với Điều khoản, Chính sách quyền riêng tư và Chính sách cookie của chúng tôi. Bạn có thể nhận được thông báo của chúng tôi qua SMS và hủy nhận bất kỳ lúc nào.
                                <div className={cx("forgot_pass")}>
                                    <a href="/login">Bạn đã có tài khoản? Đăng nhập</a>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <Button className={cx("buttonForm")} type="submit">Đăng ký</Button> 
                            </div>
                        </Form>
                        )}               
                    </Formik>
                </div>
            </Box>
            <ToastContainer />
        </div>
    );
}

export default Register;