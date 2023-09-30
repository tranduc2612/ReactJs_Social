import classNames from "classnames/bind";
import styles from "./SeenItem.module.scss";
import Button from "~/components/Button/Button"
import images from "~/assets/images/index";
const cx = classNames.bind(styles);



function SeenItem({isActive}) {
    return ( <>
        <div className={cx("icon__seen",{
                active: isActive
            })}>
            <Button className={cx("icon",{
                active: isActive
            })} icon={images.icon.avatar_demo} full_icon={true} shape="circle" />
        </div>
    </> );
}

export default SeenItem;