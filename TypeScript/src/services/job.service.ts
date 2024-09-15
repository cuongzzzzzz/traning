import jobModel, { IJobModel, Job } from "../models/todo.model";
import { ErrorResponse } from "../responses";
import jobSchema from "../schemas/job.schema";
import { deleteUndefinedOrNull } from "../utils";

interface GetAllResponse {
    totalPage: number
    currentPage: number
    limit: number
    total: number
    data: IJobModel[]
}

interface InputGetAll {
    page?: number
    limit?: number
    isCompleted?: "all" | "completed" | "not_completed"
    sort?: string
    s?: string
}

class Jobservice {
    static async add(data: Job): Promise<IJobModel> {

        const { error } = jobSchema.validate(data, { abortEarly: false })
        if (error) throw new ErrorResponse(422, error.details[0].message)
        const newJob = await jobModel.create(data)
        return newJob

    }
    static async getAll(query: InputGetAll): Promise<GetAllResponse> {
        const { page = 1, limit = 10, isCompleted = "all", sort = "time-asc", s } = query

        if (limit <= 0) throw new ErrorResponse(422, "limit must be a positive")
        if (page <= 0) throw new ErrorResponse(422, "page must be a positive")

        const sortOption: { [key: string]: 1 | -1 } = sort === "time-asc" ? { createdAt: 1 } : { createdAt: -1 };

        const filter = {
            ...(s && { $text: { $search: s } }),
            ...(isCompleted !== "all" && { isCompleted: isCompleted === "completed" })
        };

        const skip = limit * (page - 1)

        const [allJobs, total] = await Promise.all([
            jobModel.find(filter).skip(skip).limit(limit).sort(sortOption).lean(),
            jobModel.countDocuments(filter)
        ]);

        const totalPage = Math.ceil(total / limit)

        return {
            totalPage,
            total,
            limit: +limit,
            currentPage: page,
            data: allJobs
        }

    }
    static async getOne(id: string): Promise<IJobModel> {

        const foundJob = await jobModel.findById(id)
        if (!foundJob) throw new ErrorResponse(404, "job not found")
        return foundJob

    }
    static async update(id: string, update: Partial<Job>): Promise<any> {

        const updateObj = deleteUndefinedOrNull(update)
        const updateJob = await jobModel.findByIdAndUpdate(id, updateObj, { new: true, runValidators: true });
        if (!updateJob) throw new ErrorResponse(404, "job not found");
        return updateJob

    }
    static async delete(id: string): Promise<any> {

        const foundJob = await jobModel.findById(id)
        if (!foundJob) throw new ErrorResponse(404, "not found or deleted")
        return await jobModel.findByIdAndDelete(id)

    }

}
export default Jobservice


