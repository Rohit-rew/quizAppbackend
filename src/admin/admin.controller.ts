import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req } from '@nestjs/common';
import { type } from 'os';
import AdminQuizService  from './admin';
import { Request } from 'express';

export type adminQuizData = {
    name: string,
    email: string,
    adminId: string,
    quizes: string[]
}

type params = {
    id : string
}

@Controller('admin')
export class AdminController {

    constructor(private adminQuizService : AdminQuizService){}

    // => protected ==> only admin can access
    // the below function returns the array of quiz id's which a admin has created
    @Get("find")
    async getAdminQuizesById(@Req() request: Request):Promise<string[]>{
        const token = request.headers.authorization;
        if(token){ //if token is present validate it
            const isValidToken = this.adminQuizService.validateJwtToken(token)
            if(!isValidToken) throw new HttpException("invalid token", HttpStatus.UNAUTHORIZED);
            const quizIdArray = await this.adminQuizService.getAdminQuizesById(token)
            return quizIdArray

        }else{ // if token not present throw error
            throw new HttpException(
                "Authorization token not present",
                HttpStatus.UNAUTHORIZED
              );
        }
    }



    @Post("addquiz")
    async addQuiz(@Body() adminAndQuizId : {adminId : string , quizId : string}): Promise<string>{
        console.log(adminAndQuizId.adminId , adminAndQuizId.quizId)
        // return "heww"
        return await this.adminQuizService.addQuizIdToAdminQuizColl(adminAndQuizId.adminId , adminAndQuizId.quizId)
    }   


}


