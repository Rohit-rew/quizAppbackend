import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import AllQuizes, { AllQuizDocument, questionType } from "./schema/allQuizes.schema";

export type quizType = {
    quizName: string
    totalQuestions: number
    category: string
    createdBy: string
    questionSet: questionType[]
}

@Injectable()
export class AllQuizesRepo {
    constructor(@InjectModel(AllQuizes.name) private allQuizModal : Model<AllQuizDocument>){}

    async createQuiz(quizData : quizType): Promise<AllQuizes>{
        return await this.allQuizModal.create(quizData)
    }

    async findQuizes(idArray : string[]) : Promise<AllQuizes[] | null>{
        return await this.allQuizModal.find({"_id" : {"$in" : idArray}})
    }
}

