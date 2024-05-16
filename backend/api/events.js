import express from "express";
import { addEvent, deleteEvent, getEvents, nominateUser, withdrawNomination, getUserNominations, updateNominationStatus, getHouseUsersNominations } from "../controller/events.js";
import { fileUploadMiddleware } from "../constants/common.js";
const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await getEvents());
});

router.post("/add", fileUploadMiddleware("event_image", "events"), async (req, res) => {
  res.json(await addEvent(req.body, req.uploaded_file_name));
});

router.delete("/:game_id", async (req, res) => {
  res.json(await deleteEvent(req.params.game_id));
});

router.post("/event_registration", async (req, res) => {
  res.json(await nominateUser(req.body.user_id, req.body.event_id));
});

router.get("/get_user_nominations/:user_id", async (req, res) => {
  res.json(await getUserNominations(req.params.user_id));
});

router.get("/get_nominations_data/:house_id", async (req, res) => {
  res.json(await getHouseUsersNominations(req.params.house_id));
})

router.post("/withdraw_nomination/:user_id/:event_id", async (req, res) => {
  res.json(await withdrawNomination(req.params.user_id, req.params.event_id));
});

router.post("/update_nomination_status/", async (req, res) => {
  res.json(await updateNominationStatus(req.body.user_id, req.body.event_id, req.body.status_code));
});

export default router;
