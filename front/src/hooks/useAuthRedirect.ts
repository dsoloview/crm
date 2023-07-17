import {useSelector} from "react-redux";
import {RootStore} from "../store/store.ts";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useLazyGetUserQuery} from "../store/api/authApi.ts";

function useAuthRedirect() {
    const { token } = useSelector((state: RootStore) => state.auth);
    const navigate = useNavigate();
    const [trigger] = useLazyGetUserQuery();

    useEffect(() => {
        if (token) {
            trigger()
                .unwrap()
                .then(() => {
                    navigate('/');
                });
        }
    });
}

export default useAuthRedirect;