import Button from "~/components/Button/Button";
import styles from "./CommentItem.module.scss"
import classNames from "classnames/bind";
import images from "~/assets/images/index";
import { useEffect, useRef, useState } from "react";
import InputEditor from "~/components/InputEditor/InputEditor";
import Modal from 'react-bootstrap/Modal';
import ButtonBootstrap from 'react-bootstrap/Button';
import { formatDateType2 } from "~/utils/format";
import ModalConfirmComment from "~/components/ModalConfirm/ModalConfirmComment";
import { BASE_URL_MEDIA, Post } from "~/services/base";
import checkResponse from "~/utils/checkResponse";
import { useContext } from "react";
import { CommentContext } from "../../BoxNewFeed";

const cx = classNames.bind(styles);

function CommentItem({ data, userData, listComment, setListComment }) {
    const refInputEditComment = useRef(null)
    const commentContext = useContext(CommentContext);
    const [showEditComment, setShowEditComment] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDeleteComment = async () => {
        const res = await Post("/action/delete-comment", {
            comment_id: data?.comment_id
        }, userData?.access_token)
        if (checkResponse(res)) {
            const newList = listComment.filter((comment) => comment?.comment_id !== data?.comment_id);
            setListComment(newList);
            commentContext?.setCommentCount(prev => prev - 1);
            setShowDeleteModal(false);
        }
    }

    const handleUpdateComment = async (content) => {
        const res = await Post("/action/update-comment", {
            comment_id: data?.comment_id,
            content: content,
            post_id: data?.post_id
        }, userData?.access_token)
        if (checkResponse(res)) {
            // Tìm và cập nhật bài viết trong mảng state
            const updatedComment = listComment.find(comment => comment?.comment_id === data?.comment_id);
            const updatedListComment = listComment.map((comment) => {
                if (comment.comment_id === updatedComment.comment_id) {
                    return {
                        ...updatedComment,
                        content: content,
                        created_at: Date.now()
                    };
                }
                return comment;
            });
            setListComment(updatedListComment);
            setShowEditComment(false);
        }
    }


    return (<div className={cx("item")}>
        <div className={cx("avatar")}>
            <Button icon={BASE_URL_MEDIA + data?.avatar} full_icon={true} shape={"circle"} />
        </div>
        <div className={cx("wrapper", {
            active: showEditComment
        })}>
            {
                showEditComment ? <div className={cx("input__edit-comment")}>
                    <InputEditor ref={refInputEditComment} placementTools={"bottom"} handleSubmitContent={handleUpdateComment} initValue={data?.content} />
                    <span>Nhấn Esc để</span>
                    <span className={cx("rollback__edit-comment")} onClick={() => setShowEditComment(false)}>Hủy</span>
                </div> : <>
                    <div className={cx("content")}>
                        <div className={cx("name__author")}>
                            <span className={cx("name")}>{data?.fullname}</span>
                            <span className={cx("time")}>{formatDateType2(data?.created_at)}</span>
                        </div>
                        <div className={cx("content__comment")}>
                            <span>{data?.content}</span>
                        </div>
                    </div>
                    {data?.username === userData?.data_user?.username ?
                        <ul className={cx("list__function")}>
                            <li className={cx("item__function")}>
                                <span className="text" onClick={() => setShowEditComment(true)}>Sửa</span>
                            </li>
                            <li className={cx("item__function")}>
                                <span className="text" onClick={() => setShowDeleteModal(true)}>Xóa</span>
                            </li>
                        </ul>
                        : null
                    }
                </>
            }
        </div>

        <ModalConfirmComment title="bình luận" showConfirm={showDeleteModal} setShowConfirm={setShowDeleteModal} handleDeleteComment={handleDeleteComment} />

        <div className={cx("layer__comment", {
            show: showDeleteModal
        })}>

        </div>

    </div>);
}

export default CommentItem;