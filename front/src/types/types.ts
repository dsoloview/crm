import React from "react";

export type WithChildrenProps = {
    children: React.ReactNode;
};

export interface IServerError {
    status: number,
    message: string
}

