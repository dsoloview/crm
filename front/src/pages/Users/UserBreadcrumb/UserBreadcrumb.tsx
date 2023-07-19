import {useGetUserQuery} from "../../../store/api/usersApi.ts";
import {useParams} from "react-router-dom";

type Props = {
    type: 'show' | 'edit';
}
type TParams = {
    id: string;
}
const UserBreadcrumb = ({type}: Props) => {
    const {id} = useParams<TParams>();
    const {data, isSuccess} = useGetUserQuery(Number(id));

    if (!isSuccess) {
        return ''
    }

    if (type === 'show') {
        return data.data.name;
    } else {
        return `Edit user ${data.data.name}`;
    }
}

export default UserBreadcrumb;