import { decryptPass, encryptPass, sendResponse } from '../constants/common.js';
import { EMAIL_REGEX, PASS_REGEX } from '../constants/constants.js';
import { executeQuery } from "../database/connection.js"

export const validateUserData = async (data) => {
    const errors = {};
    if (!data.email) {
        errors.email = "Email is required";
    } else if (!data.email.match(EMAIL_REGEX)) {
        errors.email = "Please try with orgnisation email";
    } else if (await isEmailExist(data.email)) {
        errors.email = "Email already exist";
    }

    //New Password
    if (!data.password) {
        errors.password = "Password is required";
    } else if (!data.password.match(PASS_REGEX)) {
        errors.password =
            "Password should have one uppercase, one lowercase, one Special character and one Number";
    }

    //Confirm Password
    if (!data.cpassword) {
        errors.cpassword = "Confirm Password is required";
    } else if (data.password !== data.cpassword) {
        errors.cpassword = "Password not matching";
    }
    return errors;
}

export const isEmailExist = async (email) => {
    try {
        let response = await executeQuery("select id from users where email=?", [email]);
        return response.result.length;
    } catch (err) {
        return err;
    }
}

export const newUserLogin = async (data) => {
    const validation_errors = await validateUserData(data);
    if (Object.keys(validation_errors).length) {
        return sendResponse(0, "Invalid credentials", validation_errors);
    }
    else {
        try {
            data.password = await encryptPass(data.password);
            let response = await executeQuery("insert into users (email,password) values(?,?)", [data.email, data.password]);
            return sendResponse(1, "User inserted successfully", response);
        } catch (err) {
            return sendResponse(2, "SQL error", err.sqlMessage);
        }
    }
}

export const getUserByEmail = async (email) => {
    try {
        let response = await executeQuery("select * from users where email=?", [email]);
        return response.result[0];
    } catch (err) {
        return err;
    }
}

export const validateLoginData = async (data) => {
    const user_data = await getUserByEmail(data.email);
    if (!user_data) {
        return sendResponse(0, "Invalid credentials", { email: "Email doest not exist" });
    } else {
        const isMatch = await decryptPass(data.password, user_data.password);
        if (!isMatch) {
            return sendResponse(0, "Invalid credentials", { password: "Wrong password" });
        } else {
            return sendResponse(1, "Login successful", user_data);
        }
    }

}