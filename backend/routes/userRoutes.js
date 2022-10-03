const express = require("express");
const {
  signIn,
  register,
  logout,
  getUserDetails,
} = require("../controllers/userController");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.post("/signin", signIn);
router.post("/register", register);
router.get("/logout", logout);
router.get("/profile", isAuthenticated, getUserDetails);
module.exports = router;
