import styles from "./Home.module.scss"
import classNames from "classnames/bind";

import SideBar from "~/components/Sidebar/Sidebar";


const cx = classNames.bind(styles);

function Home() {
    return ( <div className={cx("home")}>
                <SideBar>Side-left</SideBar>
                <div className={cx("body")}>
                    <ul className={cx("list__new-feed")}>
                        
                    </ul>
                </div>
                <SideBar>Side-right</SideBar>
        

    </div> );
}

export default Home;