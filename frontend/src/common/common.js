import { EMAIL_REGEX, PASS_REGEX } from "../constants/constant";

export const validateEmail = (email) => {
    if (!email) {
        return "Email required";
    } else if (!email.match(EMAIL_REGEX)) {
        return "Invalid email";
    }
}

export const validatePassword = (pass) => {
    if (!pass) {
        return "Password is required";
    } else if (!pass.match(PASS_REGEX)) {
        return "Password should have one uppercase, one lowercase, one Special character and one Number";
    }
}

export const validateCPassword = (pass, cpass) => {
    if (!cpass) {
        return "Password is required";
    } else if (pass !== cpass) {
        return "Password not matching";
    }
}