import styles from "./ListNewFeed.module.scss"
import classNames from "classnames/bind";
import BoxNewFeed from "../BoxNewFeed/BoxNewFeed";
import { useEffect, useState } from "react";
import { get } from "../../services/base";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function ListNewFeed() {
    const [lstPost,setLstPost] = useState([]);

    useEffect(()=>{
        fetchApiPost();
    },[])

    const fetchApiPost = async () => {
        const resPost = await get("/post/get-list",{
            params: {
                page: 1,
                page_size: 10
            }
        })
        if(resPost.success && resPost.status === 200){
            setLstPost(resPost.returnObj.data);
            toast.success(resPost.msg)
        }else{
            if(resPost){
                toast.error(resPost.msg)
            }else{
                toast.error("Kiểm tra lại back-end API !")
            }
        }
    }

    return ( <div className={cx("list")}>
        {lstPost && lstPost.map(post=>{
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
    </div> );
}

export default ListNewFeed;