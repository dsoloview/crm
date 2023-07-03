import styles from './Button.module.scss';
import cnBind from "classnames/bind";
import {FC} from "react";

let cx = cnBind.bind(styles);

type Props = {
    type: "submit" | "button" | "reset",
    transparent?: boolean
    children?: string
    onClick?: () => void
    disabled?: boolean
    className?: string
    [x:string]: any
};

const Button: FC<Props> = (
    {
        type,
        transparent,
        children,
        disabled,
        onClick,
        className,
        ...rest
    }) => {

    const classNames = cx('button', className, {
        transparent: transparent,
    })

    return (
        <button type={type} className={classNames} disabled={disabled} onClick={onClick} {...rest}>
            {children}
        </button>
    )
}

Button.defaultProps = {
    transparent: false,
    disabled: false,
    onClick: () => {}
}

export default Button;
