"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const error_handler_1 = require("../middleware/error-handler");
const prisma = new client_1.PrismaClient();
const registerUser = async (req, res) => {
    const { email, password } = req.body;
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        throw new error_handler_1.AppError(400, 'User already exists');
    }
    // Hash password
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    // Create user
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
        },
    });
    // Generate JWT token
    const signOptions = {
        expiresIn: 24 * 60 * 60, // 24 hours in seconds
    };
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET || 'your_jwt_secret_here', signOptions);
    res.status(201).json({
        status: 'success',
        data: {
            user: {
                id: user.id,
                email: user.email,
            },
            token,
        },
    });
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    // Find user
    const user = await prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw new error_handler_1.AppError(401, 'Invalid credentials');
    }
    // Check password
    const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new error_handler_1.AppError(401, 'Invalid credentials');
    }
    // Generate JWT token
    const signOptions = {
        expiresIn: 24 * 60 * 60, // 24 hours in seconds
    };
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET || 'your_jwt_secret_here', signOptions);
    res.status(200).json({
        status: 'success',
        data: {
            user: {
                id: user.id,
                email: user.email,
            },
            token,
        },
    });
};
exports.loginUser = loginUser;
//# sourceMappingURL=auth.controller.js.map