import { Request, Response, NextFunction } from "express"

export const deleteUndefinedOrNull = (data: any) => {
    Object.keys(data).forEach(key => {
        if (data[key] === undefined || null) {
            delete data[key]
        }
    })
    return data
}


export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch((error) => next(error))
    }
}
