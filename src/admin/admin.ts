import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AdminQuizrepo } from './AdminQuiz.repository';

//types
import { adminQuizData } from './admin.controller';

@Injectable()
export default class AdminQuizService {

    constructor(private adminQuizRepo : AdminQuizrepo){}

    async createAdminQuizColl(adminData : adminQuizData):Promise<string>{
        try {
            await this.adminQuizRepo.createAdminQuizColl(adminData)
            return "created"
        } catch (error) {
            throw new HttpException(error.message , HttpStatus.BAD_REQUEST)
        }
    }


    async getAdminQuizesById(adminId : string):Promise<string[]>{

        try {
            const foundQuizes = await this.adminQuizRepo.findQuizes(adminId)
            return foundQuizes
        } catch (error) {
            console.log(error)
            throw new HttpException(error.message , HttpStatus.UNAUTHORIZED)
        }
    }

    async addQuizIdToAdminQuizColl(adminId : string , quizId:string):Promise<string>{
        try {
            await this.adminQuizRepo.addQuizIdInAdminQuizColl(adminId , quizId)
            return "done"
        } catch (error) {
            console.log(error)
            throw new HttpException(error.message , HttpStatus.BAD_GATEWAY)
        }
    }
}
