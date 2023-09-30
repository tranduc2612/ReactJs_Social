import { useState } from "react";
import classNames from "classnames/bind";
import Modal from 'react-bootstrap/Modal';
import ModalPost from "../../components/ModalPost/ModalPost"
import styles from "./CreatePost.module.scss"
import images from "../../assets/images/index";
import Box from "../../components/Box/Box";
import Button from "../../components/Button/Button";

const cx = classNames.bind(styles);

function CreatePost() {
    const [modalShow, setModalShow] = useState(false);
    const handlePopupPost = ()=>{
        setModalShow(true)
    }
    return ( <>
        <Box className={cx("box__post")}>
            <div className={cx("box__post-header")} onClick={handlePopupPost}>
                <div className={cx("box__post-avatar")}>
                    <Button icon={images.icon.avatar_demo} full_icon={true} shape={"circle"} />
                </div>
                <div className={cx("box__post-input")}>
                    <span>Đức ơi, bạn đang nghĩ gì thế?</span>
                </div>
            </div>


            <div className={cx("box__post-body")}>
                <div className={cx("box__post-item")}>
                    <div className={cx("box__post-img")}>
                        <img src={images.icon.add_camera_post} />
                    </div>
                    <div className={cx("box__post-function")}>
                        <span>Video trực tuyến</span>
                    </div>
                </div>

                <div className={cx("box__post-item")}>
                    <div className={cx("box__post-img")}>
                        <img src={images.icon.add_image_post} />
                    </div>
                    <div className={cx("box__post-function")}>
                        <span>Ảnh/Video</span>
                    </div>
                </div>

                <div className={cx("box__post-item")}>
                    <div className={cx("box__post-img")}>
                        <img src={images.icon.add_icon_post} />
                    </div>
                    <div className={cx("box__post-function")}>
                        <span>Cảm xúc/hoạt động</span>
                    </div>
                </div>
            </div>
        </Box>

        <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            size="md"
        >
            <ModalPost setModalShow={setModalShow} />
        </Modal>
    </> );
}

export default CreatePost;