"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGrammarCheck = exports.validateDocument = exports.validateLogin = exports.validateRegistration = void 0;
const joi_1 = __importDefault(require("joi"));
const error_handler_1 = require("./error-handler");
const registrationSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).required(),
});
const loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
const documentSchema = joi_1.default.object({
    title: joi_1.default.string().required().min(1).max(255),
    content: joi_1.default.string().required(),
});
const grammarCheckSchema = joi_1.default.object({
    text: joi_1.default.string().required(),
    documentId: joi_1.default.string().uuid().optional(),
});
const validateRegistration = (req, _res, next) => {
    const { error } = registrationSchema.validate(req.body);
    if (error) {
        throw new error_handler_1.AppError(400, error.details[0].message);
    }
    next();
};
exports.validateRegistration = validateRegistration;
const validateLogin = (req, _res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        throw new error_handler_1.AppError(400, error.details[0].message);
    }
    next();
};
exports.validateLogin = validateLogin;
const validateDocument = (req, _res, next) => {
    const { error } = documentSchema.validate(req.body);
    if (error) {
        throw new error_handler_1.AppError(400, error.details[0].message);
    }
    next();
};
exports.validateDocument = validateDocument;
const validateGrammarCheck = (req, _res, next) => {
    const { error } = grammarCheckSchema.validate(req.body);
    if (error) {
        throw new error_handler_1.AppError(400, error.details[0].message);
    }
    next();
};
exports.validateGrammarCheck = validateGrammarCheck;
//# sourceMappingURL=validation.js.map