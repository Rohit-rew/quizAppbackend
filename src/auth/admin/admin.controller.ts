import { Body, Controller, Get, Post } from '@nestjs/common';
import { AdminService } from './admin';
import { AdminRepository } from './adminAuth.repository';

type adminLoginBody = {
    email : String
    password : String
}

type adminRegisterBody = {
    name : string,
    email : string,
    password : string
}

@Controller("admin")
export class AdminController {

    constructor(private adminService : AdminService , private adminRepo :AdminRepository){}

    @Post("login")
    login(@Body() body : adminLoginBody):String{
        console.log(body)
        return "/admin/login => admin login route"
    }

    @Post("register")
    async register(@Body() body : adminRegisterBody):Promise<String>{
        const admin = await this.adminRepo.createAdmin(body)
        console.log(admin)
        return "/admin/register => admin register route admin created"
    }
}
