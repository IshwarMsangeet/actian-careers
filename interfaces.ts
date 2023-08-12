import { Response, Request } from "express";

export interface Careers {
    department: string;
    jobNames: String[];
}

export class CustomError extends Error {
    status: number | undefined;
    constructor(status: number, message: string){
        super(message);
        this.status = status;
    }
}

export interface ICareerService{
    getOpenPositions(_department: string):Promise<Array<Careers>| CustomError>;
}

export interface ICareerController {
    getOpenPositions(req: Request, res: Response):Promise<any>;
}