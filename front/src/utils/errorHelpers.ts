import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {IServerError} from "../types/types.ts";

export function getErrorMessage(error: unknown): string {
    if (isFetchBaseQueryError(error)) {
        if (isServerError(error.data)) {
            return error.data.message ?? ''
        }
    }

    return '';
}

export function isServerError(
    errorData: unknown
): errorData is IServerError {
    return typeof errorData === 'object' && errorData != null && 'message' in errorData
}
export function isFetchBaseQueryError(
    error: unknown
): error is FetchBaseQueryError {
    return typeof error === 'object' && error != null && 'status' in error
}