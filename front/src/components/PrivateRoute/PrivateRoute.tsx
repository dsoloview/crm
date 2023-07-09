import {FC} from "react";
import {WithChildrenProps} from "../../types/types.ts";
import {ERole} from "../../enums/roleseEnum.ts";
import useAuth from "../../hooks/useAuth.ts";
import {useSelector} from "react-redux";
import {RootStore} from "../../store/store.ts";

type Props = {
    roles: ERole[]
} & WithChildrenProps

const PrivateRoute: FC<Props> = ({children, roles}) => {
    useAuth()

    const {user} = useSelector((state: RootStore) => state.auth);

    if (!user) {
        return null
    }

    if (user?.roles.some(role => roles.includes(role))) {
        return (
            <>
                {children}
            </>
        )
    } else {
        return (
            <div>You don't have permission</div>
        )
    }
}

export default PrivateRoute;