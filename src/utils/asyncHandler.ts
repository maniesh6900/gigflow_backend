import type {NextFunction, Request, Response} from "express";

export const asyncHandler = (requestHandler : Function) => {
    return (req : Request, res : Response , next : NextFunction) => {
        Promise.resolve(requestHandler(res, req, next)).catch((err)=> next(err));
    };
}