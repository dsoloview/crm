import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {IServerError, IServerValidationError} from "../types/types.ts";

export function getErrorMessage(error: unknown): string {
        if (isServerError(error)) {
        return error.data.message;
        }

    return '';
}

export function isServerValidationError(
    errorData: unknown
): errorData is IServerValidationError {
    if (isFetchBaseQueryError(errorData)) {
        return typeof errorData.data === 'object' && errorData.data != null && 'errors' in errorData.data && 'message' in errorData.data
    }

    return false;
}

export function isServerError(
    errorData: unknown
): errorData is IServerError {
    if (isFetchBaseQueryError(errorData)) {
        return typeof errorData.data === 'object' && errorData.data != null && 'message' in errorData.data
    }

    return false;
}
export function isFetchBaseQueryError(
    error: unknown
): error is FetchBaseQueryError {
    return typeof error === 'object' && error != null && 'status' in error && 'data' in error
}
