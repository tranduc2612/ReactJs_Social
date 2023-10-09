import styles from "./ListNewFeed.module.scss"
import classNames from "classnames/bind";
import BoxNewFeed from "../BoxNewFeed/BoxNewFeed";
import { useEffect, useState } from "react";
import { Get, Post } from "~/services/base";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function ListNewFeed({ userData }) {
    const [lstPost, setLstPost] = useState([]);

    useEffect(() => {
        fetchApiPost();
    }, [])

    const fetchApiPost = async () => {
        try {
            const resPost = await Get("/post/get-list", {}, userData?.access_token)
            if (resPost.success && resPost.status === 200) {
                setLstPost(resPost.returnObj.data);
                toast.success(resPost.msg)
            } else {
                toast.error(resPost.msg)
            }
        } catch (error) {
            toast.error(error)
        }
    }

    return (<div className={cx("list")}>
        {lstPost && lstPost.map(post => {
            return (
                <BoxNewFeed data={post} key={post.id} shared={true} />
            )
        })}
        {/* <BoxNewFeed shared={false} />
            <BoxNewFeed shared={true} />
            <BoxNewFeed shared={false} /> */}
        <div>
            <ToastContainer />
        </div>
    </div>);
}

export default ListNewFeed;