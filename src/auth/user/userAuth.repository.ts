import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { userDocument, UserRegister } from "./schema/userAuth.schema";


@Injectable()
export class UserRepository {
    constructor(@InjectModel(UserRegister.name) private UserModel:Model<userDocument>){}

    async createuser(userData:UserRegister):Promise<UserRegister>{
        return await this.UserModel.create(userData)
    }
} 