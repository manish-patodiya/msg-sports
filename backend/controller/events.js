import { sendResponse } from "../constants/common.js";
import { executeQuery } from "../database/connection.js";

export const getEvents = async () => {
  try {
    const { result } = await executeQuery("select *, e.id as event_id from events e join games g on e.game_id = g.id where e.deleted_at is null");
    return sendResponse(1, "Events fetched successfully", { events: result });
  } catch (err) {
    console.log(err);
    return sendResponse(2, "SQL Error", err.sqlMessage);
  }
};

export const addEvent = async (data, image_name) => {
  try {
    const { result } = await executeQuery("insert into events (event_name, game_id, date_time, venue, photo) values (?,?,?,?,?)", [data.event_name, data.game_id, data.date_time, data.venue, image_name]);
    return sendResponse(1, "Event added successfully", { image: image_name, result });
  } catch (err) {
    console.log(err);
    return sendResponse(2, "SQL Error", err.sqlMessage);
  }
};

export const deleteEvent = async (event_id) => {
  console.log(event_id)
  try {
    var CURRENT_TIMESTAMP = {
      toSqlString: function () { return 'CURRENT_TIMESTAMP()'; }
    };
    const { result } = await executeQuery("update events set deleted_at = ? where id = ?", [CURRENT_TIMESTAMP, event_id]);
    return sendResponse(1, "Event deleted successfully", result);
  } catch (err) {
    console.log(err);
    return sendResponse(2, "SQL Error", err.sqlMessage);
  }
};

export const nominateUser = async (user_id, event_id) => {
  try {
    let { result } = await executeQuery("insert into event_registrations (user_id,event_id) values (?,?)", [user_id, event_id]);
    return sendResponse(1, "Event registered successfully", { result });
  } catch (err) {
    console.log(err);
    return sendResponse(2, "SQL Error", err.sqlMessage);
  }
}

export const getUserNominations = async (user_id) => {
  try {
    let { result } = await executeQuery("select * from event_registrations er join events e on er.event_id = e.id where er.user_id = ?", [user_id]);
    return sendResponse(1, "User nominations fetched successfully", { nominations: result });
  } catch (err) {
    console.log(err);
    return sendResponse(2, "SQL Error", err.sqlMessage);
  }
}

export const getHouseUsersNominations = async (house_id) => {
  try {
    let user_data = await executeQuery("select er.*,e.*,u.*,gr.rating from event_registrations er join events e on er.event_id = e.id join users u on er.user_id = u.id left join games_rating gr on u.id = gr.user_id and e.game_id = gr.game_id  where u.house_id = ? order by e.game_id", [house_id]);
    user_data = user_data.result;

    let games = await executeQuery("select *,id as game_id from games where deleted_at is null order by id");
    games = games.result;

    const nominations = {};

    let games_id = games.map((game) => { return game.game_id; })
    games_id.map(id => { nominations[id] = []; })
    user_data.map((user) => {
      console.log()
      user.game_id && nominations[user.game_id].push(user);
    })

    const result = {
      games: games,
      nominations: nominations
    }

    return sendResponse(1, "User nominations fetched successfully", result);
  } catch (err) {
    console.log(err);
    return sendResponse(2, "SQL Error", err.sqlMessage);
  }
}

export const withdrawNomination = async (user_id, event_id) => {
  try {
    let result = await executeQuery("delete from event_registrations where user_id = ? and event_id = ?", [user_id, event_id]);
    return sendResponse(1, "Successfully withdrawn from the event", { result });
  } catch (err) {
    console.log(err);
    return sendResponse(2, "SQL Error", err.sqlMessage);
  }
}

export const updateNominationStatus = async (user_id, event_id, status) => {
  try {
    let result = await executeQuery("update event_registrations set nomination_status = ? where user_id = ? and event_id = ?", [status, user_id, event_id]);
    return sendResponse(1, "Updated status successfully", { result });
  } catch (err) {
    console.log(err);
    return sendResponse(2, "SQL Error", err.sqlMessage);
  }
}