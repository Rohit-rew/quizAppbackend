import { Controller, Get } from '@nestjs/common';
import { AdminService } from './admin';

@Controller('admin')
export class AdminController {

    constructor(private adminService : AdminService){}

    @Get()
    test():string{
        return this.adminService.sendString()
    }
}
