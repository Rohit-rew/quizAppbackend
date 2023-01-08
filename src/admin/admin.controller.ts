import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { type } from 'os';
import AdminQuizService  from './admin';

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


    // the below function returns the array of quiz id's which a admin has created
    @Get("find/:id")
    async getAdminQuizesById(@Param() adminId : params):Promise<string[]>{
        return await this.adminQuizService.getAdminQuizesById(adminId.id)
    }

    @Post("addquiz")
    async addQuiz(@Body() adminAndQuizId : {adminId : string , quizId : string}): Promise<string>{
        console.log(adminAndQuizId.adminId , adminAndQuizId.quizId)
        // return "heww"
        return await this.adminQuizService.addQuizIdToAdminQuizColl(adminAndQuizId.adminId , adminAndQuizId.quizId)
    }   


}


