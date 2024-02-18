import { Response } from 'express';

export type ExpressResponseInterface = Promise<void | Response<any, Record<string, any>>>;
