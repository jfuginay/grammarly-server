"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = require("dotenv");
const error_handler_1 = require("./presentation/middleware/error-handler");
const rate_limiter_1 = require("./presentation/middleware/rate-limiter");
const auth_routes_1 = require("./presentation/routes/auth.routes");
const document_routes_1 = require("./presentation/routes/document.routes");
const grammar_routes_1 = require("./presentation/routes/grammar.routes");
const health_controller_1 = require("./presentation/controllers/health.controller");
// Load environment variables
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
}));
app.use(express_1.default.json());
app.use(rate_limiter_1.rateLimiter);
// Routes
app.get('/health', health_controller_1.healthCheck);
app.use('/api/auth', auth_routes_1.authRoutes);
app.use('/api/documents', document_routes_1.documentRoutes);
app.use('/api/grammar', grammar_routes_1.grammarRoutes);
// Error handling
app.use(error_handler_1.errorHandler);
// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=index.js.map