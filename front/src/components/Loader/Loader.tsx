import {Oval} from "react-loader-spinner";
import styles from './Loader.module.scss';
import classNames from "classnames";

type Props = {
    mainLayout?: boolean,
}
const Loader = ({mainLayout}: Props) => {
    const classes = classNames(styles.loader, {
        [styles.mainLayout]: mainLayout
    });
    return (
        <div className={classes}>
            <Oval
                color="#3F57FF"
                secondaryColor="#3F57FF"
            />
        </div>

    )
}

export default Loader;