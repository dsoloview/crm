import {useSelector} from "react-redux";
import {RootStore} from "../../store/store.ts";
import Logout from "../../components/Logout/Logout.tsx";
import MainLayout from "../../layouts/main/MainLayout.tsx";

function Home() {
    const {user} = useSelector((store: RootStore) => {
        return store.auth
    })

    return (
        <MainLayout>
            <div>
                Hello {user?.name}
                <Logout />
            </div>
        </MainLayout>
    )
}

export default Home;