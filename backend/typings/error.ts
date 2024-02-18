import { NextFunction, Request, Response } from "express";

export interface APIErrorInterface {
    msg: string;
    status: number;
    extraData: string;
  }
  
export abstract class ErrorServiceInterface {

    public static handler: (
      error: APIErrorInterface,
      req: Request,
      res: Response,
      next: NextFunction
    ) => void;
  
  }
  