/* eslint-disable */
import apiResponse from '../utilities/apiResponse';
import {NextFunction, Request, Response,} from 'express';

class Authorization {
  authorizeRoles(...permittedRoles: string[])  {
    return (req:Request, res:Response, next: NextFunction) => {
        const payload:any = req.decoded
        console.log('Payload:', payload)
        console.log('permittedRoles: ', ...permittedRoles)
        if (
            (payload && permittedRoles.includes(payload.role)) ||
            (payload && permittedRoles.includes(payload.isSuperAdmin))
        ) {
            //console.log("payload:",payload.merchantID);
            next() // role is allowed, so continue on the next middleware
        } else {
            return apiResponse.unauthorizedResponse(res) // user is forbidden
        }
    }
   
}
}




export default new Authorization();
