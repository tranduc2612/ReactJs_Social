import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import styles from "./Posts.module.scss";
import BoxNewFeed from "~/components/BoxNewFeed/BoxNewFeed";
import { Post } from "~/services/base";
import { useState } from "react";
import { useEffect } from "react";
import getParamUrl from "~/utils/getParamUrl";
import checkResponse from "~/utils/checkResponse";
import Loading from "~/components/Loading/Loading";

const cx = classNames.bind(styles);

function Posts({ userData }) {
    const navigate = useNavigate();
    const [postData, setPostData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const id = getParamUrl();
        Post("/post/get-post-by-id", {
            post_id: id
        }, userData?.access_token)
            .then(res => {
                if (checkResponse(res)) {
                    setPostData((prev) => {
                        return {
                            ...res.returnObj[0]
                        }
                    })
                }
            })
            .finally((res) => {
                setLoading(false);
            })

    }, [])

    const handlePost = async (dataSend) => {
        const res = await Post(
            "/post/handle-post", dataSend, userData?.access_token
        )

        if (checkResponse(res)) {
            // Thêm bài viết
            const functionName = dataSend?.function;
            if (functionName === "U") {
                // Sửa bài viết
                const updatedPost = res.returnObj;
                setPostData((prev) => {
                    return {
                        ...prev,
                        ...updatedPost[0],
                    }
                });
            } else if (functionName === "D") {
                // Xóa bài viết
                navigate("/");
                setPostData({});
            } else {
                return null;
            }
            return res;
        }
        return null;
    }

    // if (!postData?.post_id) {
    //     return (
    //         <div className={cx("posts")}>
    //             <h1>Không thấy bài viết</h1>
    //         </div>
    //     )
    // }

    return (

        <div className={cx("posts")}>
            {loading ? <Loading /> :
                <div className={cx("body")}>
                    {console.log(postData, "asdasdasdas")}
                    <BoxNewFeed userData={userData} data={postData} shared={false} handlePost={handlePost} />
                </div>
            }
        </div>


    );
}

export default Posts;