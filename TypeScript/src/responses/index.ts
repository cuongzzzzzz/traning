import { Request, Response, NextFunction } from "express"

export class SuccessResponse {
    public message: string;
    public status: number;
    public metadata: object | null;

    constructor({
        message = '',
        status = 200,
        metadata = {},
    }: {
        message?: string;
        status?: number;
        reasonStatusCode?: string;
        metadata?: {};
    }) {
        this.message = message;
        this.status = status;
        this.metadata = metadata;
    }

    public send(res: Response): void {
        res.status(this.status).json(this);
    }
}

export class ErrorResponse extends Error {
    private status: number

    constructor(status: number, message: string) {
        super(message)
        this.status = status
    }
}