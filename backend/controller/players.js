import { sendResponse } from "../constants/common.js";
import { PLAYER_ROLE_ID } from "../constants/constants.js"
import { executeQuery } from "../database/connection.js"

export const getPlayers = async (data, cap_flag = true) => {
    try {
        let where = "role_id = ?";
        let params = [PLAYER_ROLE_ID];
        if (Object.keys(data).length) {
            if (data.search) {
                where += " and name like ?";
                params.push("%" + data.search + "%");
            }
            if (data.status != undefined && data.status != "") {
                where += " and status = ?";
                params.push(data.status);
            }
            if (data.house_id) {
                where += " and house_id = ?";
                params.push(data.house_id);
            }
        }

        if (!cap_flag) {
            let { result } = await executeQuery(`select * from users join users_role on users.id = users_role.user_id where ${where} and user_id not in (select cap_id from houses)`, params);
            return sendResponse(1, "Players fetched successfully", { players: result })
        } else {
            let { result } = await executeQuery(`select * from users join users_role on users.id = users_role.user_id where ${where}`, params);
            return sendResponse(1, "Players fetched successfully", { players: result })
        }
    } catch (err) {
        console.log(err)
        return sendResponse(2, "SQL error", err.sqlMessage)
    }
}

export const getPlayer = async (user_id) => {
    try {
        const { result } = await executeQuery("select * from users join users_role on users.id = users_role.user_id left join houses on users.house_id = houses.id where users_role.role_id = ? and users.id=?", [PLAYER_ROLE_ID, user_id]);
        const ratings = await executeQuery("select gr.game_id, gr.rating, g.game_name from games_rating gr join games g on g.id = gr.game_id where gr.user_id=?", [user_id]);
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

export const updateStatus = async (user_id, status_code) => {
    try {
        const { result } = await executeQuery("update users set status = ? where id = ?", [status_code, user_id]);
        return sendResponse(1, "Status updated successfully", result[0])
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
        return sendResponse(1, "Players updated successfully", { update: result1.result, delete: result2.result, insert: result3.result })
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

export const assignHouse = async (user_id, house_id, bid_amt) => {
    console.log(user_id, house_id, bid_amt)
    try {
        var CURRENT_TIMESTAMP = {
            toSqlString: function () { return 'CURRENT_TIMESTAMP()'; }
        };
        const { result } = await executeQuery("update users set house_id = ?, sold_amt = ?, updated_at = ? where id = ?", [house_id, bid_amt, CURRENT_TIMESTAMP, user_id]);
        return sendResponse(1, "Player sold successfully", result);
    } catch (err) {
        return sendResponse(2, "SQL error", err.sqlMessage);
    }
}