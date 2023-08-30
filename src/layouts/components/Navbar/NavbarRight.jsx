import classNames from "classnames/bind";
import Button from "~/components/Button/Button";
import styles from "./NavbarRIght.module.scss";
import Popper from "~/components/Popper/Popper";

const cx = classNames(styles);

function NavbarRight({listItem}) {

    return ( <>
            {listItem.map(e=>(
                <Popper key={e.key} className={"custom"}>
                    <Button key={e.id} icon={e.icon} full_icon={e.full_icon} size={"xl"} />    
                </Popper>
            ))}
    </> );
}

export default NavbarRight;