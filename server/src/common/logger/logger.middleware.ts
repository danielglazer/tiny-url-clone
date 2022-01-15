import { randomUUID } from "crypto";
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction): void {
    const requestIdHeaderKey = 'x-request-id';
    const requestIdHeaderValue = Array.isArray(req.headers[requestIdHeaderKey]) ?
    (req.headers[requestIdHeaderKey][0] ?? randomUUID()) :
    req.headers[requestIdHeaderKey] ?? randomUUID();
    console.log('Request with id...' +  requestIdHeaderValue);
    next();
  }
}