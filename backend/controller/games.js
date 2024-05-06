import { sendResponse } from "../constants/common.js";
import { executeQuery } from "../database/connection.js"

export const getGames = async () => {
    try {
        const { result } = await executeQuery("select *,id as game_id from games where deleted_at is null");
        return sendResponse(1, "Games fetched successfully", { games: result });
    } catch (err) {
        console.log(err)
        return sendResponse(2, "SQL error", err.sqlMessage);
    }
}

export const addGame = async (data) => {
    try {
        const { result } = await executeQuery("insert into games (game_name, game_description) values (?,?)", [data.name, data.description]);
        return sendResponse(1, "Game added successfully", result);
    } catch (err) {
        console.log(err)
        return sendResponse(2, "SQL error", err.sqlMessage);
    }
}

export const deleteGame = async (id) => {
    try {
        var CURRENT_TIMESTAMP = {
            toSqlString: function () { return 'CURRENT_TIMESTAMP()'; }
        };
        const { result } = await executeQuery("update games set deleted_at = ? where id = ?", [CURRENT_TIMESTAMP, id]);
        return sendResponse(1, "Game deleted successfully", result);
    } catch (err) {
        console.log(err)
        return sendResponse(2, "SQL error", err.sqlMessage);
    }
}