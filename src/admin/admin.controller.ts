import { Controller, Get } from '@nestjs/common';
import { AdminService } from './admin';

@Controller('admin')
export class AdminController {

    constructor(private adminService : AdminService){}

    @Get("create")
    test():string{
        return this.adminService.create()
    }
    @Get("find")
    test2():string{
        return this.adminService.find()
    }
}


