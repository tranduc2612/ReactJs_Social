import { forwardRef,useRef } from "react";
import styles from "./InputForm.module.scss"
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
import Form from 'react-bootstrap/Form';

function InputForm(props) {
    const { component, children, errorMsg, label, ...inputProps } = props;

    let Comp = component ? Form[`${component}`] : Form.Control;

    return ( 
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <Comp
                className={cx(`${component}`)}
                {...inputProps}
            >
                {children}
            </Comp>
            <Form.Control.Feedback className={cx("error-msg")} type="invalid">{errorMsg || ""}</Form.Control.Feedback>
        </Form.Group>   
    );
}

export default InputForm;