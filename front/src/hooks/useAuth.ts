import {useLazyGetAuthUserQuery} from "../store/api/authApi.ts";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";


function useAuth() {
    const navigate = useNavigate();

    const [trigger] = useLazyGetAuthUserQuery();

    useEffect(() => {
        trigger()
            .unwrap()
            .catch(() => {
                navigate('/auth/login');
            });
    }, [navigate, trigger]);
}

export default useAuth;