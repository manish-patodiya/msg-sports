
import { decryptPass, encryptPass, sendResponse, validateCPassword, validateContact, validateEmail, validateName, validatePassword } from '../constants/common.js';
import { executeQuery } from "../database/connection.js"

export const validateUserData = async (data) => {
    const nameErr = validateName(data.name);
    if (nameErr) return { contact: nameErr }

    const contactErr = await validateContact(data.contact);
    if (contactErr) return { contact: contactErr }

    const emailErr = await validateEmail(data.email);
    if (emailErr) return { email: emailErr };

    const passErr = validatePassword(data.password);
    if (passErr) return { password: passErr };

    const cpassErr = validateCPassword(data.password, data.cpassword)
    if (cpassErr) return { cpassword: passErr };
}

export const isContactExist = async (contact) => {
    try {
        let response = await executeQuery("select id from users where contact=?", [contact]);
        return response.result.length;
    } catch (err) {
        return err;
    }
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
    let response = await executeQuery("insert into users (name,contact,email,password) values(?,?,?,?)", [data.name, data.contact, data.email, data.password]);
    await executeQuery("insert into users_role (user_id,role_id) values(?,?)", [response.result.insertId, 3]);
    return response;
}

export const getUserByEmail = async (email, role_id) => {
    try {
        let response = role_id ?
            await executeQuery("select * from users join users_role on users.id = users_role.user_id where email=? and role_id=?", [email, role_id]) :
            await executeQuery("select * from users where email=?", [email]);
        return response.result[0];
    } catch (err) {
        return err;
    }
}

const attachCompleteInformationOfUser = async (user_data) => {
    const user_id = user_data.user_id;
    const { result } = await executeQuery("select event_id from event_registrations where user_id = ?", [user_id]);
    const result1 = await executeQuery("select * from houses where id=?", [user_data.house_id]);
    return { ...user_data, ...result1.result[0], player_registrations: result }
}

export const validateLoginData = async (data, role_id) => {
    let user_data = await getUserByEmail(data.email, role_id);
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
                user_data = await attachCompleteInformationOfUser(user_data);
                return sendResponse(1, "Login successful", user_data);
            } else if (user_data.status == 2) {
                return sendResponse(0, "Your profile is rejected by the admin. Try to contact with your admin.");
            }
        }
    }
}

export const changePassword = async (data, role_id) => {

    const user_data = await getUserByEmail(data.email, role_id);
    const isMatch = await decryptPass(data.opassword, user_data.password);
    if (!isMatch) {
        return sendResponse(0, "Old password is not correct");
    } else {
        try {
            data.npassword = await encryptPass(data.npassword);
            let response = await executeQuery("update users set password = ? where email = ?", [data.npassword, data.email]);
            return sendResponse(1, "Password changed successfully", response);
        } catch (err) {
            console.log(err)
            return sendResponse(2, "SQL error", err.sqlMessage);
        }
    }
}
