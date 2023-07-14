import {ERole} from "../../enums/roleseEnum.ts";

export interface IUpdateUserRequest {
    id: number
    name: string
    email: string
    password?: string
    password_confirmation?: string
    roles: ERole[]
}

export interface ICreateUserRequest {
    name: string
    email: string
    password: string
    password_confirmation: string
    roles: ERole[]
}