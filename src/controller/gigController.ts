import type { Request, Response } from 'express';
import { client } from '../prisma/index.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getAllGigs = asyncHandler(async (req: Request, res: Response) => {
  const gigs = await client.gig.findMany({
    include: {
      bids: true,
    },
  });
  res.status(200).json(gigs);
});
export const createGig = asyncHandler(async (req: Request, res: Response) => {
  const { title, description, budget, deadline } = req.body;
  // @ts-ignore
  const userId = req.userId;
  const gig = await client.gig.create({
    data: {
      title,
      description,
      budget,
      deadline: new Date(deadline), // Ensure deadline is a Date object
      userId,
    },
  });
  res.status(201).json(gig);
});

export const getMyGigs = asyncHandler(async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.userId;
  const gigs = await client.gig.findMany({
    where: {
      userId,
    },
    include: {
      bids: true,
    },
  });
  res.status(200).json(gigs);
});