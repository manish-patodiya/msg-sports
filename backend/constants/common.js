import bcrypt from 'bcryptjs';

export const sendResponse = (status, message, response) => {
    return { status, message, response };
}

export const encryptPass = async (pass) => {
    return await bcrypt.hash(pass, 8)
}

export const decryptPass = async (pass, hashedPass) => {
    return await bcrypt.compare(pass, hashedPass);
}