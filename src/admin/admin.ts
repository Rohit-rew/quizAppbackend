import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AdminQuizrepo } from './AdminQuiz.repository';

//types
import { adminQuizData } from './admin.controller';

@Injectable()
export class AdminService {

    constructor(private adminQuizRepo : AdminQuizrepo){}

    async createAdmin(adminData : adminQuizData):Promise<string>{
        try {
            await this.adminQuizRepo.createAdminQuizColl(adminData)
            return "created"
            
        } catch (error) {
            console.log(error)
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
}
