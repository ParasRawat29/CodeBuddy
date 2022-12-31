const express = require("express");
const { getNewRoom, validateRoom } = require("../controllers/roomController");
const router = express.Router();

router.get("/getNewRoom", getNewRoom);
router.post("/validate", validateRoom);

module.exports = router;
