import { response } from 'express';
import { decryptPass, encryptPass, sendResponse, validateCPassword, validateEmail, validatePassword } from '../constants/common.js';
import { executeQuery } from "../database/connection.js"

export const validateUserData = async (data) => {

    const emailErr = await validateEmail(data.email);
    if (emailErr) return { email: emailErr };

    const passErr = validatePassword(data.password);
    if (passErr) return { password: passErr };

    const cpassErr = validateCPassword(data.password, data.cpassword)
    if (cpassErr) return { cpassword: passErr };
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
    if (validation_errors) {
        return sendResponse(0, "Invalid credentials", { error: validation_errors });
    }
    else {
        try {
            data.password = await encryptPass(data.password);
            let response = await insertUser(data);
            return sendResponse(1, "User inserted successfully", response);
        } catch (err) {
            console.log(err)
            return sendResponse(2, "SQL error", err.sqlMessage);
        }
    }
}

export const insertUser = async (data) => {
    let response = await executeQuery("insert into users (email,password) values(?,?)", [data.email, data.password]);
    await executeQuery("insert into users_role (user_id,role_id) values(?,?)", [response.result.insertId, 3]);
    return response;
}

export const getUserByEmail = async (email, role_id) => {
    try {
        let response = role_id ?
            await executeQuery("select * from users join users_role where email=? and role_id=?", [email, role_id]) :
            await executeQuery("select * from users where email=?", [email]);
        return response.result[0];
    } catch (err) {
        return err;
    }
}

export const validateLoginData = async (data, role_id) => {
    const user_data = await getUserByEmail(data.email, role_id);
    if (!user_data) {
        return sendResponse(0, "Invalid credentials", { error: { email: "Email doest not exist" } });
    } else {
        const isMatch = await decryptPass(data.password, user_data.password);
        if (!isMatch) {
            return sendResponse(0, "Invalid credentials", { error: { password: "Wrong password" } });
        } else {
            if (user_data.status == 0) {
                return sendResponse(0, "Your profile is in pending status. Please wait for admin to approve it.");
            } else if (user_data.status == 1) {
                return sendResponse(1, "Login successful", user_data);
            } else if (user_data.status == 2) {
                return sendResponse(0, "Your profile is rejected by the admin. Try to contact with your admin.");
            }
        }
    }

}