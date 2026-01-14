import type { Request, Response } from 'express';
import { client } from '../prisma/index.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const existingUser = await client.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password before saving it to the database

  const user = await client.user.create({
    data: {
      name,
      email,
      password : hashedPassword,
    },
  });
  res.status(201).json({ message: 'User registered successfully', user });
});

const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await client.user.findUnique({
    where: { email },
  });

  const isPasswordValid = await bcrypt.compare(password, user?.password || "");
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = jwt.sign({ userId: user?.id }, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  });
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3600000, // 1 hour in milliseconds
  })
  .status(200).json({ message: 'Login successful', user });
});
export { register, login };