import styles from "./BoxNewFeed.module.scss"
import classNames from "classnames/bind";
import images from "~/assets/images/index";
import Button from "~/components/Button/Button"
import {REACT_EMOTION} from "~/utils/constant"

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from "react";

const cx = classNames.bind(styles);

let LIST_ANH = [
    "https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/376926895_1496276191128285_7099614686623273120_n.jpg?stp=dst-jpg_p720x720&_nc_cat=103&ccb=1-7&_nc_sid=5614bc&_nc_ohc=LOif7F50Od0AX8KXjgQ&_nc_ht=scontent.fhan14-3.fna&oh=00_AfDClVzwMldQrZYDV58Am27uKD3xP5gbGUDBOooduGYqMw&oe=65059FFE",
    "https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/377435151_1496276197794951_4610023914367612865_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5614bc&_nc_ohc=_4dC9nPVX8MAX9lPxjd&_nc_ht=scontent.fhan14-2.fna&oh=00_AfA54DjvtudOZGvCskC3LxwR8-mFaZ6bK8ja89ZPC_tU9Q&oe=6504CD5C",
    "https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/377428899_1496276231128281_4489190860878635243_n.jpg?stp=cp6_dst-jpg&_nc_cat=105&ccb=1-7&_nc_sid=5614bc&_nc_ohc=SaLsJ2cCJMYAX-S8fyB&_nc_ht=scontent.fhan14-1.fna&oh=00_AfBHSyzBY0h3F8g0YryQG2-65RTSxvv2CjAlOapJMtBreA&oe=6504EF17",
    "https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/377428899_1496276231128281_4489190860878635243_n.jpg?stp=cp6_dst-jpg&_nc_cat=105&ccb=1-7&_nc_sid=5614bc&_nc_ohc=SaLsJ2cCJMYAX-S8fyB&_nc_ht=scontent.fhan14-1.fna&oh=00_AfBHSyzBY0h3F8g0YryQG2-65RTSxvv2CjAlOapJMtBreA&oe=6504EF17",
    "https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/377428899_1496276231128281_4489190860878635243_n.jpg?stp=cp6_dst-jpg&_nc_cat=105&ccb=1-7&_nc_sid=5614bc&_nc_ohc=SaLsJ2cCJMYAX-S8fyB&_nc_ht=scontent.fhan14-1.fna&oh=00_AfBHSyzBY0h3F8g0YryQG2-65RTSxvv2CjAlOapJMtBreA&oe=6504EF17",
]

const renderImages = () =>{
    const countImg = LIST_ANH.length;
    const stylesImg = {}
    if(countImg === 1){
        stylesImg.borderRadius = "0"
        stylesImg.objectFit = "contain"
        return (
            <img style={stylesImg} src={LIST_ANH[0]} />
        )
    }else if(countImg === 1){
        return (
            <Row className="gx-2">
                <Col xs={6} md={6}>
                    <img src={LIST_ANH[0]} />
                </Col>
                <Col xs={6} md={6}>
                    <img src={LIST_ANH[1]} />
                </Col>
            </Row>
        )
    }else if(countImg === 3){
        stylesImg.height = "200px"
        return (
            <Row className="gx-2 gy-2">
                <Col xs={12} md={12}>
                    <img src={LIST_ANH[0]}/>
                </Col>
                <Col xs={6} md={6}>
                    <img src={LIST_ANH[1]} style={stylesImg}/>
                </Col>
                <Col xs={6} md={6}>
                    <img src={LIST_ANH[2]} style={stylesImg}/>
                </Col>
            </Row>
        )
    }else if(countImg === 4){
        stylesImg.height = "200px"
        return (
            <Row className="gx-2 gy-2">
                <Col xs={12} md={12}>
                    <img src={LIST_ANH[0]}/>
                </Col>
                <Col xs={4} md={4}>
                    <img src={LIST_ANH[1]} style={stylesImg}/>
                </Col>
                <Col xs={4} md={4}>
                    <img src={LIST_ANH[2]} style={stylesImg}/>
                </Col>
                <Col xs={4} md={4}>
                    <img src={LIST_ANH[3]} style={stylesImg}/>
                </Col>
            </Row>
        )    
    }else if(countImg >= 5){
        stylesImg.height = "200px"
       return (
            <Row className="gx-2 gy-2">
                <Col xs={12} md={12}>
                    <img src={LIST_ANH[0]}/>
                </Col>
                <Col xs={4} md={4}>
                    <img src={LIST_ANH[1]} style={stylesImg}/>
                </Col>
                <Col xs={4} md={4}>
                    <img src={LIST_ANH[2]} style={stylesImg}/>
                </Col>
                <Col xs={4} md={4}>
                    <div className={cx("layer__forth-pic")} remain-photo="+1">
                        <img src={LIST_ANH[3]} style={stylesImg}/>
                    </div>
                </Col>
            </Row>
        )
    }else{
        return (<></>)
    }
}

