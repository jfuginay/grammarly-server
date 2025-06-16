import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/error-handler';

const prisma = new PrismaClient();

export const createDocument = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const userId = req.user?.userId;

  if (!userId) {
    throw new AppError(401, 'User not authenticated');
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

export const getDocuments = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    throw new AppError(401, 'User not authenticated');
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

export const getDocument = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.userId;

  if (!userId) {
    throw new AppError(401, 'User not authenticated');
  }

  const document = await prisma.document.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!document) {
    throw new AppError(404, 'Document not found');
  }

  res.status(200).json({
    status: 'success',
    data: document,
  });
};

export const updateDocument = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const userId = req.user?.userId;

  if (!userId) {
    throw new AppError(401, 'User not authenticated');
  }

  const document = await prisma.document.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!document) {
    throw new AppError(404, 'Document not found');
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

export const deleteDocument = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.userId;

  if (!userId) {
    throw new AppError(401, 'User not authenticated');
  }

  const document = await prisma.document.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!document) {
    throw new AppError(404, 'Document not found');
  }

  await prisma.document.delete({
    where: { id },
  });

  res.status(204).send();
}; 