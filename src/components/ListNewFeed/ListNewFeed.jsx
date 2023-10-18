import styles from "./ListNewFeed.module.scss"
import classNames from "classnames/bind";
import BoxNewFeed from "../BoxNewFeed/BoxNewFeed";
import { useEffect, useRef, useState } from "react";
import { Get, Post } from "~/services/base";
import { useSelector, useDispatch } from 'react-redux'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getListPost } from "~/redux/actions/postActions";
import checkResponse from "~/utils/checkResponse";
import Loading from "../Loading/Loading";

const cx = classNames.bind(styles);

function ListNewFeed({ userData, fetchApiPost, lstPost }) {
    // const lstPost = useSelector((state) => state.post);
    // const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        handleFetchApi()
    }, [])

    const handleFetchApi = async () => {
        setLoading(true);
        try {
            await fetchApiPost();
        } catch (e) {

        } finally {
            setLoading(false);
        }
    }



    useEffect(() => {
        const handleScroll = async () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;
            console.log(Math.ceil(windowHeight + scrollTop), documentHeight)
            if (Math.ceil(windowHeight + scrollTop) !== documentHeight || loading) {
                return;
            }
            handleFetchApi()
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);


    // const fetchApiPost = async () => {
    // setLoading(true);    
    //     try {
    //         const res = await dispatch(getListPost(dataFetch));
    //         setIndexPage((prev) => prev + 1);
    //     } catch (e) {

    //     } finally {
    //         setLoading(false);
    //     }
    // }

    return (<div className={cx("list")}>
        {lstPost?.map(post => {
            return (
                <BoxNewFeed data={post} key={post.post_id} shared={false} />
            )
        })}
        {/* <BoxNewFeed shared={false} />
            <BoxNewFeed shared={true} />
            <BoxNewFeed shared={false} /> */}
        {loading && <div className="d-flex justify-content-center mt-3">
            <Loading />
        </div>}
        <div>
            <ToastContainer />
        </div>
    </div>);
}

export default ListNewFeed;