// like color: rgb(32, 120, 244);
// tym color: rgb(243, 62, 88);
// thuongthuong,haha,wow,sad, : color: rgb(247, 177, 37);
// phan no :color: rgb(233, 113, 15);



function BoxNewFeed() {
    const BASE_STATE_REACT = {
        id: null,
        title: "Thích",
        color: null,
        img: null
    }
    const [react,setReact] = useState(BASE_STATE_REACT);

    const handleLike = () =>{
        if(react.id !== null){
            setReact({
                ...BASE_STATE_REACT
            })
        }else{
            setReact({
                ...REACT_EMOTION.WOW
            })
        }
    }

    const renderReactEmotion = () =>{
        if(react.id === null){
            return (
                <div style={{
                    backgroundImage: `url('${images.icon.tools__icon}')`,
                    backgroundSize: "190px 190px",
                    width: "18px",
                    height: "18px",
                    backgroundRepeat: "no-repeat",
                    display: "inline-block",
                }} className={cx("tools__contact-icon",{
                    active: false
                })}>
                </div>
            )
        }else if(react.id === REACT_EMOTION.LIKE.id){
            return (
                <div style={{
                    backgroundImage: `url('${images.icon.tools__icon}')`,
                    backgroundSize: "190px 190px",
                    width: "18px",
                    height: "18px",
                    backgroundRepeat: "no-repeat",
                    display: "inline-block",
                }} className={cx("tools__contact-icon",{
                    active: true
                })}>
                </div>
            )
        }else{
            return(
                <img className={cx("active")} src={react.img} alt="" />
            )
        }
    }

    return ( <div className={cx("box__newfeed","box-custom")}>
        <div className={cx("header")}>
            <div className={cx("header__left")}>
                <div className={cx("avatar")}>
                    <Button icon={images.icon.avatar_demo} full_icon={true} shape="circle" />
                </div>
                <div className={cx("info")}>
                    <div className={cx("name__author")}>
                        <span>Chi Nguyễn</span>
                    </div>

                    <div className={cx("time__created")}>
                        <span>1 ngày</span>
                        <span className={cx("privacy")}><img className={cx("privacy_icon")} src={images.icon.public_icon} /></span>
                    </div>
                </div>
            </div>

            <div className={cx("header__right")}>
                <div className={cx("setting")}>
                    <Button icon={images.icon.three_dot_icon} size={"sm"} shape="circle"/>
                </div>
            </div>
        </div>

        <div className={cx("title")}>
            <span>Nếu anh là người tốt thì mai mốt mình làm người tình !</span>
        </div>

        <div className={cx("images",`${LIST_ANH.length == 1 ? "ps-0 pe-0" : ""}`)}>
            {renderImages()}
        </div>
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
                    <span>Bạn,Minh Ngọc và 900 người khác</span>
                </div>
            </div>

            <div className={cx("info__comment")}>
                <span>65 bình luận</span>
            </div>
        </div>

        <div className={cx("tools__contact")}>
            <div className={cx("react")} onClick={handleLike}>
                <div className={cx("tools__wrapper")}>
                    {renderReactEmotion()}
                </div>
                <span style={{color: react.color,padding: "6px 4px"}} className={cx("tools__contact-text",{
                    active: react.id ? true : false
                })}>{react.title}</span>
            </div>
            <div className={cx("comment")}>
                    <div className={cx("tools__wrapper")}>
                        <div style={{
                            backgroundImage: `url('${images.icon.tools__icon}')`,
                            backgroundPosition: "-22px -132px",
                            backgroundSize: "190px 190px",
                            width: "18px",
                            height: "18px",
                            backgroundRepeat: "no-repeat",
                            display: "inline-block",
                            "vertical-align": "-0.25em"
                        }} >
                        </div>
                    </div>
                    <span style={{padding: "6px 4px"}}>bình luận</span>
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
                            "vertical-align": "-0.25em"
                        }} >
                        </div>
                    </div>
                <span style={{padding: "6px 4px"}}>Chia sẻ</span>
            </div>
        </div>
    </div> );
}

export default BoxNewFeed;