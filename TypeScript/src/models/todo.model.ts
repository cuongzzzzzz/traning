import mongoose from "mongoose"


const COLLECTION_NAME = "job"
const DOCUMENT_NAME = "jobs"

export interface Job {
    title: string
    content: string
    isCompleted?: boolean
}

export interface IJobModel extends Job, mongoose.Document { }

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        isCompleted: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME
    }
)

jobSchema.index({ title: "text", content: "text" })

const jobModel = mongoose.model<IJobModel>(DOCUMENT_NAME, jobSchema)
export default jobModel
