import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { AdminService } from './admin';
import { AdminRegister } from './schema/adminAuth.schema';
import { adminLoginBody, adminRegisterBody } from './types';


type successRegister = {
    status : number,
    success : boolean,
    message : string
}

type successLogin = {
    status : number,
    success : true,
    message : string ,
    token: string
}

@Controller("admin")
export class AdminController {

    constructor(private adminService:AdminService){}

    @Post("register")
    async register(@Body() adminData : adminRegisterBody):Promise<successRegister>{
        const Admin = await this.adminService.registerAdmin(adminData)
        return {status : HttpStatus.CREATED , success : true , message : "Admin created"}
    }

    @Post("login")
    async login(@Body() adminData : adminLoginBody):Promise<successLogin>{
        const status = await this.adminService.loginAdmin(adminData)
            return {status : HttpStatus.OK , success : true , message : "Admin Logged In" , token : status }
    }
}
