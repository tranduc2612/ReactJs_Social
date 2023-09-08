import Header from "../components/Header/Header";
import styles from "./DefaultLayout.module.scss"
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function DefaultLayout({children}) {
    return ( <>
        <Header />
        {children}
    </> );
}

export default DefaultLayout;