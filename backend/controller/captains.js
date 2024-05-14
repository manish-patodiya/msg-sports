import "../constants/constants.js";
import { executeQuery } from "../database/connection.js";
import { sendResponse } from '../constants/common.js';
import { CAPTAIN_ROLE_ID } from "../constants/constants.js";

export const getCaptains = async () => {
    try {
        const { result } = await executeQuery("select *,h.id as house_id from houses h join users u on h.cap_id = u.id");
        return sendResponse(1, "Captains fetched successfully", { captains_list: result })
    } catch (err) {
        console.log(err)
        return sendResponse(2, "SQL error", err.sqlMessage);
    }
}

export const makeCaptain = async (data) => {
    try {
        await executeQuery("update houses set cap_id=? where id=?", [data.player_id, data.house_id]);
        await executeQuery("update users set house_id=? where id=?", [data.house_id, data.player_id]);
        const { result } = executeQuery("insert into users_role (user_id, role_id) values(?,?)", [data.player_id, CAPTAIN_ROLE_ID]);
        return sendResponse(1, "Made captain successfully", { result })
    } catch (err) {
        console.log(err)
        return sendResponse(2, "SQL error", err.sqlMessage);
    }
}

export const deleteCaptain = async (cap_id) => {
    try {
        await executeQuery("update houses set cap_id=NULL where cap_id=?", [cap_id]);
        await executeQuery("update users set house_id=0 where id=?", [cap_id]);
        const { result } = await executeQuery("delete from users_role where role_id=? and user_id=?", [CAPTAIN_ROLE_ID, cap_id]);
        return sendResponse(1, "Captain deleted successfully", result)
    } catch (err) {
        console.log(err)
        return sendResponse(2, "SQL error", err.sqlMessage);
    }
}
