import { useRef, useState, useCallback, useMemo, memo } from "react";
import Modal from 'react-bootstrap/Modal';
import classNames from "classnames/bind";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/swiper-bundle.css';

import styles from "./BoxNewFeed.module.scss"
import images from "~/assets/images/index";
import Button from "~/components/Button/Button"
import { REACT_EMOTION } from "~/utils/constant"

import Tippy from '@tippyjs/react/headless'; // import headless sẽ mất hiệu ứng hover tồn tại
import BoxReact from "../BoxReact/BoxReact";
import CustomBox from "../CustomBox/CustomBox";
import InputEditor from "../InputEditor/InputEditor";
import ListComment from "./components/ListComment/ListComment";
import Box from "../Box/Box";
import ModalPost from "../ModalPost/ModalPost";
import ModalConfirm from "../ModalConfirm/ModalConfirm";
import HeaderPost from "./components/HeaderPost/HeaderPost";
import { BASE_URL_MEDIA, Post } from "~/services/base";
import LoadingBar from 'react-top-loading-bar';
import { useEffect } from "react";
import checkResponse from "~/utils/checkResponse";
import { createContext } from "react";
const cx = classNames.bind(styles);

// like color: rgb(32, 120, 244);
// tym color: rgb(243, 62, 88);
// thuongthuong,haha,wow,sad, : color: rgb(247, 177, 37);
// phan no :color: rgb(233, 113, 15);

export const CommentContext = createContext()

