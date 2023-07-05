import {useSelector} from "react-redux";
import {RootStore} from "../../store/store.ts";

function Home() {
    const {user} = useSelector((store: RootStore) => {
        return store.auth
    })

    return (
        <div>
            Hello {user?.name}
        </div>
    )
}

export default Home;