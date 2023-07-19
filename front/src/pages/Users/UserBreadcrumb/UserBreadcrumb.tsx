import {useGetUserQuery} from "../../../store/api/usersApi.ts";
import {useParams} from "react-router-dom";
import {TParamsId} from "../../../types/params.ts";

type Props = {
    type: 'show' | 'edit';
}

const UserBreadcrumb = ({type}: Props) => {
    const {id} = useParams<TParamsId>();
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