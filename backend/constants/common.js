import bcrypt from 'bcryptjs';
import { EMAIL_REGEX, NAME_REGEX, PASS_REGEX, PHONE_REGEX } from "./constants.js";
import { isContactExist, isEmailExist } from '../controller/auth.js';

export const sendResponse = (status, message, response) => {
    return { status, message, response };
}

export const encryptPass = async (pass) => {
    return await bcrypt.hash(pass, 8)
}

export const decryptPass = async (pass, hashedPass) => {
    return await bcrypt.compare(pass, hashedPass);
}

export const validateName = (name) => {
    if (!name) {
        return "Full name is required";
    } else if (name.length < 4) {
        return "Full name should be of atleast 4 characters";
    } else if (!name.match(NAME_REGEX)) {
        return "Invalid name";
    }
};

export const validateContact = async (contact) => {
    if (!contact) {
        return "Contact no. is required";
    } else if (!contact.match(PHONE_REGEX)) {
        return "Phone No is not Valid";
    } else if (await isContactExist(contact)) {
        return "Contact no. already exist";
    }
};

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

import multer from 'multer';
import path from 'path';
export const fileUploadMiddleware = (field_name, dest) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            let path = "./public/uploads/";
            if (dest) {
                path += dest;
            }
            cb(null, path)
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            const file_name = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
            cb(null, file_name);
            req.uploaded_file_name = file_name;
        }
    })
    return multer({ storage: storage }).single(field_name);
}