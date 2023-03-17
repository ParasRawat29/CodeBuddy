const express = require("express");
const {
  getNewRoom,
  validateRoom,
  validateRoomToJoin,
} = require("../controllers/roomController");
const router = express.Router();

router.get("/getNewRoom", getNewRoom);
router.get("/validate/join/:id", validateRoomToJoin);
router.post("/validate", validateRoom);
module.exports = router;
