"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.grammarRoutes = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const grammar_controller_1 = require("../controllers/grammar.controller");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
router.use(auth_1.authenticate);
router.post('/check', validation_1.validateGrammarCheck, grammar_controller_1.checkGrammar);
exports.grammarRoutes = router;
//# sourceMappingURL=grammar.routes.js.map