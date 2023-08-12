import { Response, Request } from "express";
import { Constants } from "../constants";
import { ICareerController, ICareerService } from "../interfaces";


export class CareerController implements ICareerController {

    careerService: ICareerService;

    constructor(careerService: ICareerService) {
        this.careerService = careerService;
    }

    public async getOpenPositions(req: Request, res: Response): Promise<any> {
        try {
            const department = (req.query.department as string)?.trim();
            if (!department) {
                return res.status(400).send(Constants.DEPARTMENT_REQUIRED);
            }
            console.log('getOpenPositions for ' + department);
            const positions = await this.careerService.getOpenPositions(department);
            return res.status(200).json(positions);
        } catch (error: any) {
            console.error(error);
            return res.status(error.status ? error.status : 500)
                .send(error.message ? error.message : Constants.INTERNAL_SERVER_ERROR);
        }
    }
}