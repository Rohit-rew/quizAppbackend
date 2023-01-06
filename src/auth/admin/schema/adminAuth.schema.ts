import { Prop , Schema , SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type AdminDocument = AdminRegister & Document;

@Schema({collection : "Admins"})
export class AdminRegister {

    @Prop({required : true})
    name: string;

    @Prop({required : true})
    email: string;

    @Prop({required : true})
    password : string;

}

export const AdminSchema = SchemaFactory.createForClass(AdminRegister)