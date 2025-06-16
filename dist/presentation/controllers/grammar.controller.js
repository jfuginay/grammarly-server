"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkGrammar = void 0;
const client_1 = require("@prisma/client");
const error_handler_1 = require("../middleware/error-handler");
const grammar_service_1 = require("../../domain/services/grammar.service");
const redis_service_1 = require("../../infrastructure/external-services/redis.service");
const prisma = new client_1.PrismaClient();
const redisService = new redis_service_1.RedisService();
const grammarService = new grammar_service_1.GrammarServiceImpl();
const checkGrammar = async (req, res) => {
    const { text, documentId } = req.body;
    const userId = req.user?.userId;
    if (!userId) {
        throw new error_handler_1.AppError(401, 'User not authenticated');
    }
    // Check user's usage limits
    const usage = await prisma.usage.findFirst({
        where: {
            userId,
            date: {
                gte: new Date(new Date().setHours(0, 0, 0, 0)),
            },
        },
    });
    if (usage && usage.checksPerformed >= 100) {
        throw new error_handler_1.AppError(429, 'Daily usage limit exceeded');
    }
    // Check cache first
    const cacheKey = `grammar:${text}`;
    const cachedResult = await redisService.get(cacheKey);
    if (cachedResult) {
        return res.status(200).json({
            status: 'success',
            data: JSON.parse(cachedResult),
            source: 'cache',
        });
    }
    // Perform grammar check
    const result = await grammarService.checkText(text);
    // Cache the result
    await redisService.set(cacheKey, JSON.stringify(result), 3600); // Cache for 1 hour
    // Update usage statistics
    await prisma.usage.upsert({
        where: {
            id: usage?.id || '',
        },
        create: {
            userId,
            checksPerformed: 1,
            wordsProcessed: text.split(/\s+/).length,
        },
        update: {
            checksPerformed: { increment: 1 },
            wordsProcessed: { increment: text.split(/\s+/).length },
        },
    });
    // If documentId is provided, save the check
    if (documentId) {
        await prisma.grammarCheck.create({
            data: {
                documentId,
                originalText: text,
                suggestions: JSON.stringify(result),
                checkType: 'GRAMMAR',
                confidenceScore: 0.8, // This should be calculated based on the service response
            },
        });
    }
    res.status(200).json({
        status: 'success',
        data: result,
        source: 'service',
    });
};
exports.checkGrammar = checkGrammar;
//# sourceMappingURL=grammar.controller.js.map