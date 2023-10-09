import classNames from "classnames/bind";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropzone, { useDropzone } from 'react-dropzone'
import { useMemo, useState, useCallback, useRef, useEffect } from "react";
import Tippy from '@tippyjs/react/headless'; // import headless sẽ mất hiệu ứng hover tồn tại

import styles from "./ModalPost.module.scss";
import Button from "~/components/Button/Button"
import images from "~/assets/images/index";
import BoxIcon from "~/components/BoxIcon/BoxIcon";

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
    }, {
        name: "PR",
        value: "Riêng tư",
        url: images.icon.private_icon
    },
]

function ModalPost({ setModalShow }) {
    const [privacyOptions, setPrivacyOptions] = useState(PRIVACY_OPTIONS);
    const [contentEditable, setContentEditable] = useState("");
    const contentEditableRef = useRef(null);
    const [posCursorEditable, setPosCursorEditable] = useState(0);

    const [fileImg, setFileImg] = useState([]);
    const [showBoxIcon, setShowBoxIcon] = useState(false);

    const [dataPost, setDataPost] = useState({
        privacy: "PU",
        content: null,
        user_id: null,
        url: images.icon.public_icon
    })

    const myMap = useMemo(() => {
        const mp = new Map();
        PRIVACY_OPTIONS.forEach(item => {
            mp.set(item.name, item.value);
        })
        return mp
    }, []);

    const onDrop = useCallback(files => {
        setFileImg(files)
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    // đăng bài
    const handleGetValueContent = (e) => {
        const contentValue = e.target.innerText;
        setContentEditable(contentValue);
        setDataPost({
            ...dataPost,
            content: contentValue
        })
        const selectionEnd = window.getSelection().getRangeAt(0).endOffset;
        console.log("Vị trí con trỏ kết thúc tại: ", selectionEnd);
        setPosCursorEditable(selectionEnd)
    }

    const handleSelectIcon = (e) => {
        const iconStr = e.target.innerText;

        const newStr = contentEditable.substring(0, posCursorEditable) + iconStr + contentEditable.substring(posCursorEditable);
        contentEditableRef.current.innerText = newStr;
        setPosCursorEditable(posCursorEditable + 2)
        setContentEditable(newStr);
        setDataPost({
            ...dataPost,
            content: newStr
        })
    }

    const handleGetPosCursorContentEditable = (e) => {
        const selectionStart = window.getSelection().getRangeAt(0).startOffset;
        console.log("Vị trí con trỏ bắt đầu tại: ", selectionStart);
        setPosCursorEditable(selectionStart)
    }
    //

    const handleSelectPrivacy = (key, event) => {
        const name = key.split(',')[0];
        const url = key.split(',')[1];
        setDataPost(
            (prev) => {
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

    const handleDeleteImage = (e) => {
        setFileImg(fileImg.filter((img, index) => index.toString() !== e.target.getAttribute("id_modified")))
    }

    const handleShowBoxIcon = (e) => {
        setShowBoxIcon(!showBoxIcon)
    }




    const handleSubmit = (e) => {
        if (contentEditable.length > 0) {
            console.log(fileImg)
            window.alert(`Đăng bài thành công ! chệ dộ bài viết: ${dataPost.privacy}, content: ${dataPost.content}`)
        }
    }



    return (<div className={cx("modal_post")}>
        <div className={cx("header")}>
            <span>Tạo bài viết</span>
            <Button className={cx("close_btn")} shape="circle" size={"sm"} icon={images.icon.cross_icon} onClick={() => setModalShow(false)} />
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
                                return (
                                    <Dropdown.Item key={option.name} eventKey={[option.name, option.url]}><span className={cx("option_item")} url={option.url} name={option.name} value={option.value}>
                                        <img className={cx("option_icon")} src={option.url} />
                                        {option.value}
                                    </span></Dropdown.Item>
                                )
                            })}
                        </DropdownButton>
                    </div>
                </div>
            </div>
            {/* kéo thả ảnh */}
            {/* <Dropzone accept="image/jpeg, image/png" onDrop={acceptedFiles => console.log(acceptedFiles)}>
            {({getRootProps, getInputProps, isDragActive}) => {
                    if(isDragActive){
                       return (<p>keo tha vào đây</p>)
                    }
                    return (
                   ) 
            }}
        </Dropzone> */}
            <div className={cx("content__wrapper")}>
                <div className={cx("content")}
                    ref={contentEditableRef}
                    suppressContentEditableWarning={true}
                    contentEditable="true"
                    data-placeholder="Đức ơi, bạn đang nghĩ gì thế?"
                    onInput={handleGetValueContent}
                    onClick={handleGetPosCursorContentEditable}
                    onFocus={() => setShowBoxIcon(false)}
                >

                </div>

                {fileImg.length > 0 && <div className={cx("box__image")}>
                    {fileImg.map((img, index) => {
                        return (
                            <div className={cx("box__image-item")} key={index}>
                                <img src={URL.createObjectURL(img)} />
                                <div onClick={handleDeleteImage}>
                                    <div className={cx("delete_img")}>
                                        <Button className={cx("delete_img-icon")} icon={images.icon.cross_icon} shape="circle" sise={"sm"} id_modified={index} />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>}
            </div>
        </div>

        <div className={cx("footer")}>
            <div className={cx("box__tools")}>
                <span>Thêm vào bài viết của bạn</span>
                <div className={cx("tools")}>
                    <Button className={cx("btn__tool")} icon={images.icon.add_image_post} shape="circle" size="sm" {...getRootProps()} />
                    <Button className={cx("btn__tool")} icon={images.icon.add_camera_post} shape="circle" size="sm" />
                    <Tippy
                        interactive
                        visible={showBoxIcon}
                        placement="top"
                        delay={[100, 50]}
                        arrow="true"
                        render={attrs => (
                            <div className={cx("box_icon")} tabIndex="-1" {...attrs}>
                                <BoxIcon onClick={handleSelectIcon} />
                            </div>
                        )}>
                        <div style={{ marginLeft: "10px" }}
                        >
                            <Button className={cx("btn__tool")} icon={images.icon.add_icon_post} shape="circle" size="sm" onClick={handleShowBoxIcon} />
                        </div>
                    </Tippy>
                </div>
            </div>

            <div className={cx("btn__post-wrapper")}>
                <Button className={cx("btn__post", {
                    active: contentEditable.length > 0
                })}
                    onClick={handleSubmit}>Đăng</Button>
            </div>
        </div>
    </div>);
}

export default ModalPost;