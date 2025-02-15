const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();

const {
    register,
    login,
    sessionCheck,
    validateRegister,
    validateLogin,
} = require("../controllers/authController");

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/session-check", verifyToken, sessionCheck);
module.exports = router;