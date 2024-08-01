import { sendResponse } from "../constants/common.js";
import { executeQuery } from "../database/connection.js";

export const getEventname = async () => {
  try {
    const result = await executeQuery("select id, event_name from events"); 
    return sendResponse(1, "Events fetched successfully", { events: result });
  } catch (err) {
    console.log(err);
    return sendResponse(2, "SQL Error", err.sqlMessage);
  }
};
