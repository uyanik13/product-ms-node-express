import { Response } from 'express';
export enum StatusCode {
    SUCCESS = '000',
    FAILURE = '001',
    RETRY = '002',
    INVALID_ACCESS_TOKEN = '003',
  }
  
  enum ResponseStatus {
    SUCCESS = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_ERROR = 500,
  }

 class ApiResponse {

    async successResponse(res: Response, msg: string) {
        const data = {
            status:ResponseStatus.SUCCESS,
            client_message: msg,
        }
        return res.status(200).json(data)
    }
    async successResponseWithData(res: Response, message: string, data: Object) {
        const resData = {
            status:ResponseStatus.SUCCESS,
            client_message: message,
            data: data,
        }
        return res.status(ResponseStatus.SUCCESS).json(resData)
    }

    async errorResponse(res:Response, serverMsg:String, clientMsg:string, statusCode = 500) {
        const data = {
            statusCode: StatusCode.FAILURE,
            message: {
                serverMsg: serverMsg,
                clientMsg: clientMsg,
            },
        }
        return res.status(ResponseStatus.INTERNAL_ERROR).json(data)
    }

    async notFoundResponse(res: Response, msg: string) {
        const data = {
            status:StatusCode.FAILURE,
            client_message:'Not Found',
        }
        return res.status(ResponseStatus.NOT_FOUND).json(data)
    }

    async validationErrorWithData(res: Response, msg: string, data: Object) {
        const resData = {
            status:StatusCode.INVALID_ACCESS_TOKEN,
            server_message: msg,
            data: data,
        }
        return res.status(ResponseStatus.BAD_REQUEST).json(resData)
    }

    async validationErrorOnly(res: Response, msg: string) {
        let resData = {
            status:StatusCode.FAILURE,
            error: msg,
        }
        return res.status(ResponseStatus.BAD_REQUEST).json(resData)
    }

    async unauthorizedResponse(res: Response) {
        const resData = {
            statusCode: StatusCode.FAILURE,
            client_message:'Unauthorized Access',
        }
        return res.status(ResponseStatus.UNAUTHORIZED).json(resData)
    }

}

export default new ApiResponse();