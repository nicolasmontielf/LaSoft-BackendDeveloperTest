import { Request, Response } from "express";
import User from "../models/users.model";
import { checkValidId } from "../utils/functions";

/**
 * GET /
 * Home page.
 */
export const index = async (req: Request, res: Response): Promise<void> => {
    res.send({
        "test": "hi!"
    })
};