import classNames from "classnames/bind";
import styles from "./Chat.module.scss"
import SideBar from '~/components/Sidebar/Sidebar';
import CustomBox from "~/components/CustomBox/CustomBox";


const cx = classNames.bind(styles);

function Chat() {
    const renderHeaderChat = () =>{
        return (
            <h1>Header</h1>
        )
    }

    return ( 
        <div className={cx("chat__page")}>
            <div className={cx("sidebar")}>
                <CustomBox header={renderHeaderChat}>

                </CustomBox>
            </div>

            <div className={cx("body")}>
                <div>
                    asdasd
                </div>
            </div>
        </div> 
    );
}

export default Chat;