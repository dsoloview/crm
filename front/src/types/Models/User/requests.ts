export interface IUpdateUserRequest {
    id: number
    name: string
    email: string
    password?: string
    password_confirmation?: string
    role: number
}

export interface ICreateUserRequest {
    name: string
    email: string
    password: string
    password_confirmation: string
    role: number
}