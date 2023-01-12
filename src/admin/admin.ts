import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AdminQuizrepo } from './AdminQuiz.repository';

//types
import { JwtService } from '@nestjs/jwt';
import { adminQuizData } from './types/admin.types';
import { decodedJwt } from './types/admin.types';

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
