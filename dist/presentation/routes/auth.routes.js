"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_controller_2 = require("../controllers/auth.controller");
const validation_1 = require("../middleware/validation");
const validation_2 = require("../middleware/validation");
const router = (0, express_1.Router)();
router.post('/register', validation_1.validateRegistration, auth_controller_1.registerUser);
router.post('/login', validation_2.validateLogin, auth_controller_2.loginUser);
exports.authRoutes = router;
//# sourceMappingURL=auth.routes.js.map