import React from "react";

export type WithChildrenProps = {
    children: React.ReactNode;
};

export interface IServerError {
    status: number,
    message: string
}

export interface IServerResponse<T> {
    data: T,
}

export interface ILogoutResponse {
    message: 'Logged out'
}