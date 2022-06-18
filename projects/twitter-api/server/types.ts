import { Request } from 'express';

export type RequestWithId = Request & { id: string };
export type APIError = Error & { statusCode: number };
