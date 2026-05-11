import React from "react";
import { useDispatch } from "react-redux";
import toastr from "toastr";
import { setNotification } from "@modules/settings/reducers/platform";

import "toastr/build/toastr.min.css";

export const useNotifier = () => {
    const dispatch = useDispatch();

    return (message, type) => {
        toastr.options = {
            positionClass: "toast-top-right",
            hideDuration: 300,
            timeOut: 3000,
        };
        if (type !== "error") {
            toastr.success(message);
        } else {
            toastr.error(message);
        }
        dispatch(setNotification({message: '', type: 'message'}));
    };
};
