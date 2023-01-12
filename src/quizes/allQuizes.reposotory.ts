import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import AllQuizes, { AllQuizDocument, questionType } from "./schema/allQuizes.schema";
import { quizType } from "./types/quiz.type";


@Injectable()
export class AllQuizesRepo {
    constructor(@InjectModel(AllQuizes.name) private allQuizModal : Model<AllQuizDocument>){}

    async createQuiz(quizData : quizType): Promise<AllQuizes>{
        return await this.allQuizModal.create(quizData)
    }

    async findQuizes(adminId : string) : Promise<AllQuizes[]>{
        const quizes = await this.allQuizModal.find({creatorId : adminId})
        return quizes
    }

    async findOneById(quizId:string) : Promise<AllQuizes>{
        const quiz = await this.allQuizModal.findById(quizId)
        if(!quiz) throw new HttpException("Invalid quiz id" , HttpStatus.NOT_FOUND)
        return quiz
    }
}

