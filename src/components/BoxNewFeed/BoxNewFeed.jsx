import { useRef, useState, useCallback, useMemo } from "react";
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
import { BASE_URL_MEDIA } from "~/services/base";
import LoadingBar from 'react-top-loading-bar';
import { useEffect } from "react";
const cx = classNames.bind(styles);

// like color: rgb(32, 120, 244);
// tym color: rgb(243, 62, 88);
// thuongthuong,haha,wow,sad, : color: rgb(247, 177, 37);
// phan no :color: rgb(233, 113, 15);

function BoxNewFeed({ data, shared }) {
    const BASE_STATE_REACT = {
        id: null,
        title: "Thích",
        color: null,
        img: null
    }
    const refBoxReact = useRef(null);
    const inputEditorCommentRef = useRef(null);
    const [react, setReact] = useState(BASE_STATE_REACT);
    const [showDetailPost, setShowDetailPost] = useState(false);
    const [showConfirmBoxDelete, setShowConfirmBoxDelete] = useState(false);
    const [showModalEditPost, setShowModalEditPost] = useState(false);
    const [idModifiedPost, setIdModifiedPost] = useState(null);
    const [progress, setProgress] = useState(0)
    const [lstMostReactPost, setLstMostReactPost] = useState([]);


    const [lstImg, setlstImg] = useState([]);
    useEffect(()=>{
        if (data?.media_info) {
            const imgData = JSON.parse(data?.media_info)?.file_info;
            setlstImg(imgData)
            return
        }
        setlstImg([])
    },[data])
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

    const handleReact = (e) => {
        const key = e.target.getAttribute('id-icon');
        if (key !== null) {
            const objReact = REACT_EMOTION[key]
            if (objReact !== null) {
                setReact({
                    ...objReact
                })
            }
        } else {
            const keyDefault = e.target.getAttribute('id-default');
            if (keyDefault !== null) {
                const objReact = REACT_EMOTION[keyDefault]
                if (react.id != null) {
                    setReact({
                        ...BASE_STATE_REACT
                    })
                } else {
                    setReact({
                        ...objReact
                    })
                }
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

    const renderFooterDetailPost = () => {
        return (
            <div className={cx("detail__post-footer")}>
                <Button className={cx("avatar")} icon={images.icon.avatar_demo} shape="circle" full_icon={true} />
                <InputEditor ref={inputEditorCommentRef} placementTools="bottom" className={cx("input__comment")} />
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
                <CustomBox className={cx("detail__post")} header={renderHeaderDetailPost()} footer={renderFooterDetailPost()}>
                    <div className={cx("detail__post-body")}>
                        <HeaderPost data={data} showModalEditPost={showModalEditPost} showConfirmBoxDelete={showConfirmBoxDelete} handleOpenConfirmDeleteModal={handleOpenConfirmDeleteModal} handleOpenEditModal={handleOpenEditModal} />

                        {lstImg ?
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
                                    {/* <div className={cx("info__react-icon")}>
                                    <img src={images.icon.like} alt="" />
                                </div>

                                <div className={cx("info__react-icon")}>
                                    <img src={images.icon.buon} alt="" />
                                </div>

                                <div className={cx("info__react-icon")}>
                                    <img src={images.icon.thuongthuong} alt="" />
                                </div> */}
                                </div>

                                <div className={cx("info__react-total")}>
                                    {/* <span>Bạn,Minh Ngọc và 900 người khác</span> */}
                                    <span>{data?.like_count}</span>
                                </div>
                            </div>

                            <div className={cx("info__comment")}>
                                <span>65 bình luận</span>
                            </div>
                        </div>

                        <div className={cx("tools__contact")}>
                            <div className={cx("react")}
                                onClick={handleReact}
                                id-default={REACT_EMOTION.LIKE.id}
                            >
                                <div className={cx("tools__wrapper")}>
                                    {renderReactEmotion()}
                                </div>
                                <span style={{ color: react.color, padding: "6px 4px" }} className={cx("tools__contact-text", {
                                    active: react.id ? true : false
                                })} id-default={REACT_EMOTION.LIKE.id}>{react.title}</span>
                                <BoxReact ref={refBoxReact} className={cx("box__react")} />
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
                        <ListComment />
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
            <ModalPost data={data} setModalShow={setShowModalEditPost} progress={progress} setProgress={setProgress} />
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

                    <div className={cx("info__react-icon")}>
                        <img src={images.icon.like} alt="" />
                    </div>

                    <div className={cx("info__react-icon")}>
                        <img src={images.icon.buon} alt="" />
                    </div>

                    <div className={cx("info__react-icon")}>
                        <img src={images.icon.thuongthuong} alt="" />
                    </div>
                </div>

                <div className={cx("info__react-total")}>
                    {/* <span>Bạn,Minh Ngọc và 900 người khác</span> */}
                    <span>{data?.like_count}</span>
                </div>
            </div>

            <div className={cx("info__comment")}>
                <span>{data?.comment_count} bình luận</span>
            </div>
        </div>


        {/* tool để tương tác với bài viết */}
        <div className={cx("tools__contact")}>
            <div className={cx("react")}
                onClick={handleReact}
                id-default={REACT_EMOTION.LIKE.id}
            >
                <div className={cx("tools__wrapper")}>
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

        <ModalConfirm title={"bài viết"} progress={progress} setProgress={setProgress} showConfirm={showConfirmBoxDelete} setShowConfirm={setShowConfirmBoxDelete} idPost={idModifiedPost} />

        <LoadingBar
            color='#1b74e4'
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
        />
    </div>);
}

export default BoxNewFeed;