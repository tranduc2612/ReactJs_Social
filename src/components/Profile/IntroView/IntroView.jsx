import styles from "./IntroView.module.scss"
import classNames from "classnames/bind";
import Box from "~/components/Box/Box";
import { useState } from "react";
import images from "~/assets/images/index";
import Button from "~/components/Button/Button";
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';
import InputForm from "~/components/InputForm/InputForm";

const cx = classNames.bind(styles);


function IntroView({user}) {
    

    const overView = () => {
        const [isEdit, setIsEdit] = useState(false);

        const handleSubmit = (values, formikHelpers) => {
            console.log(values);
            setIsEdit(false)
        }

        // const schema = yup.object().shape({
        //     email: yup.string().required(),
        //     password: yup.string().required(),
        // });

        return (
        <div className={cx("overview")}>
            {isEdit ? (
                <div className={cx("edit")}>
                    
                    <Formik
                        initialValues={user} 
                        onSubmit={(values, formikHelpers) => handleSubmit(values, formikHelpers)}
                        // validationSchema = {schema}
                    >
                        {({ handleSubmit, handleChange, values, touched, errors }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                {/* Button edit */}
                                <div className={cx("btn_topright")}>
                                    <Button type="submit" className={cx("message")} icon={images.icon.pen_icon} size={"text_icon"} >
                                        Lưu thay đổi
                                    </Button>
                                </div>

                                <div className={cx("title_item")}>Mô tả</div>
                                <div className={cx("input_container")}>
                                    <InputForm
                                        type = "text"
                                        name = "aboutMe"
                                        value = {values.aboutMe}
                                        onChange = {handleChange}
                                        component = "Control"
                                        isInvalid={touched.aboutMe && !!errors.aboutMe}
                                        errorMsg = {errors.aboutMe}
                                        placeholder = "Nhập mô tả về bạn"
                                    />
                                </div>

                                <div className={cx("title_item")}>Địa chỉ</div>
                                <div className={cx("input_container")}>
                                    <InputForm 
                                        name = "address"
                                        value = {values.address}
                                        onChange = {handleChange}
                                        component = "Control"
                                        isInvalid={touched.address && !!errors.address}
                                        errorMsg = {errors.address}
                                        placeholder = "Nhập địa chỉ"
                                    />
                                </div>

                                <div className={cx("title_item")}>Ngày sinh</div>
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

                                <div className={cx("title_item")}>Giới tính</div>
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
                                <div className={cx("row")}>
                                    <div className="col lg-6">
                                        <div className={cx("title_item")}>Số điện thoại</div>
                                        <div className={cx("input_container")}>
                                            <InputForm 
                                                name = "phone"
                                                value = {values.phone}
                                                onChange = {handleChange}
                                                component = "Control"
                                                isInvalid={touched.phone && !!errors.phone}
                                                errorMsg = {errors.phone}
                                                placeholder = "Nhập số điện thoại"
                                            />
                                        </div>
                                    </div>
                                    <div className="col lg-6">
                                        <div className={cx("title_item")}>Email</div>
                                        <div className={cx("input_container")}>
                                            <InputForm 
                                                name = "email"
                                                value = {values.email}
                                                onChange = {handleChange}
                                                component = "Control"
                                                isInvalid={touched.email && !!errors.email}
                                                errorMsg = {errors.email}
                                                placeholder = "Nhập email"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </Form>
                        )}
                    </Formik>
                    
                    
                </div>
            ) : (
                <div className={cx("view")}>
                    {/* Button edit */}
                    <div className={cx("btn_topright")}>
                        <Button type="button" className={cx("update")} icon={images.icon.pen_icon} size={"text_icon"} onClick={() => {setIsEdit(true)}} >
                            Chỉnh sửa
                        </Button>
                    </div>
                    
                    {/* about me */}
                    <div className={cx("title_item")}>Mô tả</div>
                    {!user.aboutMe ? null : 
                        <div className={cx("aboutme")}>
                            {user.aboutMe}
                        </div>
                    }
                    <div className={cx("title_item")}>Tổng quan</div>
                    {/* Địa chỉ */}
                    <div className={cx("info_item")}>
                        <div className={cx("icon")}>
                            <img src={images.icon.address_icon} alt="" />
                        </div>
                        <div className={cx("content")}>
                            Đến từ <span className={cx("content_bold")}>{user.address}</span>
                        </div>
                    </div>
                    {/* Giới tính */}
                    <div className={cx("info_item")}>
                        <div className={cx("icon")}>
                            {user.gender == "MALE" ? <img src={images.icon.gender_male_icon} alt="" /> : <img src={images.icon.gender_female_icon} alt="" />}
                        </div>
                        <div className={cx("content")}>
                            {user.gender == "MALE" ? "Nam" : "Nữ"}
                        </div>
                    </div>
                    {/* Ngày tạo tài khoản */}
                    <div className={cx("info_item")}>
                        <div className={cx("icon")}>
                            <img src={images.icon.clock_icon} alt="" />
                        </div>
                        <div className={cx("content")}>
                            Tham gia từ 5/2016
                        </div>
                    </div>
                    {/* Ngày sinh */}
                    <div className={cx("info_item")}>
                        <div className={cx("icon")}>
                            <img src={images.icon.cake_icon} alt="" />
                        </div>
                        <div className={cx("content")}>
                            Sinh ngày 05/10/2002
                        </div>
                    </div>
                    <div className={cx("title_item")}>Thông tin liên hệ</div>
                    <div className={cx("info_item")}>
                        <div className={cx("icon")}>
                            <img src={images.icon.phone_icon} alt="" />
                        </div>
                        <div className={cx("content")}>
                            {user.phone}
                        </div>
                    </div>
                    <div className={cx("info_item")}>
                        <div className={cx("icon")}>
                            <img src={images.icon.mail_icon} alt="" />
                        </div>
                        <div className={cx("content")}>
                            {user.email}
                        </div>
                    </div>
                </div>
            )}
        </div>
        )
    }

    const settingView =() => {
        const handleSubmit = (values, formikHelpers) => {
            console.log(values);
        }

        return (
            <div className={cx("setting")}>
                <Formik
                    initialValues={{
                        old_pass: "",
                        new_pass: "",
                        re_pass: ""
                    }} 
                    onSubmit={(values, formikHelpers) => handleSubmit(values, formikHelpers)}
                    // validationSchema = {schema}
                >
                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            {/* Button edit */}
                            <div className={cx("btn_topright")}>
                                <Button type="submit" className={cx("message")} icon={images.icon.pen_icon} size={"text_icon"} >
                                    Lưu thay đổi
                                </Button>
                            </div>

                            <div className={cx("title_item")}>Nhập mật khẩu cũ</div>
                            <div className={cx("input_container")}>
                                <InputForm
                                    type = "text"
                                    name = "old_pass"
                                    value = {values.old_pass}
                                    onChange = {handleChange}
                                    component = "Control"
                                    isInvalid={touched.old_pass && !!errors.old_pass}
                                    errorMsg = {errors.old_pass}
                                    placeholder = "Mật khẩu cũ"
                                />
                            </div>

                            <div className={cx("title_item")}>Mật khẩu mới</div>
                            <div className={cx("input_container")}>
                                <InputForm 
                                    name = "new_pass"
                                    value = {values.new_pass}
                                    onChange = {handleChange}
                                    component = "Control"
                                    isInvalid={touched.new_pass && !!errors.new_pass}
                                    errorMsg = {errors.new_pass}
                                    placeholder = "Nhập mật khẩu mới"
                                />
                            </div>
                            <div className={cx("title_item")}>Mật lại khẩu mới</div>
                            <div className={cx("input_container")}>
                                <InputForm 
                                    name = "re_pass"
                                    value = {values.re_pass}
                                    onChange = {handleChange}
                                    component = "Control"
                                    isInvalid={touched.re_pass && !!errors.re_pass}
                                    errorMsg = {errors.re_pass}
                                    placeholder = "Nhập lại mật khẩu mới"
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        )
    }

    const inComming =() => {
        return (
            <div className={cx("title_item")}>Tính năng đang được phát triển</div>
        )
    }

    const LIST_SIDEBAR = [
        {
            id: "OVERVIEW",
            title: "Tổng quan",
            component: overView
        },
        {
            id: "SETTING",
            title: "Bảo mật & quyền riêng tư",
            component: settingView,
        },
        {
            id: "RELATION",
            title: "Thông tin bổ sung",
            component: inComming,
        },
    ]
    
    const [content, setContent] = useState(LIST_SIDEBAR[0]);

    return (
        <div className={cx("container")}>
            <Box className={cx("box_container")}> 
                <div className={cx("left_nav")}>
                    <div className={cx("title")}>
                        <h2>Giới thiệu</h2>
                    </div>
                    {
                        LIST_SIDEBAR.map((sidebar) => {
                            return (
                                <div key={sidebar.id} className={cx("item", sidebar.id == content.id ? "active" : "")} onClick={() => setContent(sidebar)}>
                                    <div className={cx("item_content")}>{sidebar.title}</div>
                                </div>
                            )
                        })
                    }
                    
                </div>
                <div className={cx("right_content")}>
                    <content.component />
                </div>
                
            </Box>
        </div>
    );
}

export default IntroView;