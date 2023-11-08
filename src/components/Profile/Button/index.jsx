import classNames from "classnames/bind";
import Box from "~/components/Box/Box";
import styles from "./Profile.module.scss";
import Button from "~/components/Button/Button";
import images from "~/assets/images/index";

const cx = classNames.bind(styles);

export const InCommingView = () => {
    return (
        <div style={{ fontSize: '17px', fontWeight: '600' }}>Tính năng đang được phát triển</div>
    )
}

export const CurrentAccountBtn = ({onClickAcp = console.log, onClickCancel = console.log}) => {
    return (
        <Button className={cx("update")} icon={images.icon.pen_icon} size={"text_icon"} onClick={console.log} >
            Chỉnh sửa trang cá nhân
        </Button>
    )
}

export const FriendBtn = ({onClickAcp = console.log, onClickCancel = console.log}) => {
    return (
        <>
            <Button className={cx("message")} icon={images.icon.unfriend} size={"text_icon"} onClick={() => handleFriends('BLOCK')} >
                Chặn
            </Button>
            <Button className={cx("relationship")} icon={images.icon.messager} size={"text_icon"} onClick={() => navigate(`/messenger/${chatId}`)} >
                Nhắn tin
            </Button>
        </>
    )
}

export const SourceRequestBtn = ({onClickAcp = console.log, onClickCancel = console.log}) => {
    return (
        <>
            <Button className={cx("relationship")} icon={images.icon.unfriend} size={"text_icon"} onClick={() => handleFriends('CANCEL')} >
                Hủy lời mời
            </Button>
            <Button className={cx("message")} icon={images.icon.messager} size={"text_icon"} onClick={() => navigate(`/messenger/${chatId}`)} >
                Nhắn tin
            </Button>
        </>
    )
}

export const TargetRequestBtn = () => {
    return (
        <>
            <Button className={cx("message")} size={"text_icon"} onClick={() => handleFriends('ACCEPT')} >
                Chấp nhận lời mời
            </Button>
            <Button className={cx("relationship")} size={"text_icon"} onClick={() => handleFriends('CANCEL')} >
                Xóa lời mời
            </Button>
        </>
    )
}

export const DefaultBtn = () => {
    return (
        <>
            <Button className={cx("message")} icon={images.icon.add_friend} size={"text_icon"} onClick={() => handleFriends('ADD_FRIEND')} >
                Thêm bạn bè
            </Button>
            <Button className={cx("relationship")} icon={images.icon.messager} size={"text_icon"} onClick={() => navigate(`/messenger/${chatId}`)} >
                Nhắn tin
            </Button>
        </>
    )
}


const renderButton = () => {
    if (userProfile.username == userData.data_user.username) {
        return (
            <Button className={cx("update")} icon={images.icon.pen_icon} size={"text_icon"} onClick={console.log} >
                Chỉnh sửa trang cá nhân
            </Button>
        )
    }
    switch (userProfile.type_relationship) {
        case 'FRIEND':
            return (
                <>
                    <Button className={cx("message")} icon={images.icon.unfriend} size={"text_icon"} onClick={console.log} >
                        Chặn
                    </Button>
                    <Button className={cx("relationship")} icon={images.icon.messager} size={"text_icon"} onClick={() => navigate(`/messenger/${chatId}`)} >
                        Nhắn tin
                    </Button>
                </>
            ) 
        case 'SOURCE_REQUEST': 
            return (
                <>
                    <Button className={cx("relationship")} icon={images.icon.unfriend} size={"text_icon"} onClick={() => handleFriends('CANCEL')} >
                        Hủy lời mời
                    </Button>
                    <Button className={cx("message")} icon={images.icon.messager} size={"text_icon"} onClick={() => navigate(`/messenger/${chatId}`)} >
                        Nhắn tin
                    </Button>
                </>
            ) 
        case 'TARGET_REQUEST': 
            return (
                <>
                    <Button className={cx("message")} size={"text_icon"} onClick={() => handleFriends('ACCEPT')} >
                        Chấp nhận lời mời
                    </Button>
                    <Button className={cx("relationship")} size={"text_icon"} onClick={() => handleFriends('CANCEL')} >
                        Xóa lời mời
                    </Button>
                </>
            ) 
        default: 
            return (
                <>
                    <Button className={cx("message")} icon={images.icon.add_friend} size={"text_icon"} onClick={() => handleFriends('ADD_FRIEND')} >
                        Thêm bạn bè
                    </Button>
                    <Button className={cx("relationship")} icon={images.icon.messager} size={"text_icon"} onClick={() => navigate(`/messenger/${chatId}`)} >
                        Nhắn tin
                    </Button>
                </>
            )
    }
}