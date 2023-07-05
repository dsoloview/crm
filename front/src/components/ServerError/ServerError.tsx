import {FC} from "react";

type IServerError = {
    message: string
}
const ServerError: FC<IServerError> = ({message}) => {
    return (
        <div>{message}</div>
    )
}

export default ServerError;