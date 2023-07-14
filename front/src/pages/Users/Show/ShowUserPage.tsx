import {useParams} from "react-router-dom";
import {useGetUserQuery} from "../../../store/api/usersApi.ts";

type TParams = {
    id: string;
}
const ShowUserPage = () => {
    const {id} = useParams<TParams>();
    const {data, isSuccess} = useGetUserQuery(Number(id));
    if (!isSuccess) {
        return <div>Loading...</div>
    }

    return (
        <div>
            {data.data.id}
            {data.data.name}
            {data.data.email}
        </div>
    )
}

export default ShowUserPage;