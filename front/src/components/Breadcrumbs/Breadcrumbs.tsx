import styles from './Breadcrumbs.module.scss';
import classNames from "classnames";
import {Link, Params, useMatches} from "react-router-dom";

type Props = {
    className?: string;
}

type useMatchesType = {
    id: string;
    params: Params<string>;
    pathname: string;
    handle: {
        crumb: () => string;
    }
    data: unknown;
}
const Breadcrumbs = ({className}: Props) => {
    const matches = useMatches() as useMatchesType[];
    console.log(matches);
    const filteredMatches = matches
        .filter(match => match.handle?.crumb)

        const renderedBreadcrumbs = filteredMatches.map((match, index) => {
            return (
                <div key={match.id} className={styles.crumb}>
                    <Link className={styles.crumbLink} to={match.pathname} key={index}>{match.handle.crumb()}</Link>
                    {index !== filteredMatches.length - 1 && <span className={styles.crumbSeparator}>/</span>}
                </div>
            )
    })

    const classes = classNames(styles.breadcrumbs, className);
    return (
        <div className={classes}>
            {renderedBreadcrumbs}
        </div>
    )
}

export default Breadcrumbs;