import {useNavigate, useParams} from "react-router-dom";
import {useGetUserQuery} from "../../../store/api/usersApi.ts";
import MainLayout from "../../../layouts/main/MainLayout.tsx";
import {TParamsId} from "../../../types/params.ts";
import Loader from "../../../components/Loader/Loader.tsx";
import ShowList from "../../../components/ShowList/ShowList.tsx";
import ShowListItem from "../../../components/ShowList/ShownListItem/ShowListItem.tsx";
import Button from "../../../components/Button/Button.tsx";
import styles from './ShowUserPage.module.scss';

const ShowUserPage = () => {
    const {id} = useParams<TParamsId>();
    const {data, isSuccess} = useGetUserQuery(Number(id));
    const navigate = useNavigate();
    if (!isSuccess) {
        return (
            <MainLayout>
                <Loader />
            </MainLayout>
        )
    }

    return (
        <MainLayout>
            <div className={styles.header}>
                <h1>User {data.data.id}</h1>
                <Button type="button" onClick={() => navigate(`/users/${data.data.id}/edit`)}>Edit</Button>
            </div>

            <ShowList >
                <ShowListItem
                    name="Name"
                    value={data.data.name}
                />
                <ShowListItem
                    name="Email"
                    value={data.data.email}
                />
                <ShowListItem
                    name="Role"
                    value={data.data.roles.map((role) => role.name).join(', ')}
                />
            </ShowList>
        </MainLayout>
    )
}

export default ShowUserPage;