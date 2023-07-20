import styles from './Select.module.scss';
import {WithChildrenProps} from "../../../../types/types.ts";
import {FieldError, UseFormRegisterReturn} from "react-hook-form";
import React from "react";
import classNames from "classnames";

type Props = {
    name?: string;
    label?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    register?: UseFormRegisterReturn
    defaultValue?: string | number;
    value?: string | number;
    className?: string;
    error?: FieldError;
    serverError?: string[];
}& WithChildrenProps;
const Select = ({ name, label, children, register, defaultValue, className, error, serverError }: Props) => {
    const classes = classNames(styles.select, className, {
        [styles['select--error']]: error || serverError?.length,
    });

    const renderedServerErrors = serverError?.map((error) => {
        return (
            <p key={error} className={styles.serverErrorMessage}>{error}</p>
        )
    });

    return (
        <div className={styles.selectContainer}>
            {label && <label className={styles.label} htmlFor={name}>{label}</label>}
            <select defaultValue={defaultValue} {...register} className={classes} id={name}>
                {children}
            </select>
            {error && <p className={styles.errorMessage}>{error.message}</p>}
            {renderedServerErrors}
        </div>
    )
}

export default Select;