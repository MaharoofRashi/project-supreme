import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(Error)
export class HttpExceptionFilter implements ExceptionFilter {
    constructor() {}
    async catch(exception: HttpException, host: ArgumentsHost) {
        console.log(exception);
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        let status =
            exception instanceof HttpException ? exception.getStatus() : 500;
        if (exception.name === 'ZodError') status = 400;

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: exception.message,
        });
    }
}
