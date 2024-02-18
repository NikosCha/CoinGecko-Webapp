import httpStatus from 'http-status';
import { APIErrorInterface } from '../../typings/error';

class APIError extends Error{
    status: number | null;
    extraData: string;

    constructor({
      msg,
      extraData= "something went wrong",
      status = httpStatus.INTERNAL_SERVER_ERROR,
    }: APIErrorInterface) {
        super(msg);
        this.status = status || 503;
        this.extraData = extraData;
    }
  }
  
  export default APIError;