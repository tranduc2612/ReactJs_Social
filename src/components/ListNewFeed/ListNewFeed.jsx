import styles from "./ListNewFeed.module.scss"
import classNames from "classnames/bind";
import BoxNewFeed from "../BoxNewFeed/BoxNewFeed";
import { useEffect, useRef, useState, memo, useMemo, forwardRef, useImperativeHandle } from "react";
import { Get, Post } from "~/services/base";
import { useSelector, useDispatch } from 'react-redux'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getListPost } from "~/redux/actions/postActions";
import checkResponse from "~/utils/checkResponse";
import Loading from "../Loading/Loading";

const cx = classNames.bind(styles);

function ListNewFeed({ userData, fetchApiPost, handlePost }, ref) {
    // const lstPost = useSelector((state) => state.post);
    // const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [lstPost, setLstPost] = useState([]);
    const [indexPage, setIndexPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    const dataFetch = {
        page_index: indexPage,
        page_count: 10,
        token: userData?.access_token,
    }

    useImperativeHandle(ref, () => (
        {
            getListPost() {
                return lstPost
            },
            setListPost(newList) {
                setLstPost(newList);
            }
        }
    ))

    useEffect(() => {
        setLoading(true);
        fetchApiPost(dataFetch)
            .then((res) => {
                setIndexPage(indexPage + 1);
                if (checkResponse(res) && res.returnObj.length > 0) {
                    setLstPost([...res.returnObj]);
                    setTotalPage(res.returnObj[0]?.total_page)
                }
            }).catch((err) => {

            }).finally((res) => {
                setLoading(false);
            })

    }, [])

    useEffect(() => {
        const handleScroll = async () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;
            if (Math.ceil(windowHeight + scrollTop) !== documentHeight || loading) {
                return;
            }
            if (indexPage == totalPage) {
                return
            }
            setLoading(true);
            fetchApiPost(dataFetch)
                .then((res) => {

                    if (checkResponse(res)) {
                        if (res.returnObj.length === 0) {
                            return
                        }
                        setIndexPage(indexPage + 1);
                        setLstPost((prev) => [...prev, ...res.returnObj])
                    }
                }).catch((err) => {

                }).finally((res) => {
                    setLoading(false);
                })

        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);

    return (<div className={cx("list")}>
        {lstPost && lstPost?.map(post => {
            return (
                <BoxNewFeed handlePost={handlePost} key={post.post_id} data={post} shared={false} userData={userData} />
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

export default forwardRef(ListNewFeed);