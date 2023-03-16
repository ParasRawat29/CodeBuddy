const express = require("express");
const {
  runCode,
  saveCode,
  getSingleCode,
  getAllCode,
  deleteCode,
} = require("../controllers/codeConroller");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.post("/run", runCode);
router.post("/saveCode", isAuthenticated, saveCode);
router.get("/code/:codeId", isAuthenticated, getSingleCode);
router.get("/getAllCodes", isAuthenticated, getAllCode);
router.delete("/code/delete", isAuthenticated, deleteCode);
module.exports = router;
