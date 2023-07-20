import {isRejectedWithValue, Middleware} from "@reduxjs/toolkit";
import {toast} from "react-toastify";

export const rtkQueryErrorCatcher: Middleware = () => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        if (action.payload.status === 422) {
            toast.error('Validation error')
            return next(action)
        }

        toast.error(action.payload?.data?.message || 'Something went wrong')
    }

    return next(action)
}