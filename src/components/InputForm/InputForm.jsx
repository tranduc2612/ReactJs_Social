import { forwardRef,useRef } from "react";
import styles from "./InputForm.module.scss"
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
import Form from 'react-bootstrap/Form';

function InputForm(props) {
    const { component, children, errorMsg, label, size, ...inputProps } = props;

    let Comp = component ? Form[`${component}`] : Form.Control;

    return ( 
        <Form.Group>
            {(label && component != "Check") ? <Form.Label>{label}</Form.Label> : null}
            <Comp
                className={cx(`${component}`, `${size}`)}
                {...inputProps}
                label={label}
            >
                {children}
            </Comp>
            <Form.Control.Feedback className={cx("error-msg")} type="invalid">{errorMsg}</Form.Control.Feedback>
            
        </Form.Group>   
    );
}

export default InputForm;