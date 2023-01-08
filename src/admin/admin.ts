import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AdminQuizrepo } from './AdminQuiz.repository';

//types
import { adminQuizData } from './admin.controller';
import { JwtService } from '@nestjs/jwt';

type decodedJwt = {
    email: string,
    name: string,
    admin: boolean,
    id: string,
    iat: number,
    exp: number
  }

@Injectable()
export default class AdminQuizService {

    constructor(private adminQuizRepo : AdminQuizrepo , private jwtService : JwtService){}

    // => called by auth admin service
    async createAdminQuizColl(adminData : adminQuizData):Promise<string>{
        try {
            await this.adminQuizRepo.createAdminQuizColl(adminData)
            return "created"
        } catch (error) {
            throw new HttpException(error.message , HttpStatus.BAD_REQUEST)
        }
    }

    // ==>working
    async getAdminQuizesById(token : string):Promise<string[]>{
        const decodedJwt = await this.getDecodedJwt(token)

        try {
            const foundQuizes = await this.adminQuizRepo.findQuizes(decodedJwt.id)
            return foundQuizes
        } catch (error) {
            console.log(error)
            throw new HttpException(error.message , HttpStatus.UNAUTHORIZED)
        }
    }

    //=> called by quizes service
    async addQuizIdToAdminQuizColl(adminId : string , quizId:string):Promise<string>{
        try {
            await this.adminQuizRepo.addQuizIdInAdminQuizColl(adminId , quizId)
            return "done"
        } catch (error) {
            console.log(error)
            throw new HttpException(error.message , HttpStatus.BAD_GATEWAY)
        }
    }

    async getDecodedJwt(token:string): Promise<decodedJwt>{
        try {
            const decodedToken = await this.jwtService.verify(token , {secret : process.env.JWT_SECRET})
            return decodedToken
        } catch (error) {
            console.log(error)
            throw new HttpException(
                "Authorization token invalid",
                HttpStatus.UNAUTHORIZED
              );
        }
    }

    // duplicate function => need to move to utils
    async validateJwtToken(token : string):Promise<boolean>{
        try {
            const decodedToken = await this.jwtService.verify(token , {secret : process.env.JWT_SECRET})
            if(!decodedToken.admin) return false
            return true
        } catch (error) {
            console.log(error)
            throw new HttpException(error.message , HttpStatus.NOT_ACCEPTABLE)
        }
    }
}
