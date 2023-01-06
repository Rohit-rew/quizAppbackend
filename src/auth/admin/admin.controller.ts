import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { AdminService } from './admin';
import { AdminRegister } from './schema/adminAuth.schema';
import { adminLoginBody, adminRegisterBody } from './types';


type success = {
    status : Number,
    success : Boolean,
    message : String
}

type adminLoggedIn = {
    status : Number,
    success : true,
    message : string 
}

@Controller("admin")
export class AdminController {

    constructor(private adminService:AdminService){}

    @Post("register")
    async register(@Body() adminData : adminRegisterBody):Promise<success>{
        const Admin = await this.adminService.registerAdmin(adminData)
        return {status : HttpStatus.CREATED , success : true , message : "Admin created"}
    }

    @Post("login")
    async login(@Body() adminData : adminLoginBody):Promise<success>{
        const status = await this.adminService.loginAdmin(adminData)
            return {status : HttpStatus.OK , success : true , message : "Admin Logged In" }
    }
}
