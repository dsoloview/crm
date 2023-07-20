import Select from "../Select/Select.tsx";
import {FieldError, FieldValues, Path, UseFormRegister} from "react-hook-form";
import {useGetRolesQuery} from "../../../../store/api/rolesApi.ts";
import {ReactNode} from "react";

type Props<T extends FieldValues> = {
    register: UseFormRegister<T>;
    name: Path<T>;
    error?: FieldError;
    serverError?: string[]
}
const   RolesSelect = <T extends FieldValues,>({register, name, error, serverError}: Props<T>) => {
    const {data: roles, isSuccess: isRolesSuccess} = useGetRolesQuery();
    let renderedRolesOptions: ReactNode = [];
    if (isRolesSuccess) {
        renderedRolesOptions = roles.data.map((role) => {
            return (
                <option key={role.id} value={role.id}>{role.name}</option>
            )
        });

        return (
            <Select serverError={serverError} error={error} register={register(name)}>
                <option value="">Role</option>
                {renderedRolesOptions}
            </Select>
        )
    }


}

export default RolesSelect;