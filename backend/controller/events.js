import { sendResponse } from "../constants/common.js";
import { executeQuery } from "../database/connection.js";

export const getEvent = async () => {
  try {
    const { result } = await executeQuery(
      "select * from events where deleted_at is null"
    );
    return sendResponse(1, "Events fetched successfully", { events: result });
  } catch (err) {
    console.log(err);
    return sendResponse(2, "SQL Error", err.sqlMessage);
  }
};

export const addEvent = async (data) => {
  try {
    const { result } = await executeQuery(
      "insert into events (event_name, game_id, date_time, venue, photo) values (?,?,?,?,?)",
      [data.event_name, data.game_id, data.date_time, data.venue, data.photo]
    );
    return sendResponse(1, "Event added successfully", result);
  } catch (err) {
    console.log(err);
    return sendResponse(2, "SQL Error", err.sqlMessage);
  }
};

export const deleteEvent = async () => {
  try {
    var CURRENT_TIMESTAMP = {
      toSqlString: function () {
        return "CURRENT_TIMESTAMP";
      },
    };
    const { result } = await executeQuery(
      "update events set deleted_at = ? where id = ?",
      [CURRENT_TIMESTAMP, id]
    );
    return sendResponse(1, "Event deleted successfully", result);
  } catch (err) {
    console.log(err);
    return sendResponse(2, "SQL Error", err.sqlMessage);
  }
};
