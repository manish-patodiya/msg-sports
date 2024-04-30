import { sendResponse } from "../constants/common.js";
import { executeQuery } from "../database/connection.js"

export const getCategories = async () => {
    try {
        const { result } = await executeQuery("select * from games_categories");
        return sendResponse(1, "Categories fetched successfully", { categories: result });
    } catch (err) {
        console.log(err)
        return sendResponse(2, "SQL error", err.sqlMessage);
    }
}

export const addCategory = async (data) => {
    try {
        const { result } = await executeQuery("insert into games_categories (category) values (?,?)", [data.name]);
        return sendResponse(1, "Game added successfully", result);
    } catch (err) {
        console.log(err)
        return sendResponse(2, "SQL error", err.sqlMessage);
    }
}

export const deleteCategory = async (id) => {
    try {

        var CURRENT_TIMESTAMP = {
            toSqlString: function () { return 'CURRENT_TIMESTAMP()'; }
        };
        const { result } = await executeQuery("delete from games_categories where id = ?", [CURRENT_TIMESTAMP, id]);
        return sendResponse(1, "Category deleted successfully", result);
    } catch (err) {
        console.log(err)
        return sendResponse(2, "SQL error", err.sqlMessage);
    }
}