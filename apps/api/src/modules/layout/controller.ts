import { getAllLayoutsService } from "./service"
import { NextFunction, Response, Request } from "express";

export const getLayoutsController = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        const layouts = await getAllLayoutsService();
        res.status(200).json({ success: true, layouts: layouts });
    } catch (error) {
        return next(error);
    }
}