import Button from "~/components/Button/Button";
import styles from "./CommentItem.module.scss"
import classNames from "classnames/bind";
import images from "~/assets/images/index";
import { useRef, useState } from "react";
import InputEditor from "~/components/InputEditor/InputEditor";
import Modal from 'react-bootstrap/Modal';
import ButtonBootstrap from 'react-bootstrap/Button';
import ModalConfirm from "~/components/ModalConfirm/ModalConfirm"

const cx = classNames.bind(styles);

function CommentItem() {
    const refInputEditComment = useRef(null)
    const [showEditComment,setShowEditComment] = useState(false);
    const [showDeleteModal,setShowDeleteModal] = useState(false);


    return ( <div className={cx("item")}>
        <div className={cx("avatar")}>
            <Button icon={images.icon.avatar_demo} full_icon={true} shape={"circle"} />
        </div>
        <div className={cx("wrapper",{
            active: showEditComment
        })}>
            {
                showEditComment ? <div className={cx("input__edit-comment")}>
                    <InputEditor ref={refInputEditComment} placementTools={"bottom"} />
                    <span>Nhấn Esc để</span>
                    <span className={cx("rollback__edit-comment")} onClick={()=>setShowEditComment(false)}>Hủy</span>
                </div> : <>
                        <div className={cx("content")}>
                    <div className={cx("name__author")}>
                        <span className={cx("name")}>Trần Minh Đức</span>
                        <span className={cx("time")}>5 phút</span>
                    </div>
                    <div className={cx("content__comment")}>
                        <span>Hôm nay tôi vui quá Hôm nay tôi vui quá</span>
                    </div>
                </div>
                <ul className={cx("list__function")}>
                    <li className={cx("item__function")}>
                        <span className="text" onClick={()=>setShowEditComment(true)}>Sửa</span>
                    </li>
                    <li className={cx("item__function")}>
                        <span className="text" onClick={()=>setShowDeleteModal(true)}>Xóa</span>
                    </li>
                </ul>
                </>
            }
        </div>

        <ModalConfirm title="bình luận" showConfirm={showDeleteModal} setShowConfirm={setShowDeleteModal} />        

      <div className={cx("layer__comment",{
        show: showDeleteModal
      })}>
        
      </div>
      
    </div> );
}

export default CommentItem;