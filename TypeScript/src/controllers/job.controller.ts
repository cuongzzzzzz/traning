import { Response, Request } from "express"
import Jobservice from "../services/job.service"
import { SuccessResponse } from "../responses";


export class JobController {
    static async add(req: Request, res: Response): Promise<any> {
        return new SuccessResponse({
            message: "Create job successfully",
            metadata: await Jobservice.add(req.body),
        }).send(res);
    }
    public static async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params
        return new SuccessResponse({
            message: "get job successfully",
            metadata: await Jobservice.getOne(id)
        }).send(res)
    }
    public static async getAll(req: Request, res: Response): Promise<any> {
        return new SuccessResponse({
            message: "get jobs successfully",
            metadata: await Jobservice.getAll(req.query)
        }).send(res)
    }
    public static async update(req: Request, res: Response): Promise<any> {
        const { id } = req.params
        return new SuccessResponse({
            message: "update job successfully",
            metadata: await Jobservice.update(id, req.body)
        }).send(res)
    }
    public static async delete(req: Request, res: Response): Promise<any> {
        const { id } = req.params
        return new SuccessResponse({
            message: "delete job successfully",
            metadata: await Jobservice.delete(id)
        }).send(res)
    }
}
