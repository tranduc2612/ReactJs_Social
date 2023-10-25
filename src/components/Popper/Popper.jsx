import { useEffect, useRef, useState, useId } from "react";
import classNames from "classnames/bind";
import styles from "./Popper.module.scss";
import Button from "~/components/Button/Button";

const cx = classNames.bind(styles);

function Popper({ item, PopperRender }) {
    let Comp = "div"
    const refBox = useRef(null);
    const refPopper = useRef(null);
    const [showBox, setShowBox] = useState(false);

    const attr = {

    }

    if (item?.title !== "avatar") {
        attr.count_noti = item?.count_seen === 0 ? null : item?.count_seen
    }

    if (PopperRender) {
        Comp = PopperRender
    }

    const handleClick = (event) => {
        setShowBox(!showBox);
    }

    useEffect(() => {
        function handleClickOutside(event) {
            const btnLayerClick = refPopper.current.getLayoutClick();
            if (refBox.current && !refBox.current.contains(event.target) && !btnLayerClick.isEqualNode(event.target)) {
                setShowBox(false);
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [refBox])

    return (<div className={cx("wrapper")} >
        <div className={cx("btn")} {...attr}>
            <Button className={"custom__popper"} ref={refPopper} shape="circle" active={showBox} icon={item.icon} full_icon={item.full_icon} size={"xl"} onClick={handleClick} />
        </div>
        {
            showBox && <Comp data={item} ref={refBox} />
        }
    </div>);
}

export default Popper;