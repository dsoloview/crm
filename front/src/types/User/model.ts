import {ERole} from "../../enums/roleseEnum.ts";

export interface User {
    id: number
    name: string
    email: string
    password: string
    roles: ERole[]
    created_at: string
    updated_at: string
}