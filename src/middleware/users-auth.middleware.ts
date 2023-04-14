/* eslint-disable */
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import apiResponse from "../utilities/apiResponse";
import {NextFunction, Request, Response,} from 'express';
import  bcrypt  from 'bcrypt';

class Authentication {

   async validateToken(req:Request, res:Response, next: NextFunction) {
        const authorizationHeader = req.headers.authorization;
        const authorizationType = req.headers.authtype;
        let result:any;
        
        if (authorizationHeader) {
            const token = authorizationHeader.split(' ')[1]; // Bearer <token>
            const options = {
                expiresIn: process.env.JWT_EXPIRES_IN,
                issuer: process.env.JWT_ISSUER,
                subject: process.env.JWT_SUBJECT,
                audience: process.env.JWT_AUDIENCE,			
            };
           
            try {
                // verify makes sure that the token hasn't expired and has been issued by us
                result = jwt.verify(token, `${process.env.JWT_SECRET}`, options);
    
                // Let's pass back the decoded token to the request object
                req.decoded = result;
            
                // We call next to pass execution to the subsequent middleware
                return next();
            } catch (error: any) {
                console.log(error)
                return apiResponse.errorResponse(res, error.message, "Invalid token")
                 }
            // return;
        }
        const message = "Authentication error; Token required.";
        return apiResponse.errorResponse(res, message, message);
    };
    
}

export default new Authentication();
