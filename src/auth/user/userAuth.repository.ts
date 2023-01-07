/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userDocument, UserRegister } from './schema/userAuth.schema';
import { userRegisterBody } from './types';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserRegister.name) private UserModel: Model<userDocument>,
  ) {}

  async createUser(userData: userRegisterBody): Promise<UserRegister> {
    return await this.UserModel.create(userData);
  }

  async findUser(email:string):Promise<UserRegister|null>{
    return await this.UserModel.findOne({email})
  }
}
