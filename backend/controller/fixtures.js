import { sendResponse } from "../constants/common.js";
import { executeQuery } from "../database/connection.js";

export const getFixtures = async (event_id) => {
  try {
    const { result } = await executeQuery(
      "SELECT `team1_id`,`team2_id`,`winner`,`event_id` FROM `fixtures` WHERE event_id = ?",
      [event_id]
    );
    return sendResponse(1, "Fixtures fetched successfully", {
      Fixtures: result,
    });
  } catch (err) {
    console.log(err);
    return sendResponse(2, "SQL error", err.sqlMessage);
  }
};
