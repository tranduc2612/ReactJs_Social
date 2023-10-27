import styles from "./ListNewFeed.module.scss"
import classNames from "classnames/bind";
import BoxNewFeed from "../BoxNewFeed/BoxNewFeed";
import { useEffect, useRef, useState, memo, useMemo } from "react";
import { Get, Post } from "~/services/base";
import { useSelector, useDispatch } from 'react-redux'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getListPost } from "~/redux/actions/postActions";
import checkResponse from "~/utils/checkResponse";
import Loading from "../Loading/Loading";

const cx = classNames.bind(styles);

function ListNewFeed({ userData, fetchApiPost }) {
    // const lstPost = useSelector((state) => state.post);
    // const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [lstPost, setLstPost] = useState([]);
    const [indexPage, setIndexPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const dataFetch = {
        pageIndex: indexPage,
        pageCount: 10,
        token: userData?.access_token,
    }

    useEffect(() => {

        setLoading(true);
        fetchApiPost(dataFetch)
            .then((res) => {
                if (indexPage == totalPage) {
                    return
                }
                setIndexPage(indexPage + 1);
                if (checkResponse(res.payload)) {
                    setLstPost([...res.payload.returnObj])
                }
            }).catch((err) => {

            }).finally((res) => {
                setLoading(false);
            })

    }, [])

    useEffect(() => {
        if (lstPost.length > 0) {
            setTotalPage(lstPost[0]?.total_page)
        }
    }, [lstPost]);





    useEffect(() => {
        const handleScroll = async () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;
            console.log(Math.ceil(windowHeight + scrollTop), documentHeight)
            if (Math.ceil(windowHeight + scrollTop) !== documentHeight || loading) {
                return;
            }
            await handleFetchApi()
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);

    return (<div className={cx("list")}>
        {lstPost && lstPost?.map(post => {
            return (
                <BoxNewFeed key={post.post_id} data={post} shared={false} userData={userData} />
            )
        })}
        {loading && <div className="d-flex justify-content-center mt-3">
            <Loading />
        </div>}
        <div>
            <ToastContainer />
        </div>
    </div>);
}

export default memo(ListNewFeed);