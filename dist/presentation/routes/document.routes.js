"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentRoutes = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const document_controller_1 = require("../controllers/document.controller");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
router.use(auth_1.authenticate);
router.post('/', validation_1.validateDocument, document_controller_1.createDocument);
router.get('/', document_controller_1.getDocuments);
router.get('/:id', document_controller_1.getDocument);
router.put('/:id', validation_1.validateDocument, document_controller_1.updateDocument);
router.delete('/:id', document_controller_1.deleteDocument);
exports.documentRoutes = router;
//# sourceMappingURL=document.routes.js.map