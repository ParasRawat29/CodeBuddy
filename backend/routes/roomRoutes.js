const express = require("express");
const {
  getNewRoom,
  validateRoom,
  validateRoomToJoin,
} = require("../controllers/roomController");
const router = express.Router();

router.get("/getNewRoom", getNewRoom);
router.post("/validate", validateRoom);
router.get("/validate/join", validateRoomToJoin);
module.exports = router;
