/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRegister } from './schema/userAuth.schema';
import { UserRepository } from './userAuth.repository';

//bcrypt
import * as bcrypt from "bcrypt"

//types
import { userLoginBody, userRegisterBody } from './types/user.types';

@Injectable()
export class UserService {
  constructor(
    private userRepo: UserRepository,
    private jwtService: JwtService,
  ) {}

  async registerUser(userData: userRegisterBody): Promise<UserRegister> {
    // check if user already exists
    const existingUser = await this.userRepo.findUser(userData.email)
    if(existingUser) throw new HttpException("Email already exist" , HttpStatus.BAD_REQUEST)

    // encrypt the password 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(userData.password , salt)
    userData.password = hashedPassword

    // create the user
    return await this.userRepo.createUser(userData);
  }

  async loginUser(userData : userLoginBody) :Promise<string> {

    // find the user
    const existingUser = await this.userRepo.findUser(userData.email)
    if(!existingUser) throw new HttpException("User does not exist" , HttpStatus.NOT_FOUND)

    // check the password
    const passwordIsCorrect = await bcrypt.compare(userData.password , existingUser.password)
    if(!passwordIsCorrect) throw new HttpException("Incorrect password" , HttpStatus.UNAUTHORIZED);

    // if password is correct send the jwt with the payload
    const jwt = await this.jwtService.signAsync({email:existingUser.email , name:existingUser.name , admin : false, id : existingUser._id} , {algorithm : 'HS256' , secret : process.env.JWT_SECRET , expiresIn: '1d'})
    console.log(existingUser._id)
    return jwt
  }

}
