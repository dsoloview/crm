import React from "react";

export type WithChildrenProps = {
    children: React.ReactNode;
};

export interface IServerError {
    data: {
        message: string
    }
    status: number,
}

export interface IServerValidationError {
    data: {
        message: string,
        errors: {
            [key: string]: string[]
        }
    }
    status: number,

}
