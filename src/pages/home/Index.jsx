import styles from "./Home.module.scss"
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function Home() {
    return ( <h1 className={cx("hello")}>Home Page</h1> );
}

export default Home;