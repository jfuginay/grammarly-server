import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/error-handler';

const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new AppError(400, 'User already exists');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  // Generate JWT token
  const signOptions: SignOptions = {
    expiresIn: 24 * 60 * 60, // 24 hours in seconds
  };

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET || 'your_jwt_secret_here',
    signOptions
  );

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

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Find user
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError(401, 'Invalid credentials');
  }

  // Check password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError(401, 'Invalid credentials');
  }

  // Generate JWT token
  const signOptions: SignOptions = {
    expiresIn: 24 * 60 * 60, // 24 hours in seconds
  };

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET || 'your_jwt_secret_here',
    signOptions
  );

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