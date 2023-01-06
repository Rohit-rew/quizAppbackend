import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user';

@Controller('user')
export class UserController {

    constructor(private userService :UserService){}

    @Post("login")
    login():String{
        return "/user/login => userlogin Route post req"
    }

    @Post("register")
    register():String{
        return "/user/login => userregister Route post req"
    }
}
