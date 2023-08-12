import { Request, Response } from "express";
import { CareerController } from "../controllers/career.controller";
import { CareerService } from '../services/career.service';
const careerController = new CareerController(new CareerService());
export const careerRouter = async (req: Request, res: Response) => {
    return await careerController.getOpenPositions(req, res);
}