export const NAME_REGEX = /^[A-Za-z\s]+$/;
export const PHONE_REGEX = /^[6-9]\d{9}$/;
export const EMAIL_REGEX = /[a-zA-Z]{4,}(@msg-global.com)$/g;
export const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
export const [ADMIN_ROLE_ID, CAPTAIN_ROLE_ID, PLAYER_ROLE_ID] = [1, 2, 3]
export const JWT_SECRET_KEY = "jwttoken"

