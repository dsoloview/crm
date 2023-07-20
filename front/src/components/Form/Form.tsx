import styles from './Form.module.scss';
import {WithChildrenProps} from "../../types/types.ts";
import {BaseSyntheticEvent} from "react";
import classNames from "classnames";

type Props = {
    onSubmit: ((e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>) | (() => void) | undefined
    className?: string
} & WithChildrenProps;

const Form = ({onSubmit, children, className}: Props) => {
    const classes = classNames(styles.form, className);
    return (
        <form className={classes} onSubmit={onSubmit}>
            {children}
        </form>
    )
}

export default Form;