import httpStatus from 'http-status';

import { Request, Response, NextFunction } from 'express';


import { APIErrorInterface, ErrorServiceInterface } from '../../typings/error';

export default class ErrorService extends ErrorServiceInterface {
  public static handler = (
    error: APIErrorInterface,
    req: Request,
    res: Response,
    _next?: NextFunction
  ): void => {
    const status = error.status || 503
    const response: APIErrorInterface = {
      ...error,
      status: status,
      extraData: error.extraData,
      msg: error.msg || 'Something went wrong',
    };

    res.status(status).json(response);
  };

}
