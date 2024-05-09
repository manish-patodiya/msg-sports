import { sendResponse } from "../constants/common.js";
import { CAPTAIN_ROLE_ID, PLAYER_ROLE_ID } from "../constants/constants.js"
import { executeQuery } from "../database/connection.js"

export const getPlayers = async () => {
    try {
        const { result } = await executeQuery("select * from users join users_role on users.id = users_role.user_id where role_id = ?", [PLAYER_ROLE_ID]);
        return sendResponse(1, "Players fetched successfully", { players: result })
    } catch (err) {
        return sendResponse(2, "SQL error", err.sqlMessage)
    }
}

export const getPlayer = async (user_id) => {
    try {
        const { result } = await executeQuery("select * from users join users_role on users.id = users_role.user_id where users_role.role_id = ? and users.id=?", [PLAYER_ROLE_ID, user_id]);
        const ratings = await executeQuery("Select game_id, rating from games_rating where user_id=?", [user_id]);
        result[0].ratings = ratings.result;
        return sendResponse(1, "Player fetched successfully", { player: result[0] })
    } catch (err) {
        return sendResponse(2, "SQL error", err.sqlMessage)
    }
}

export const getEligiblePlayersForCaptancy = async () => {
    try {
        const { result } = await executeQuery("select *, users.id as user_id from users where id in (select user_id from (SELECT * FROM `users_role` group by user_id having count(*) = 1) as t1 where role_id = 3) and status = 1");
        return sendResponse(1, "Player fetched successfully", { players: result })
    } catch (err) {
        return sendResponse(2, "SQL error", err.sqlMessage)
    }
}

export const promoteAsCaptain = async (house_id, user_id) => {
    try {
        const { result1 } = await executeQuery("insert into users_role (user_id, role_id) values (?,?)", [user_id, CAPTAIN_ROLE_ID]);
        const { result2 } = await executeQuery("update houses set cap_id = ? where id=?", [user_id, house_id]);
        return sendResponse(1, "Player fetched successfully")
    } catch (err) {
        return sendResponse(2, "SQL error", err.sqlMessage)
    }
}

export const updateStatus = async (user_id, status_code) => {
    try {
        const { result } = await executeQuery("update users set status = ? where id = ?", [status_code, user_id]);
        return sendResponse(1, "Status updated successfully", result[0])
    } catch (err) {
        return sendResponse(2, "SQL error", err.sqlMessage)
    }
}

export const promotePlayerAsCaptain = async (user_id) => {
    try {
        const { result } = await executeQuery("update users_role set role_id = ? where user_id = ?", [CAPTAIN_ROLE_ID, user_id]);
        return sendResponse(1, "Players promoted successfully", { players: result })
    } catch (err) {
        return sendResponse(2, "SQL error", err.sqlMessage)
    }
}

export const updateProfilePhoto = async (user_id, image_name) => {
    try {
        const { result } = await executeQuery("update users set profile=? where id = ?", [image_name, user_id]);
        return sendResponse(1, "Profile photo updated successfully", { image: image_name, result })
    } catch (err) {
        return sendResponse(2, "SQL error", err.sqlMessage)
    }
}

export const updatePlayerInfo = async (user_id, data) => {
    try {
        const { name, contact, business_unit, emp_id, location, tshirt } = data;
        const result1 = await executeQuery("update users set name=?,contact=?,business_unit=?,emp_id=?,location=?,tshirt=?,is_completed=1 where id = ?", [name, contact, business_unit, emp_id, location, tshirt, user_id]);
        const result2 = await executeQuery("delete from games_rating where user_id = ?", [user_id]);

        const ratings = [];
        data.ratings.map(row => {
            ratings.push([Number(user_id), Number(row.game_id), Number(row.rating)]);
        })
        const result3 = await executeQuery("insert into games_rating (user_id,game_id,rating) values ?", [ratings]);
        return sendResponse(1, "Players promoted successfully", { update: result1.result, delete: result2.result, insert: result3.result })
    } catch (err) {
        return sendResponse(2, "SQL error", err.sqlMessage)
    }
}

export const deletePlayer = async (user_id) => {
    try {
        var CURRENT_TIMESTAMP = {
            toSqlString: function () { return 'CURRENT_TIMESTAMP()'; }
        };
        const { result } = await executeQuery("update users set deleted_at = ? where id = ?", [CURRENT_TIMESTAMP, user_id]);
        return sendResponse(1, "Player deleted successfully", result);
    } catch (err) {
        return sendResponse(2, "SQL error", err.sqlMessage);
    }
}