import { Controller, Get, Post } from '@nestjs/common';
import { User } from './user';

@Controller('user')
export class UserController {

    constructor(private userService :User){}

    @Post("login")
    login():String{
        return "/user/login => userlogin Route post req"
    }

    @Post("register")
    register():String{
        return "/user/login => userregister Route post req"
    }
}
