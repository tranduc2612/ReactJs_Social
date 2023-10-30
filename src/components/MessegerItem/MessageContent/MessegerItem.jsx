import classNames from "classnames/bind";
import styles from "./MessegerItem.module.scss";
import SeenItem from "../SeenItem/SeenItem";
const cx = classNames.bind(styles);



function MessengerContent({type,flag, content}) {
    return ( <>
        <div className={cx("mess__box",{
            [type]: true
        })}>
            <div className={cx("mess__content",{
                [type]: true
            })}>
                <span>
                    {content}
                </span>
            </div>
        </div>
        <SeenItem isActive={flag} />
    </> );
}

export default MessengerContent;