import {useSelector} from "react-redux";
import {RootStore} from "../../store/store.ts";
import Logout from "../../components/Logout/Logout.tsx";

function Home() {
    const {user} = useSelector((store: RootStore) => {
        return store.auth
    })

    return (
        <div>
            Hello {user?.name}
            <Logout />
        </div>
    )
}

export default Home;