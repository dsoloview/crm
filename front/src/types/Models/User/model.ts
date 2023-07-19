import {Role} from "../Role/model.ts";

export interface User {
    id: number
    name: string
    email: string
    password: string
    roles: Role[]
    created_at: string
    updated_at: string
}