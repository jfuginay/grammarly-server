"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDocument = exports.updateDocument = exports.getDocument = exports.getDocuments = exports.createDocument = void 0;
const client_1 = require("@prisma/client");
const error_handler_1 = require("../middleware/error-handler");
const prisma = new client_1.PrismaClient();
const createDocument = async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user?.userId;
    if (!userId) {
        throw new error_handler_1.AppError(401, 'User not authenticated');
    }
    const wordCount = content.split(/\s+/).length;
    const characterCount = content.length;
    const document = await prisma.document.create({
        data: {
            title,
            content,
            wordCount,
            characterCount,
            userId,
        },
    });
    res.status(201).json({
        status: 'success',
        data: document,
    });
};
exports.createDocument = createDocument;
const getDocuments = async (req, res) => {
    const userId = req.user?.userId;
    if (!userId) {
        throw new error_handler_1.AppError(401, 'User not authenticated');
    }
    const documents = await prisma.document.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
    });
    res.status(200).json({
        status: 'success',
        data: documents,
    });
};
exports.getDocuments = getDocuments;
const getDocument = async (req, res) => {
    const { id } = req.params;
    const userId = req.user?.userId;
    if (!userId) {
        throw new error_handler_1.AppError(401, 'User not authenticated');
    }
    const document = await prisma.document.findFirst({
        where: {
            id,
            userId,
        },
    });
    if (!document) {
        throw new error_handler_1.AppError(404, 'Document not found');
    }
    res.status(200).json({
        status: 'success',
        data: document,
    });
};
exports.getDocument = getDocument;
const updateDocument = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.user?.userId;
    if (!userId) {
        throw new error_handler_1.AppError(401, 'User not authenticated');
    }
    const document = await prisma.document.findFirst({
        where: {
            id,
            userId,
        },
    });
    if (!document) {
        throw new error_handler_1.AppError(404, 'Document not found');
    }
    const wordCount = content.split(/\s+/).length;
    const characterCount = content.length;
    const updatedDocument = await prisma.document.update({
        where: { id },
        data: {
            title,
            content,
            wordCount,
            characterCount,
        },
    });
    res.status(200).json({
        status: 'success',
        data: updatedDocument,
    });
};
exports.updateDocument = updateDocument;
const deleteDocument = async (req, res) => {
    const { id } = req.params;
    const userId = req.user?.userId;
    if (!userId) {
        throw new error_handler_1.AppError(401, 'User not authenticated');
    }
    const document = await prisma.document.findFirst({
        where: {
            id,
            userId,
        },
    });
    if (!document) {
        throw new error_handler_1.AppError(404, 'Document not found');
    }
    await prisma.document.delete({
        where: { id },
    });
    res.status(204).send();
};
exports.deleteDocument = deleteDocument;
//# sourceMappingURL=document.controller.js.map