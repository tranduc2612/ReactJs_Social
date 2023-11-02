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
import { LIST_DAY, LIST_MONTH, LIST_YEAR } from "~/utils/constant";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Post } from "~/services/base";
import checkResponse from "~/utils/checkResponse";

const cx = classNames.bind(styles);

function IntroView({ userData, userProfileData }) {
    

    const overView = () => {
        const [isEdit, setIsEdit] = useState(false);

        const handleSubmit = (values, formikHelpers) => {
            console.log('valuesssss',values);

            Post("/action/update-profile", 
            {
                fullname: values.fullname,
                location: values.location,
                phone: values.phone,
                about_me: values.about_me,
                // gender: values.gender,
                // day_of_birth: new Date(values.day, values.month, values.year)
            }, 
            userData?.access_token)
            .then((res) => {
                console.log('xx', checkResponse(res));
                if(checkResponse(res)) {
                    console.log('update', res)
                    let chat_id = res?.returnObj;
                    setChatId(chat_id);
                    toast.success('Cập nhật thông tin thành công');
                }
                else  toast.error('Cập nhật thất bại');
            })
            .catch((err) => {
                console.log(err);
                toast.error('Cập nhật thất bại');
            })

            setIsEdit(false)
        }

        // const schema = yup.object().shape({
        //     email: yup.string().required(),
        //     password: yup.string().required(),
        // });
        
        return (
        <div className={cx("overview")}>
            {isEdit && userData.data_user.username == userProfileData?.username ? (
                <div className={cx("edit")}>
                    
                    <Formik
                        initialValues={{
                            ...userProfileData,
                            day: userProfileData == null ? '' : new Date(userProfileData?.day_of_birth).getDate(),
                            month: userProfileData == null ? '' : new Date(userProfileData?.day_of_birth).getMonth() + 1,
                            yeah: userProfileData == null ? '' : new Date(userProfileData?.day_of_birth).getFullYear(),
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

                                <div className={cx("title_item")}>Mô tả</div>
                                <div className={cx("input_container")}>
                                    <InputForm
                                        type = "text"
                                        name = "about_me"
                                        value = {values.about_me}
                                        onChange = {handleChange}
                                        component = "Control"
                                        isInvalid={touched.about_me && !!errors.about_me}
                                        errorMsg = {errors.about_me}
                                        placeholder = "Nhập mô tả về bạn"
                                    />
                                </div>

                                <div className={cx("title_item")}>Địa chỉ</div>
                                <div className={cx("input_container")}>
                                    <InputForm 
                                        name = "location"
                                        value = {values.location}
                                        onChange = {handleChange}
                                        component = "Control"
                                        isInvalid={touched.location && !!errors.location}
                                        errorMsg = {errors.location}
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
                                            // checked = {values.gender == '0'}
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
                                            // checked = {values.gender == '1'}
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
                                        // checked = {values.gender == '2'}
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
                                                disabled
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
                    {userData.data_user.username != userProfileData.username ? null : 
                        <div className={cx("btn_topright")}>
                            <Button type="button" className={cx("update")} icon={images.icon.pen_icon} size={"text_icon"} onClick={() => {setIsEdit(true)}} >
                                Chỉnh sửa
                            </Button>
                        </div>
                    }
                    
                    {/* about me */}
                    <div className={cx("title_item")}>Mô tả</div>
                    {!userProfileData.about_me ? null : 
                        <div className={cx("aboutme")}>
                            {userProfileData.about_me}
                        </div>
                    }
                    <div className={cx("title_item")}>Tổng quan</div>
                    {/* Địa chỉ */}
                    <div className={cx("info_item")}>
                        <div className={cx("icon")}>
                            <img src={images.icon.address_icon} alt="" />
                        </div>
                        <div className={cx("content")}>
                            Đến từ <span className={cx("content_bold")}>{userProfileData.location}</span>
                        </div>
                    </div>
                    {/* Giới tính */}
                    <div className={cx("info_item")}>
                        <div className={cx("icon")}>
                            {userProfileData.gender == "1" ? <img src={images.icon.gender_male_icon} alt="" /> : <img src={images.icon.gender_female_icon} alt="" />}
                        </div>
                        <div className={cx("content")}>
                            {userProfileData.gender == "1" ? "Nam" : "Nữ"}
                        </div>
                    </div>
                    {/* Ngày tạo tài khoản */}
                    <div className={cx("info_item")}>
                        <div className={cx("icon")}>
                            <img src={images.icon.clock_icon} alt="" />
                        </div>
                        <div className={cx("content")}>
                            Tham gia từ {(new Date(userProfileData?.created_at)).getMonth() + 1 + '/' + (new Date(userProfileData?.created_at)).getFullYear()}
                        </div>
                    </div>
                    {/* Ngày sinh */}
                    <div className={cx("info_item")}>
                        <div className={cx("icon")}>
                            <img src={images.icon.cake_icon} alt="" />
                        </div>
                        <div className={cx("content")}>
                            Sinh ngày {(new Date(userProfileData?.day_of_birth)).getDate() + '/' + ((new Date(userProfileData?.day_of_birth)).getMonth() + 1) + '/' + (new Date(userProfileData?.day_of_birth)).getFullYear()}
                        </div>
                    </div>
                    <div className={cx("title_item")}>Thông tin liên hệ</div>
                    <div className={cx("info_item")}>
                        <div className={cx("icon")}>
                            <img src={images.icon.phone_icon} alt="" />
                        </div>
                        <div className={cx("content")}>
                            {userProfileData?.phone}
                        </div>
                    </div>
                    <div className={cx("info_item")}>
                        <div className={cx("icon")}>
                            <img src={images.icon.mail_icon} alt="" />
                        </div>
                        <div className={cx("content")}>
                            {userProfileData?.email}
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