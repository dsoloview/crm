import React, {FC, HTMLInputTypeAttribute} from "react";
import styles from './Input.module.scss';
import {UseFormRegister} from "react-hook-form";

type Props = {
    label?: string
    name: string
    type: HTMLInputTypeAttribute
    placeholder?: string
    value?: string
    required?: boolean
    register?: UseFormRegister<any>
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    [x:string]: any
}
const Input: FC<Props> = (
    {
        name,
        required,
        label,
        type,
        placeholder,
        value,
        register,
        onChange,
        ...rest
    }) => {
    return (
        <div className={styles.inputContainer}>
            {label && <label className={styles.label}>{label}</label>}
        <input
            required={required}
            className={styles.input}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...register(name, {required})}
            {...rest}
        />
        </div>
    )
}

export default Input;
