import {User} from "./User/model.ts";

export interface LoginRequest {
    email: string
    password: string
}

export interface RegisterRequest {
    name: string
    email: string
    password: string
    password_confirmation: string
}

export interface AuthResponse {
    user: User,
    token: string
}
