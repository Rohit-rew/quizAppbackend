import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AdminDocument, AdminRegister } from "./schema/adminAuth.schema";

@Injectable()
export class AdminRepository {
    constructor(@InjectModel(AdminRegister.name) private adminModel:Model<AdminDocument>){}

    async findAdmin(email : String) : Promise<AdminRegister|null>{
        return await this.adminModel.findOne({email})
    }

    async createAdmin(adminData: AdminRegister) : Promise<AdminRegister> {
        return await this.adminModel.create(adminData)
    }
}