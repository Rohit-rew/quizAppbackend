import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { AdminService } from './admin';

//types
import { adminLoginBody, adminRegisterBody, successLogin, successRegister } from './types/admin.types';




@Controller("admin")
export class AdminController {

    constructor(private adminService:AdminService){}

    @Post("register")
    async register(@Body() adminData : adminRegisterBody):Promise<successRegister>{
        const Admin = await this.adminService.registerAdmin(adminData)
        return {status : HttpStatus.CREATED , success : true , message : "Admin created"}
    }


    @Post("login")
    @HttpCode(200)
    async login(@Body() adminData : adminLoginBody , @Res({ passthrough: true }) response: Response):Promise<successLogin>{
        const token = await this.adminService.loginAdmin(adminData)
        // set the token in header, this will save the token in the user's browser
        response.cookie("quizify" , token)
        return {status : HttpStatus.OK , success : true , message : "Admin Logged In" , token : token }
    }
}
 