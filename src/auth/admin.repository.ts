import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { AdminDocument, AdminLogin } from "./schema/admin.schema";

@Injectable()
export class Adminrepository {
    constructor(@InjectModel(AdminLogin.name) private adminModel:Model<AdminDocument>){}

    async findOne(AdminFilterQuery: FilterQuery<AdminLogin>) : Promise<AdminLogin | null> {
        return this.adminModel.findOne(AdminFilterQuery);
    }
}
