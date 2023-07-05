import {ERole} from "../enums/roleseEnum.ts";

export interface User {
    name: string
    email: string
    password: string
    role: ERole
}
