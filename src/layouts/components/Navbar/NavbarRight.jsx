import classNames from "classnames/bind";
import styles from "./NavbarRIght.module.scss";
import Popper from "~/components/Popper/Popper";
import images from "~/assets/images/index";
import BoxNotification from "~/components/BoxNotification/BoxNotification";
import BoxMessenger from "~/components/BoxMessenger/BoxMessenger";
import BoxAvatar from "~/components/BoxAvatar/BoxAvatar";
import { useState, useEffect } from "react";
import checkResponse from "~/utils/checkResponse";
import Pusher from "pusher-js";
import { BASE_URL_MEDIA, Get } from "~/services/base";
import { useSelector } from 'react-redux'


const cx = classNames.bind(styles);



function NavbarRight({ listItem, handleRedirect }) {
    const userData = useSelector((state) => state.auth);
    const [countNoti, setCountNoti] = useState(0);
    const [lstNoti, setLstNoti] = useState([]);
    const [loading, setLoading] = useState(false);
    const InfoButton = [
        {
            id: 1,
            title: "setting",
            icon: images.icon.menu_dot_icon,
            full_icon: false,
            count_seen: 0,
            lstData: [],
            box_popper: null
        },
        {
            id: 2,
            title: "messenger",
            icon: images.icon.messenger_dark_icon,
            full_icon: false,
            count_seen: 0,
            lstData: [],
            box_popper: BoxMessenger,
            loading: loading
        },
        {
            id: 3,
            title: "bell",
            icon: images.icon.bell_icon,
            full_icon: false,
            count_seen: countNoti,
            lstData: lstNoti,
            box_popper: BoxNotification,
            loading: loading
        },
        {
            id: 4,
            title: "avatar",
            icon: BASE_URL_MEDIA + userData.data_user?.avatar,
            full_icon: true,
            count_seen: 0,
            box_popper: BoxAvatar
        }
    ]

    function notifyMe(message) {
        if (!("Notification" in window)) {
            // Check if the browser supports notifications
            alert("This browser does not support desktop notification");
        } else if (Notification.permission === "granted") {
            const options = {
                icon: '', // Replace 'path_to_your_icon.png' with the actual path to your custom icon
            };
            const notification = new Notification(message, options);
            // …
        } else if (Notification.permission !== "denied") {
            // We need to ask the user for permission
            Notification.requestPermission().then((permission) => {
                // If the user accepts, let's create a notification with a custom icon
                if (permission === "granted") {
                    const options = {
                        icon: 'path_to_your_icon.png', // Replace 'path_to_your_icon.png' with the actual path to your custom icon
                    };
                    const notification = new Notification(message, options);
                    // …
                }
            });
        }
    }


    useEffect(() => {
        setLoading(true)
        // const pusher = new Pusher('83b6c124825dc255f114', {
        //     cluster: 'ap1',
        //     encrypted: true,
        // });

        // const channel = pusher.subscribe('private.tra-vh');

        // channel.bind('message', function (data) {
        //     console.log(data);
        // });
        // window.Echo = new Echo({
        //     broadcaster: 'pusher',
        //     key: '83b6c124825dc255f114',
        //     cluster: 'ap1'
        // });

        // window.Echo.private(`private.tra-vh`)
        //     .listen('message', (e) => {
        // });

        Get("/notification", {}, userData.access_token)
            .then(res => {
                if (checkResponse(res)) {
                    setLstNoti((prev) => [
                        ...res.returnObj, ...prev
                    ])
                }
                const pusher = new Pusher('83b6c124825dc255f114', {
                    cluster: 'ap1'
                })

                // Đăng ký kênh bạn muốn lắng nghe
                const channel = pusher.subscribe(`private.${userData.data_user?.username}`);

                // Lắng nghe sự kiện từ kênh
                channel.bind("notification", (data) => {
                    const jsonRes = data?.data;
                    if (jsonRes) {
                        const dataRes = JSON.parse(jsonRes)[0];
                        setLstNoti((prev) => [dataRes, ...prev])
                        setCountNoti((prev) => prev + 1);
                        notifyMe(dataRes?.content)
                    }


                    console.log("Received a new post event:", data);
                    // Xử lý thông báo realtime ở đây
                });
            })
            .catch(err => {

            })
            .finally((res) => {
                setLoading(false)
            })

    }, []);
    return (<>
        {/* <Popper key={InfoButton[0].id} item={InfoButton[0]} PopperRender={null} />
        <Popper key={InfoButton[1].id} item={InfoButton[1]} PopperRender={BoxMessenger} />
        <Popper key={InfoButton[2].id} item={InfoButton[2]} PopperRender={BoxNotification} />
        <Popper key={InfoButton[3].id} item={InfoButton[3]} PopperRender={BoxAvatar} /> */}
        {InfoButton.map(e => {
            let Comp = e.box_popper;
            // let props ={}
            // if(Comp != null){
            //     props.
            // }
            return (
                <Popper key={e.id} item={e} PopperRender={Comp} handleRedirect={handleRedirect} />
            )
        })}
    </>);
}

export default NavbarRight;