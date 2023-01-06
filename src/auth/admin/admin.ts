import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AdminRepository } from './adminAuth.repository';
import { AdminRegister } from './schema/adminAuth.schema';
import { adminRegisterBody , adminLoginBody } from './types';

@Injectable()
export class AdminService {

    constructor(private adminRepo :AdminRepository){}

    async registerAdmin(adminData : adminRegisterBody):Promise<AdminRegister>{

            // will receive Jwt in the body then decode and create Admin

            // check existing Admin
            const existingAdmin = await this.adminRepo.findAdmin(adminData.email)
            if(existingAdmin) throw new HttpException("Email already exists" , HttpStatus.BAD_REQUEST)
    
            // if Admin does not exist create new admin
            const newAdmin =  await this.adminRepo.createAdmin(adminData)
            if(!newAdmin) throw new HttpException("something went wrong" , HttpStatus.INTERNAL_SERVER_ERROR)

            return newAdmin
      
    }

    async loginAdmin(adminData : adminLoginBody):Promise<Boolean>{

        const existingAdmin = await this.adminRepo.findAdmin(adminData.email)
        if(!existingAdmin) throw new HttpException("user Does Not Exist" , HttpStatus.NOT_FOUND)

        if(existingAdmin.password != adminData.password) throw new HttpException("Incorrect password" , HttpStatus.UNAUTHORIZED)

        return true

    }
}
