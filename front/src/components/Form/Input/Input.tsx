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
    className?: string
    serverError?: string[]
}
const Input: FC<Props> = (
    {
        label,
        type,
        placeholder,
        register,
        error,
        className,
        serverError
    }) => {

    const inputStyles = cx('input', className, {
        "input--error": error || serverError?.length,
    })

    const renderedServerErrors = serverError?.map((error) => {
        return (
            <p key={error} className={styles.serverErrorMessage}>{error}</p>
        )
    });

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
            {renderedServerErrors}
        </div>
    )
}
export default Input;
