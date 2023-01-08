import { Body, Controller, Get, Post } from '@nestjs/common';
import { AdminService } from './admin';

export type adminQuizData = {
    name: string,
    email: string,
    adminId: string,
    quizes: string[]
}

@Controller('admin')
export class AdminController {

    constructor(private adminService : AdminService){}

    // @Post("create")
    // async createAdmin(@Body() adminQuizData : adminQuizData ):Promise<string>{
    //     return await this.adminService.createAdmin(adminQuizData)
    // }


    @Get("find")
    async getAdminQuizesById(@Body() adminId : string):Promise<string[]>{
        return await this.adminService.getAdminQuizesById("6yh76h76yh7")
    }
}


