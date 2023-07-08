import {useSelector} from "react-redux";
import {RootStore, useAppDispatch} from "../store/store.ts";
import {setToken} from "../store/slices/authSlice.ts";
import {useNavigate} from "react-router-dom";
import {useGetUserQuery} from "../store/api/authApi.ts";
import {ERole} from "../enums/roleseEnum.ts";

function useAuth(roles: ERole[]): boolean {
    const {token} = useSelector((state: RootStore) => {
        return state.auth
    })
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    if (!token) {
        const localStorageToken = localStorage.getItem('token')
        if (!localStorageToken) {
            navigate('/auth/login')
        } else {
            dispatch(setToken(localStorageToken))
        }
    }

    const {data, isSuccess, isError} = useGetUserQuery()

    if (isSuccess) {
        if (data.data && !roles.some(role => data.data.roles.includes(role))) {
            return false;
        }
    }

    if (isError) {
        navigate('/auth/login')
    }

    return true;


}

export default useAuth;