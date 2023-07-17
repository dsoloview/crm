import styles from './Select.module.scss';
import {WithChildrenProps} from "../../../types/types.ts";
import {UseFormRegisterReturn} from "react-hook-form";
import React from "react";
import classNames from "classnames";

type Props = {
    name?: string;
    label?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    register?: UseFormRegisterReturn
    value?: string | number;
    className?: string;
}& WithChildrenProps;
const Select = ({ name, label, children, register, onChange, value, className }: Props) => {
    const classes = classNames(styles.select, className);
    return (
        <div className={styles.selectContainer}>
            {label && <label className={styles.label} htmlFor={name}>{label}</label>}
            <select value={value} onChange={onChange} {...register} className={classes} id={name}>
                {children}
            </select>
        </div>
    )
}

export default Select;