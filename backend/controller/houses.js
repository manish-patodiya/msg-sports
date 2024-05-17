import "../constants/constants.js";
import { executeQuery } from "../database/connection.js";
import { sendResponse } from '../constants/common.js';

export const getHouses = async (image_name, data) => {
    try {
        const { result } = await executeQuery("select *,id as house_id from houses");
        return sendResponse(1, "Houses fetched successfully", { houses: result })
    } catch (err) {
        console.log(err)
        return sendResponse(2, "SQL error", err.sqlMessage);
    }
}

export const getCaptainsList = async () => {
    try {
        const { result } = await executeQuery("select *,h.id as house_id from houses h join users u on h.cap_id = u.id");
        return sendResponse(1, "Captains fetched successfully", { captains_list: result })
    } catch (err) {
        console.log(err)
        return sendResponse(2, "SQL error", err.sqlMessage);
    }
}

export const addHouse = async (image_name, data) => {
    try {
        const { result } = await executeQuery("insert into houses (house_name, house_description, background, image) values (?,?,?,?)", [data.name, data.description, data.background, image_name]);;
        return sendResponse(1, "House added successfully", { image: image_name, result })
    } catch (err) {
        console.log(err)
        return sendResponse(2, "SQL error", err.sqlMessage);
    }
}

export const deleteHouse = async (house_id) => {
    try {
        const { result } = await executeQuery("delete from houses where id=?", [house_id]);
        return sendResponse(1, "House deleted successfully", result)
    } catch (err) {
        console.log(err)
        return sendResponse(2, "SQL error", err.sqlMessage);
    }
}
