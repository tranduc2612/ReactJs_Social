import styles from "./ListComment.module.scss"
import CommentItem from "../CommentItem/CommentItem";
import classNames from "classnames/bind";
import images from "~/assets/images/index";
import { useEffect, useRef, useState } from "react";
import { Get, Post } from "~/services/base";
import checkResponse from "~/utils/checkResponse";
import Loading from "~/components/Loading/Loading";

const cx = classNames.bind(styles);

function ListComment({ idPost, token, content, userData, scrollToBottom, handleComment }) {

    // gọi api comment ở đây

    const [listComment, setListComment] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        scrollToBottom()
    }, [listComment.length])

    useEffect(() => {
        setLoading(true)
        Post("/action/list-comment", {
            post_id: idPost
        }, token)
            .then((res) => {
                if (checkResponse(res)) {
                    setListComment(res.returnObj);
                }
            })
            .finally((res) => {
                setLoading(false)
            })
    }, [])



    useEffect(() => {
        if (content) {
            const newComment = {
                content: content?.i_content,
                comment_id: content?.new_id,
                created_at: Date.now(),
                ...userData.data_user,
            }
            setListComment([
                ...listComment, newComment
            ]);
        }
    }, [content])

    return (<div className={cx("box__comment")}>
        <div className={cx("filter__comment")}>
            <span>Phù hợp nhất</span>
            <img src={images.icon.arrow_down} alt="" />
        </div>
        <ul className={cx("list__comment")}>
            {listComment.map((comment) => {
                return (
                    <li className={cx("comment__item")} key={comment.comment_id || Math.random()}>
                        <CommentItem data={comment} userData={userData} setListComment={setListComment} listComment={listComment} />
                    </li>
                )
            })}
            {loading && <div className="d-flex justify-content-center mt-3">
                <Loading />
            </div>}
        </ul>
    </div>);
}

export default ListComment;