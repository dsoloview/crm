import {FC, HTMLInputTypeAttribute} from "react";
import styles from './Input.module.scss';
import {FieldError, UseFormRegisterReturn} from "react-hook-form";
import classNames from 'classnames/bind';

let cx = classNames.bind(styles);

type Props = {
    label?: string
    type: HTMLInputTypeAttribute
    placeholder?: string
    error?: FieldError
    register: UseFormRegisterReturn
}
const Input: FC<Props> = (
    {
        label,
        type,
        placeholder,
        register,
        error,
    }) => {
    const inputStyles = cx('input', {
        "input--error": error
    })
    return (
        <div className={styles.inputContainer}>
            {label && <label className={styles.label}>{label}</label>}
        <input
            {...register}
            className={inputStyles}
            type={type}
            placeholder={placeholder}
        />
            {error && <p className={styles.errorMessage}>{error.message}</p>}
        </div>
    )
}
export default Input;
