import { sendResponse } from "../constants/common.js";
import { executeQuery } from "../database/connection.js";

export const getNameTeamid1 = async (event_id) => {
  try {
    const result = await executeQuery(
      "SELECT u.name AS team1_name, f.team1_id, f.team2_id, f.winner, f.event_id FROM users AS u JOIN team_players AS tp ON u.id = tp.player_id JOIN teams AS t ON tp.team_id = t.team_id JOIN fixtures AS f ON t.team_id = f.team1_id WHERE f.event_id = ?",
      [event_id]
    );
    return sendResponse(1, "Fixtures fetched successfully", { Fixtures: result });
  } catch (err) {
    console.log(err);
    return sendResponse(2, "SQL error", err.sqlMessage);
  }
};


export const getNameTeamid2 = async (event_id) => {
  try {
    const result = await executeQuery(
      "SELECT u.name AS team2_name, f.team2_id, f.event_id FROM users AS u JOIN team_players AS tp ON u.id = tp.player_id JOIN teams AS t ON tp.team_id = t.team_id JOIN fixtures AS f ON t.team_id = f.team2_id WHERE f.event_id = ?",
      [event_id]
    );
    return sendResponse(1, "Fixtures fetched successfully", { Fixtures: result });
  } catch (err) {
    console.log(err);
    return sendResponse(2, "SQL error", err.sqlMessage);
  }
};

export const getNameWinner = async (event_id) => {
  try {
    const result = await executeQuery(
      "SELECT u.name AS winner_name, f.winner, f.event_id FROM users AS u JOIN team_players AS tp ON u.id = tp.player_id JOIN teams AS t ON tp.team_id = t.team_id JOIN fixtures AS f ON t.team_id = f.winner WHERE f.event_id = ?",
      [event_id]
    );
    return sendResponse(1, "Fixtures fetched successfully", { Fixtures: result });
  } catch (err) {
    console.log(err);
    return sendResponse(2, "SQL error", err.sqlMessage);
  }
};

