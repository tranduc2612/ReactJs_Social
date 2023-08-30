import classNames from "classnames/bind";
import Tippy from '@tippyjs/react/headless';
import styles from "./Popper.scss";

// const cx = classNames(styles);

function Popper({children,className}) {
    return ( <>
    <Tippy
        interactive
        placement="bottom"
        trigger="mouseenter"
        delay={[100,50]}
        render={attrs => (
        <div className={className} tabIndex="-1" {...attrs}>
            h111asdasd
        </div>
    )}>
        {children}
    </Tippy>
    </> );
}

export default Popper;