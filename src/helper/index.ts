import { firebaseErrorCode } from "@/constants";
import { FirebaseError } from "firebase/app";
import { toast } from "react-hot-toast";

export const customErrorMessage = (error: FirebaseError) => {
    let errorMessage = "";
    switch (error.code) {
        case firebaseErrorCode.invalidUsername:
            errorMessage =
                "Sorry, we can't find an account with this email. Please try again";
            break;
        case firebaseErrorCode.invalidPassword:
            errorMessage = "Incorrect password. Please try again";
            break;
        case firebaseErrorCode.invalidUser:
            errorMessage = "Username already in use";
            break;
    }
    return toast.error(errorMessage);
};
