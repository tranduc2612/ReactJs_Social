import classNames from "classnames/bind";
import styles from "./MessegerItem.module.scss";
import SeenItem from "../SeenItem/SeenItem";
const cx = classNames.bind(styles);



function MessengerContent({type,flag}) {
    return ( <>
        <div className={cx("mess__box",{
            [type]: true
        })}>
            <div className={cx("mess__content",{
                [type]: true
            })}>
                <span>
                    có cậu nào làm cái này nhánh và cận r confirm chor confirm r confirm r confirm r confirm  tớ kết quả với để tớ lấy output đập bọ    
                </span>
            </div>
        </div>
        <SeenItem isActive={flag} />
    </> );
}

export default MessengerContent;