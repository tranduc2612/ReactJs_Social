import classNames from "classnames/bind";
import styles from "./NavbarRIght.module.scss";
import Popper from "~/components/Popper/Popper";
import images from "~/assets/images/index";
import BoxNotification from "~/components/BoxNotification/BoxNotification";
import BoxMessenger from "~/components/BoxMessenger/BoxMessenger";

const cx = classNames.bind(styles);

const InfoButton =[
    {
        id: 1,
        title: "setting",
        icon:images.icon.menu_dot_icon,
        full_icon: false,
        box_popper: null 
    },
    {
        id: 2,
        title: "messenger",
        icon: images.icon.messenger_dark_icon,
        full_icon: false,
        box_popper: BoxMessenger
    },
    {
        id: 3,
        title: "bell",
        icon: images.icon.bell_icon,
        full_icon: false,
        // box_popper: null
        box_popper: BoxNotification
    },
    {
        id: 4,
        title: "avatar",
        icon: images.icon.avatar_demo,
        full_icon: true,
        box_popper: null
    }
]

function NavbarRight({listItem}) {
    return ( <>
            {InfoButton.map(e=>{
                let Comp = e.box_popper;
                // let props ={}
                // if(Comp != null){
                //     props.
                // }
                return (
                    <Popper key={e.id} item={e} PopperRender={Comp} />
                )
            })}
    </> );
}

export default NavbarRight;