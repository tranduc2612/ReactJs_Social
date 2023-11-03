import { useState } from "react";
import classNames from "classnames/bind";
import Modal from 'react-bootstrap/Modal';
import ModalPost from "~/components/ModalPost/ModalPost"
import styles from "./CreatePost.module.scss"
import images from "~/assets/images/index";
import Box from "~/components/Box/Box";
import Button from "~/components/Button/Button";
import LoadingBar from 'react-top-loading-bar';
import { useSelector, useDispatch } from 'react-redux'
import { BASE_URL_MEDIA } from "~/services/base";
import { getLastName } from "~/utils/getLastName";
const cx = classNames.bind(styles);

function CreatePost({ handlePost }) {
    const userData = useSelector((state) => state.auth);
    const [modalShow, setModalShow] = useState(false);
    const [progress, setProgress] = useState(0)
    const handlePopupPost = () => {
        setModalShow(true)
    }
    return (<>
        <Box className={cx("box__post")}>
            <div className={cx("box__post-header")} onClick={handlePopupPost}>
                <div className={cx("box__post-avatar")}>
                    <Button icon={BASE_URL_MEDIA + userData.data_user?.avatar} full_icon={true} shape={"circle"} />
                </div>
                <div className={cx("box__post-input")}>
                    <span>{getLastName(userData.data_user?.fullname)} ơi, bạn đang nghĩ gì thế?</span>
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
            <ModalPost setProgress={setProgress} progress={progress} setModalShow={setModalShow} handlePost={handlePost} />
        </Modal>

        <LoadingBar
            color='#1b74e4'
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
        />
    </>);
}

export default CreatePost;