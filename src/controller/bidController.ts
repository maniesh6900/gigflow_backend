import type { Request, Response } from 'express';
import { client } from '../prisma/index.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
const createBid = asyncHandler(async (req: Request, res: Response) => {
  const { gigId, amount, estimatedDays, coverLetter } = req.body;
  // @ts-ignore 
  const userId = req.userId;
  const bid = await client.bid.create({
    data: {
      gigId,
      userId, // Assuming the user is authenticated and userId is available in the request
      amount,
      estimatedDays,
      coverLetter,
    },
  });
  res.status(201).json(bid);
});

const getBidsForGig = asyncHandler(async (req: Request, res: Response) => {
  const { gigId } = req.params;
  const bids = await client.bid.findMany({
    where: {
      gigId: Number(gigId),
    },
  });
  res.status(200).json(bids);
});

const hireBid = asyncHandler(async (req: Request, res: Response) => {
  const { bidId } = req.params;
  const bid = await client.bid.update({
    where: {
      id: Number(bidId),
    },
    data: {
      status: 'HIRED',
    },
  });
  res.status(200).json(bid);
});

const getMyBids     = asyncHandler(async (req: Request, res: Response) => {
  //@ts-ignore
    const userId = req.userId;
    const bids = await client.bid.findMany({
        where: {
            userId,
        },
  });
  res.status(200).json(bids);
});
export { createBid, getBidsForGig, hireBid, getMyBids };