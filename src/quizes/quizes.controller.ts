import { Body, Controller, Get, Post } from '@nestjs/common';
import { quizType } from './allQuizes.reposotory';
import { QuizesService } from './quizes';

type createQuizResponse = {
    status : number,
    message : string,
    id : string
}   

@Controller('quiz')
export class QuizesController {
    constructor(private quizesService : QuizesService){}

    @Post("create")
    async createQuiz(@Body() quizData : quizType ):Promise<createQuizResponse>{
        const id = await this.quizesService.createQuiz(quizData)
        return {
            status : 201,
            message : "quiz created",
            id : id
        }
    }

    @Post("getMany")
    async GetManyById(@Body() idArray : string[]): 
    Promise<quizType[] | null>{
        console.log(idArray)
        const quizes = await this.quizesService.GetManyById(idArray)
        return quizes
    }
    

}
