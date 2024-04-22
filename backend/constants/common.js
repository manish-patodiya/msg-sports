import bcrypt from 'bcryptjs';
import { EMAIL_REGEX, PASS_REGEX } from "./constants.js";
import { isEmailExist } from '../controller/auth.js';

export const sendResponse = (status, message, response) => {
    return { status, message, response };
}

export const encryptPass = async (pass) => {
    return await bcrypt.hash(pass, 8)
}

export const decryptPass = async (pass, hashedPass) => {
    return await bcrypt.compare(pass, hashedPass);
}

export const validateEmail = async (email) => {
    if (!email) {
        return "Email is required";
    } else if (!email.match(EMAIL_REGEX)) {
        return "Please try with orgnisation email";
    } else if (await isEmailExist(email)) {
        return "Email already exist";
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