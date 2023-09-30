import styles from "./ListComment.module.scss"
import CommentItem from "../CommentItem/CommentItem";
import classNames from "classnames/bind";
import images from "../../../../assets/images/index";

const cx = classNames.bind(styles);

function ListComment() {
    // gọi api comment ở đây

    return ( <div className={cx("box__comment")}>
        <div className={cx("filter__comment")}>
            <span>Phù hợp nhất</span>
            <img src={images.icon.arrow_down} alt="" />
        </div>
        <ul className={cx("list__comment")}>
            <li className={cx("comment__item")}>
                <CommentItem />
            </li>

            <li className={cx("comment__item")}>
                <CommentItem />
            </li>

            <li className={cx("comment__item")}>
                <CommentItem />
            </li>
        </ul>
    </div> );
}

export default ListComment;