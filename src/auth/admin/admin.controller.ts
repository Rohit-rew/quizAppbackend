import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { AdminService } from './admin';
import { AdminRegister } from './schema/adminAuth.schema';
import { adminLoginBody, adminRegisterBody } from './types';


type adminCreated = {
    status : Number,
    success : Boolean,
    message : String
}

@Controller("admin")
export class AdminController {

    constructor(private adminService:AdminService){}


    @Post("login")
    login(@Body() body : adminLoginBody):String{
        console.log(body)
        return "/admin/login => admin login route"
    }

    @Post("register")
    async register(@Body() adminData : adminRegisterBody):Promise<adminCreated>{
        const Admin = await this.adminService.registerUser(adminData)
        return {status : HttpStatus.CREATED , success : true , message : "Admin created"}
    }
}
