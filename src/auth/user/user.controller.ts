/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { userLoginBody, userRegisterBody } from './types';
import { UserService } from './user';
import { Response } from 'express';


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
  @HttpCode(200)
  async login(@Body() userData:userLoginBody, @Res({ passthrough: true }) response: Response): Promise<successLogin> {
    const token = await this.userService.loginUser(userData)
    // set the token in header, this will save the token in the user's browser
    response.cookie("quizify" , token)
    return {
        status:HttpStatus.OK,
        success:true,
        message:"User logged in",
        token : token
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
