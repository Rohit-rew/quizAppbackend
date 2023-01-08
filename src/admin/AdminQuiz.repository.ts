import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import AdminQuiz, { adminQuizDocument } from "./schema/adminQuiz.schema";


const data = ["63b9f2e249fe06fbed03fd81" , "63b9f2fc49fe06fbed03fd89" , "63b9f2fe49fe06fbed03fd8f"]

@Injectable()
export class AdminQuizrepo{
    constructor(@InjectModel(AdminQuiz.name) private AdminQuizModal: Model<adminQuizDocument>){}

    async createAdminQuizColl(adminQuizData : AdminQuiz): Promise<AdminQuiz>{
        return await this.AdminQuizModal.create(adminQuizData)
    }

    async findQuizes(adminId : string): Promise<string[]>{
        const foundData = await this.AdminQuizModal.findOne({adminId} , {quizes : 20});
        if(!foundData) throw new HttpException('admin Quiz collection does not exist' , HttpStatus.NOT_FOUND)
            return  foundData.quizes
    }

    async addQuizIdInAdminQuizColl(adminId : string , quizId : string):Promise<void>{
        await this.AdminQuizModal.findOneAndUpdate({adminId : adminId} , { $push: { quizes: quizId } })
    }

} 

