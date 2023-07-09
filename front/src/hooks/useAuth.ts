import {useLazyGetUserQuery} from "../store/api/authApi.ts";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";


function useAuth(): void {
    const navigate = useNavigate();

    const [trigger] = useLazyGetUserQuery();

    useEffect(() => {
        trigger()
            .unwrap()
            .catch(() => {
                navigate('/auth/login');
            });
    }, [navigate, trigger]);
}

export default useAuth;