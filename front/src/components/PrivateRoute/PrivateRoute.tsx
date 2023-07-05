import {FC} from "react";
import {WithChildrenProps} from "../../types/types.ts";
import {ERole} from "../../enums/roleseEnum.ts";
import useAuth from "../../hooks/useAuth.ts";

type Props = {
    roles: ERole[]
} & WithChildrenProps

const PrivateRoute: FC<Props> = ({children, roles}) => {
    const auth = useAuth(roles)
    if (auth) {
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