const express = require("express");
const {
  runCode,
  saveCode,
  getSingleCode,
  getAllCode,
} = require("../controllers/codeConroller");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.post("/run", runCode);
router.post("/saveCode", isAuthenticated, saveCode);
router.get("/code/:codeId", isAuthenticated, getSingleCode);
router.get("/getAllCodes", isAuthenticated, getAllCode);
module.exports = router;