function BoxNewFeed({ data, shared, userData, handlePost }) {
    const BASE_STATE_REACT = {
        id: null,
        title: "Thích",
        color: null,
        img: null
    }
    const refBoxReact = useRef(null);
    const refBoxDetail = useRef(null);
    const inputEditorCommentRef = useRef(null);
    const [react, setReact] = useState(() => {
        if (data?.current_react_type && REACT_EMOTION[data?.current_react_type]) {
            const currentReact = REACT_EMOTION[data?.current_react_type];
            return currentReact
        }
        return BASE_STATE_REACT
    });
    const [showDetailPost, setShowDetailPost] = useState(false);
    const [showConfirmBoxDelete, setShowConfirmBoxDelete] = useState(false);
    const [showModalEditPost, setShowModalEditPost] = useState(false);
    const [idModifiedPost, setIdModifiedPost] = useState(null);
    const [progress, setProgress] = useState(0)
    const [lstMostReactPost, setLstMostReactPost] = useState([]);
    const [lstImg, setlstImg] = useState([]);
    const [likeCount, setLikeCount] = useState(() => data?.like_count);
    const [commentCount, setCommentCount] = useState(() => data?.comment_count);
    const [contentComment, setContentComment] = useState("");


    const INIT_LIST_REACT = useMemo(() => {
        let arrMostEmotion = [];
        if (data?.react_type1 || data?.react_type2 || data?.react_type3) {
            let react1 = REACT_EMOTION[data?.react_type1];
            let react2 = REACT_EMOTION[data?.react_type2];
            let react3 = REACT_EMOTION[data?.react_type3];
            if (react1) {
                arrMostEmotion.push(react1)
            }
            if (react2) {
                arrMostEmotion.push(react2)
            }
            if (react3) {
                arrMostEmotion.push(react3)
            }
        }
        setLstMostReactPost(arrMostEmotion)
        return arrMostEmotion
    }, [data])

    const scrollToBottom = () => {
        refBoxDetail.current.scrollTop = refBoxDetail.current.scrollHeight;
    }

    useEffect(() => {
        if (data?.media_info) {
            const imgData = JSON.parse(data?.media_info)?.file_info;
            setlstImg(imgData)
            return
        }

        if (data?.current_react_type && REACT_EMOTION[data?.current_react_type]) {
            const currentReact = REACT_EMOTION[data?.current_react_type];
            setReact(currentReact)
        } else {
            setReact(BASE_STATE_REACT)
        }
        setlstImg([])
    }, [data])

    const sliderRef = useRef(null);

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);

    const handleClose = () => setShowDetailPost(false);
    const handleShow = () => setShowDetailPost(true);

    const handleReact = async (e) => {
        e.stopPropagation()
        const key = e.target.getAttribute('id-icon');
        const keyDefault = e.target.getAttribute('id-default');

        if (key !== null || keyDefault !== null) {
            // if (keyDefault && react.id) {
            //     if (lstMostReactPost[lstMostReactPost.length - 1]?.self) {
            //         setLstMostReactPost(INIT_LIST_REACT)
            //     }
            //     setReact({
            //         ...BASE_STATE_REACT
            //     })
            //     return
            // }
            if (keyDefault && react.id) {
                // hủy like này
                setLstMostReactPost(INIT_LIST_REACT)
                setReact({
                    ...BASE_STATE_REACT
                })
                const callApiReact = await Post("/action/delete-react", {
                    post_id: data?.post_id,

                }, userData?.access_token)
                if (checkResponse(callApiReact)) {
                    setLikeCount(callApiReact?.returnObj[0].like_count)
                }
                return
            }
            const objReact = REACT_EMOTION[key || keyDefault]
            if (objReact !== null) {
                setReact({
                    ...objReact
                })
                const callApiReact = await Post("/action/create-react", {
                    type: objReact?.id,
                    post_id: data?.post_id,

                }, userData?.access_token)

                if (checkResponse(callApiReact)) {
                    setLikeCount(callApiReact?.returnObj[0].like_count)

                    let objecReactSet = {
                        ...objReact,
                        self: true
                    }

                    if (lstMostReactPost.find(item => objecReactSet?.id === item.id)) {
                        setLstMostReactPost([
                            ...INIT_LIST_REACT
                        ])
                        return
                    }
                    // if (lstMostReactPost.length === 3) {
                    if (lstMostReactPost[lstMostReactPost.length - 1]?.self) {
                        setLstMostReactPost(prev => {
                            let newArr = [...prev];
                            newArr.pop();
                            return [
                                ...newArr,
                                objecReactSet
                            ]
                        })
                    } else {
                        setLstMostReactPost([
                            ...lstMostReactPost,
                            objecReactSet
                        ])
                    }
                }
            }
        } else {
            // hủy like

            setReact({
                ...BASE_STATE_REACT
            })
            setLstMostReactPost(INIT_LIST_REACT)

            const callApiReact = await Post("/action/delete-react", {
                post_id: data?.post_id,

            }, userData?.access_token)

            if (checkResponse(callApiReact)) {
                setLikeCount(callApiReact?.returnObj[0].like_count)
            }

        }

    }

    const handleFocusEditorInput = () => {
        if (inputEditorCommentRef.current) {
            inputEditorCommentRef.current.getInputEditor().focus();
        }
    }

    const handleOpenConfirmDeleteModal = (e, id_post) => {
        setIdModifiedPost(id_post)
        setShowDetailPost(false);
        setShowConfirmBoxDelete(true);
    }

    const handleOpenEditModal = (e, id_post) => {
        setShowDetailPost(false);
        setShowModalEditPost(true);
    }

    const handleCloseEditModal = () => {
        setShowModalEditPost(false);
    }

    const renderReactEmotion = () => {
        if (react.id === null) {
            return (
                <div style={{
                    backgroundImage: `url('${images.icon.tools__icon}')`,
                    backgroundSize: "190px 190px",
                    width: "18px",
                    height: "18px",
                    backgroundRepeat: "no-repeat",
                    display: "inline-block",
                }} className={cx("tools__contact-icon", {
                    active: false
                })} id-default={REACT_EMOTION.LIKE.id}>
                </div>
            )
        } else if (react.id === REACT_EMOTION.LIKE.id) {
            return (
                <div style={{
                    backgroundImage: `url('${images.icon.tools__icon}')`,
                    backgroundSize: "190px 190px",
                    width: "18px",
                    height: "18px",
                    backgroundRepeat: "no-repeat",
                    display: "inline-block",
                }} key={react.id} className={cx("tools__contact-icon", {
                    active: true
                })} id-default={REACT_EMOTION.LIKE.id}>
                </div>
            )
        } else {
            return (
                <img className={cx("active")} key={react.id} src={react.img} alt="" />
            )
        }
    }

    const handleSubmitComment = async (content) => {
        const createComment = await Post("/action/create-comment", {
            content,
            post_id: data?.post_id,
        }, userData?.access_token);
        if (checkResponse(createComment)) {
            setContentComment({
                ...createComment.returnObj[0]
            });
            setCommentCount(createComment.returnObj[0]?.comment_count);
        }
    }

    const renderFooterDetailPost = () => {
        return (
            <div className={cx("detail__post-footer")}>
                <Button className={cx("avatar")} icon={images.icon.avatar_demo} shape="circle" full_icon={true} />
                <InputEditor ref={inputEditorCommentRef} placementTools="bottom" className={cx("input__comment")} handleSubmitContent={handleSubmitComment} />
            </div>
        )
    }

    const renderHeaderDetailPost = () => {
        return (
            <>
                <div className={cx("detail__post-header")}>
                    <div className={cx("left__box")}>

                    </div>
                    <h2>Bài viết của {data?.username}</h2>
                    <div className={cx("right__box")}>
                        <Button icon={images.icon.cross_icon} onClick={handleClose} shape="circle" />
                    </div>
                </div>
            </>
        )
    }



    {/* Chi tiết bài đăng */ }
    const renderModalDetailPost = () => {
        return (
            <Modal show={showDetailPost} onHide={handleClose} centered size={"lg"}>
                <CustomBox className={cx("detail__post")} header={renderHeaderDetailPost()} footer={renderFooterDetailPost()} ref={refBoxDetail}>
                    <div className={cx("detail__post-body")}>
                        <HeaderPost data={data} userData={userData} showModalEditPost={showModalEditPost} showConfirmBoxDelete={showConfirmBoxDelete} handleOpenConfirmDeleteModal={handleOpenConfirmDeleteModal} handleOpenEditModal={handleOpenEditModal} />

                        {lstImg.length > 0 ?
                            <div className={cx("", {
                                post__searched: shared
                            })}>
                                <div className={cx("slider__image")}>

                                    <Button className={cx("prev-arrow")} shape={"circle"} onClick={handlePrev} icon={images.icon.arrow_left}>
                                    </Button>

                                    <Button className={cx("next-arrow")} shape={"circle"} onClick={handleNext} icon={images.icon.arrow_right}>
                                    </Button>

                                    <Swiper
                                        modules={[Pagination]}
                                        spaceBetween={50}
                                        slidesPerView={1}
                                        onSlideChange={() => console.log('slide change')}
                                        onSwiper={(swiper) => console.log(swiper)}
                                        zoom={true}
                                        ref={sliderRef}
                                        pagination={true}
                                    >
                                        {lstImg.map((img, index) => {
                                            return (
                                                <SwiperSlide className={cx("image__slider")} key={index}>
                                                    <img src={BASE_URL_MEDIA + img?.name} alt="" />
                                                </SwiperSlide>
                                            )
                                        })}
                                    </Swiper>
                                </div>
                            </div>
                            : null
                        }



                        <div className={cx("info__contact")}>
                            <div className={cx("info__react")}>

                                <div className={cx("info__list-icon")}>
                                    {lstMostReactPost.map(react => {
                                        return (
                                            <div className={cx("info__react-icon")} key={react.id}>
                                                <img src={react.img} alt="" />
                                            </div>
                                        )
                                    })}
                                </div>

                                <div className={cx("info__react-total")}>
                                    {/* <span>Bạn,Minh Ngọc và 900 người khác</span> */}
                                    <span>{likeCount}</span>
                                </div>
                            </div>

                            <div className={cx("info__comment")}>
                                <span>{commentCount} bình luận</span>
                            </div>
                        </div>

                        <div className={cx("tools__contact")}>
                            <div className={cx("react")}
                                onClick={handleReact}
                                id-default={REACT_EMOTION.LIKE.id}
                            >
                                <div className={cx("tools__wrapper")} id-default={REACT_EMOTION.LIKE.id}>
                                    {renderReactEmotion()}
                                </div>
                                <span style={{ color: react.color, padding: "6px 4px" }} className={cx("tools__contact-text", {
                                    active: react.id ? true : false
                                })} id-default={REACT_EMOTION.LIKE.id}>{react.title}</span>
                                <BoxReact ref={refBoxReact} className={cx("box__react")} id-default={REACT_EMOTION.LIKE.id} />
                            </div>

                            <div className={cx("comment")} onClick={handleFocusEditorInput}>
                                <div className={cx("tools__wrapper")}>
                                    <div style={{
                                        backgroundImage: `url('${images.icon.tools__icon}')`,
                                        backgroundPosition: "-22px -132px",
                                        backgroundSize: "190px 190px",
                                        width: "18px",
                                        height: "18px",
                                        backgroundRepeat: "no-repeat",
                                        display: "inline-block",
                                        verticalAlign: "-0.25em"
                                    }} >
                                    </div>
                                </div>
                                <span style={{ padding: "6px 4px" }}>Bình luận</span>
                            </div>
                            <div className={cx("send")}>
                                <div className={cx("tools__wrapper")}>
                                    <div style={{
                                        backgroundImage: `url('${images.icon.tools__icon}')`,
                                        backgroundPosition: "-82px -132px",
                                        backgroundSize: "190px 190px",
                                        width: "18px",
                                        height: "18px",
                                        backgroundRepeat: "no-repeat",
                                        display: "inline-block",
                                        verticalAlign: "-0.25em"
                                    }} >
                                    </div>
                                </div>
                                <span style={{ padding: "6px 4px" }}>Chia sẻ</span>
                            </div>
                        </div>
                        {/* Danh sách bình luận */}
                        <CommentContext.Provider value={{ setCommentCount, commentCount }}>
                            <ListComment idPost={data?.post_id} token={userData?.access_token} content={contentComment} setContent={setContentComment} userData={userData} scrollToBottom={scrollToBottom} />
                        </CommentContext.Provider>
                    </div>
                </CustomBox>
            </Modal>
        )
    }

    const renderImages = () => {
        if (!lstImg) {
            return
        }
        const countImg = lstImg.length;
        const stylesImg = {}
        if (countImg === 1) {
            stylesImg.borderRadius = "0"
            stylesImg.objectFit = "contain"
            stylesImg.padding = "0"
            return (
                <img style={stylesImg} src={BASE_URL_MEDIA + lstImg[0]?.name} onClick={() => setShowDetailPost(true)} />
            )
        } else if (countImg === 2) {
            return (
                <Row className="gx-2">
                    <Col xs={6} md={6}>
                        <img src={BASE_URL_MEDIA + lstImg[0]?.name} onClick={() => setShowDetailPost(true)} />
                    </Col>
                    <Col xs={6} md={6}>
                        <img src={BASE_URL_MEDIA + lstImg[1]?.name} onClick={() => setShowDetailPost(true)} />
                    </Col>
                </Row>
            )
        } else if (countImg === 3) {
            stylesImg.height = "200px"
            return (
                <Row className="gx-2 gy-2">
                    <Col xs={12} md={12}>
                        <img src={BASE_URL_MEDIA + lstImg[0]?.name} onClick={() => setShowDetailPost(true)} />
                    </Col>
                    <Col xs={6} md={6}>
                        <img src={BASE_URL_MEDIA + lstImg[1]?.name} style={stylesImg} onClick={() => setShowDetailPost(true)} />
                    </Col>
                    <Col xs={6} md={6}>
                        <img src={BASE_URL_MEDIA + lstImg[2]?.name} style={stylesImg} onClick={() => setShowDetailPost(true)} />
                    </Col>
                </Row>
            )
        } else if (countImg === 4) {
            stylesImg.height = "200px"
            return (
                <Row className="gx-2 gy-2">
                    <Col xs={12} md={12}>
                        <img src={BASE_URL_MEDIA + lstImg[0]?.name} onClick={() => setShowDetailPost(true)} />
                    </Col>
                    <Col xs={4} md={4}>
                        <img src={BASE_URL_MEDIA + lstImg[1]?.name} style={stylesImg} onClick={() => setShowDetailPost(true)} />
                    </Col>
                    <Col xs={4} md={4}>
                        <img src={BASE_URL_MEDIA + lstImg[2]?.name} style={stylesImg} onClick={() => setShowDetailPost(true)} />
                    </Col>
                    <Col xs={4} md={4}>
                        <img src={BASE_URL_MEDIA + lstImg[3]?.name} style={stylesImg} onClick={() => setShowDetailPost(true)} />
                    </Col>
                </Row>
            )
        } else if (countImg >= 5) {
            stylesImg.height = "200px"
            return (
                <Row className="gx-2 gy-2">
                    <Col xs={12} md={12}>
                        <img src={BASE_URL_MEDIA + lstImg[0]?.name} onClick={() => setShowDetailPost(true)} />
                    </Col>
                    <Col xs={4} md={4}>
                        <img src={BASE_URL_MEDIA + lstImg[1]?.name} style={stylesImg} onClick={() => setShowDetailPost(true)} />
                    </Col>
                    <Col xs={4} md={4}>
                        <img src={BASE_URL_MEDIA + lstImg[2]?.name} style={stylesImg} onClick={() => setShowDetailPost(true)} />
                    </Col>
                    <Col xs={4} md={4}>
                        <div className={cx("layer__forth-pic")} remain-photo="+1">
                            <img src={BASE_URL_MEDIA + lstImg[3]?.name} style={stylesImg} onClick={() => setShowDetailPost(true)} />
                        </div>
                    </Col>
                </Row>
            )
        } else {
            return (<></>)
        }
    }

    const renderModalEditPost = () => {
        return (<Modal show={showModalEditPost} onHide={handleCloseEditModal} centered size={"lg"}>
            <ModalPost data={data} setModalShow={setShowModalEditPost} progress={progress} setProgress={setProgress} handlePost={handlePost} />
        </Modal>)
    }


    return (<div className={cx("box__newfeed", "box-custom")}>
        {/* header newfeed post */}
        <HeaderPost data={data} showModalEditPost={showModalEditPost} showConfirmBoxDelete={showConfirmBoxDelete} handleOpenConfirmDeleteModal={handleOpenConfirmDeleteModal} handleOpenEditModal={handleOpenEditModal} />

        {/* noi dung newfeed post */}
        {shared ? <>
            <div className={cx("post__searched")}>
                <div className={cx("post__searched-body")}>
                    <div className={cx("images", `ps-0 pe-0`)}>
                        {renderImages()}
                    </div>
                </div>

                <div className={cx("post__searched-header")}>
                    <HeaderPost />
                </div>
            </div>
        </> : <>
            <div className={cx("images", `${lstImg == 1 ? "ps-0 pe-0" : ""}`)}>
                {renderImages()}
            </div>
        </>}

        {/* Thông tin tương tác của bài viết */}
        <div className={cx("info__contact")}>
            <div className={cx("info__react")}>

                <div className={cx("info__list-icon")}>
                    {lstMostReactPost.map(react => {
                        return (
                            <div className={cx("info__react-icon")} key={react.id}>
                                <img src={react.img} alt="" />
                            </div>
                        )
                    })}
                </div>

                <div className={cx("info__react-total")}>
                    {/* <span>Bạn,Minh Ngọc và 900 người khác</span> */}
                    <span>{likeCount}</span>
                </div>
            </div>

            <div className={cx("info__comment")}>
                <span>{commentCount} bình luận</span>
            </div>
        </div>


        {/* tool để tương tác với bài viết */}
        <div className={cx("tools__contact")}>
            <div className={cx("react")}
                onClick={handleReact}
                id-default={REACT_EMOTION.LIKE.id}
            >
                <div className={cx("tools__wrapper")} id-default={REACT_EMOTION.LIKE.id}>
                    {renderReactEmotion()}
                </div>
                <span style={{ color: react.color, padding: "6px 4px" }} className={cx("tools__contact-text", {
                    active: react.id ? true : false
                })} id-default={REACT_EMOTION.LIKE.id}>{react.title}</span>
                <BoxReact ref={refBoxReact} className={cx("box__react")} />
            </div>

            <div className={cx("comment")} onClick={handleShow}>
                <div className={cx("tools__wrapper")}>
                    <div style={{
                        backgroundImage: `url('${images.icon.tools__icon}')`,
                        backgroundPosition: "-22px -132px",
                        backgroundSize: "190px 190px",
                        width: "18px",
                        height: "18px",
                        backgroundRepeat: "no-repeat",
                        display: "inline-block",
                        verticalAlign: "-0.25em"
                    }} >
                    </div>
                </div>
                <span style={{ padding: "6px 4px" }}>Bình luận</span>
            </div>
            <div className={cx("send")}>
                <div className={cx("tools__wrapper")}>
                    <div style={{
                        backgroundImage: `url('${images.icon.tools__icon}')`,
                        backgroundPosition: "-82px -132px",
                        backgroundSize: "190px 190px",
                        width: "18px",
                        height: "18px",
                        backgroundRepeat: "no-repeat",
                        display: "inline-block",
                        verticalAlign: "-0.25em"
                    }} >
                    </div>
                </div>
                <span style={{ padding: "6px 4px" }}>Chia sẻ</span>
            </div>
        </div>

        {/* Các modal */}

        {renderModalDetailPost()}

        {renderModalEditPost()}

        <ModalConfirm handlePost={handlePost} title={"bài viết"} progress={progress} setProgress={setProgress} showConfirm={showConfirmBoxDelete} setShowConfirm={setShowConfirmBoxDelete} idPost={idModifiedPost} />

        <LoadingBar
            color='#1b74e4'
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
        />
    </div>);
}

export default memo(BoxNewFeed);