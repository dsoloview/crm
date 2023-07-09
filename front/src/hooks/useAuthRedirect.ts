import {useSelector} from "react-redux";
import {RootStore} from "../store/store.ts";
import {useLazyGetUserQuery} from "../store/api/authApi.ts";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {skipToken} from "@reduxjs/toolkit/query";

function useAuthRedirect() {
    const { token } = useSelector((state: RootStore) => state.auth);

    const arg: any = token;
    const [trigger] = useLazyGetUserQuery(arg ?? skipToken);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            trigger()
                .unwrap()
                .then(() => {navigate('/')});
        }
    }, [trigger, navigate, token]);

    if (!token) {
        return;
    }
}

export default useAuthRedirect;