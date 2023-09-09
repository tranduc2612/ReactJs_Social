import classNames from "classnames/bind";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import styles from "./ModalPost.module.scss";
import Button from "~/components/Button/Button"
import images from "~/assets/images/index";
import { useMemo, useState } from "react";

const cx = classNames.bind(styles);

const PRIVACY_OPTIONS = [
    {
        name: "PU",
        value: "Công khai",
        url: images.icon.public_icon
    },
    {
        name: "FR",
        value: "Bạn bè",
        url: images.icon.friend_icon
    },{
        name: "PR",
        value: "Riêng tư",
        url: images.icon.private_icon
    },
]

function ModalPost({setModalShow}) {
    const [privacyOptions,setPrivacyOptions] = useState(PRIVACY_OPTIONS);
    const [content,setContent] = useState("");
    const [dataPost, setDataPost] = useState({
        privacy: "PU",
        content: null,
        user_id: null,
        url: images.icon.public_icon
    })

    const myMap = useMemo(()=>{
        const mp = new Map();
        PRIVACY_OPTIONS.forEach(item =>{
            mp.set(item.name,item.value);
        })
        return mp
    },[]);

    const handleGetValueContent = (e)=>{
        const contentValue = e.target.textContent;
        setContent(contentValue);
        setDataPost({
            ...dataPost,
            content: contentValue
        })
    }

    const handleSelectPrivacy = (key,event) =>{
        const name = key.split(',')[0];
        const url = key.split(',')[1];
        setDataPost(
            (prev)=>{
                return (
                    {
                        ...prev,
                        privacy: name,
                        url: url
                    }
                )
            }
        )
    }

    const handleSubmit = (e)=>{
        if(content.length > 0){
            window.alert(`Đăng bài thành công ! chệ dộ bài viết: ${dataPost.privacy}, content: ${dataPost.content}` )
        }
    }

    return ( <div className={cx("modal_post")}>
        <div className={cx("header")}>
            <span>Tạo bài viết</span>
            <Button className={cx("close_btn")} shape="circle" size={"sm"} icon={images.icon.cross_icon} onClick={()=>setModalShow(false)} />
        </div>
        <div className={cx("body")}>
            <div className={cx("info")}>
                <div className={cx("avatar")}>
                    <Button shape="circle" size={"xl"} full_icon={true} icon={images.icon.avatar_demo} />
                </div>
                <div className={cx("wrapper")}>
                    <div className={cx("name_author")}>
                        <span>Trần Minh Đức</span>
                    </div>
                    <div className={cx("privacy_post")}>
                        <div className={cx("icon_left_dropdown")}>
                            <img src={dataPost.url} />
                        </div>
                        <DropdownButton className={cx("btn_dropdown")} id="dropdown-basic-button" title={myMap.get(dataPost.privacy) || "Quyền bài viết"} onSelect={handleSelectPrivacy}>
                            {privacyOptions.map(option => {
                                return(
                                    <Dropdown.Item key={option.name} eventKey={[option.name,option.url]}><span className={cx("option_item")} url={option.url} name={option.name} value={option.value}>
                                            <img className={cx("option_icon")} src={option.url} />
                                            {option.value}
                                        </span></Dropdown.Item>
                                )
                            })}
                        </DropdownButton>
                    </div>
                </div>
            </div>

            <div className={cx("content__wrapper")}>
                <div className={cx("content")} contentEditable="true" data-placeholder="Đức ơi, bạn đang nghĩ gì thế?" onInput={handleGetValueContent}>
                
                </div>
            </div>

            
        </div>

        <div className={cx("footer")}>
            <div className={cx("box__tools")}>
                <span>Thêm vào bài viết của bạn</span>
                <div className={cx("tools")}>
                    <Button className={cx("btn__tool")} icon={images.icon.add_image_post} shape="circle" size="sm" />
                    <Button className={cx("btn__tool")} icon={images.icon.add_camera_post} shape="circle" size="sm" />
                    <Button className={cx("btn__tool")} icon={images.icon.add_icon_post} shape="circle" size="sm" />

                </div>
            </div>

            <div className={cx("btn__post-wrapper")}>
                <Button className={cx("btn__post",{
                    active: content.length > 0
                })}
                onClick={handleSubmit}>Đăng</Button>
            </div>
        </div>
    </div> );
}

export default ModalPost;