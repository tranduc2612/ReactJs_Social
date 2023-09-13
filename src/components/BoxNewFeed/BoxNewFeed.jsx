import styles from "./BoxNewFeed.module.scss"
import classNames from "classnames/bind";
import images from "~/assets/images/index";
import Button from "~/components/Button/Button"


import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

function BoxNewFeed() {

    

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
                <div className={cx("info__react-icon")}>
                    <span>
                        <img src="" alt="" />
                    </span>
                </div>
                <div className={cx("info__react-amount")}>
                    Bạn và 900 người khác
                </div>
            </div>

            <div className={cx("info__comment")}>
                65 comment
            </div>
        </div>

        <div className={cx("tools__contact")}>
            <div className={cx("react")}>
                like
            </div>
            <div className={cx("comment")}>
                comment
            </div>
            <div className={cx("send")}>
                gửi
            </div>
        </div>

        <div className={cx("list__comment")}>
            list comment
        </div>
    </div> );
}

export default BoxNewFeed;