import { Controller, Get, Post } from '@nestjs/common';
import { Admin } from './admin';

@Controller("admin")
export class AdminController {

    constructor(private adminService : Admin){}

    @Post("login")
    login():String{
        return "/admin/login => admin login route"
    }

    @Post("register")
    register():String{
        return "/admin/register => admin register route"
    }
}
