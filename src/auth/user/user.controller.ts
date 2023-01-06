import { Controller, Get, Post } from '@nestjs/common';

@Controller('user')
export class UserController {

    @Post("login")
    login():String{
        return "/user/login => userlogin Route post req"
    }

    @Post("register")
    register():String{
        return "/user/login => userregister Route post req"
    }
}
