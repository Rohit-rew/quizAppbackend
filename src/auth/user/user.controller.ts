/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { userLoginBody, userRegisterBody } from './types';
import { UserService } from './user';

//types
type successRegister = {
    status:number,
    success:boolean,
    message:string
}
type successLogin = {
    status:number,
    success:boolean,
    message:string,
    token : string
}

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('login')
  async login(@Body() userData : userLoginBody): Promise<successLogin> {
    const jwt = await this.userService.loginUser(userData)
    return {
        status:HttpStatus.OK,
        success:true,
        message:"User logged in",
        token : jwt
    }
  }

  @Post('register')
  async register(@Body() userData : userRegisterBody): Promise<successRegister> {
    await this.userService.registerUser(userData);
    return {
        status : HttpStatus.CREATED,
        success: true, 
        message : "user Created"
    };
  }

}
