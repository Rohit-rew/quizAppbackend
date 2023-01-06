import { Prop , Schema , SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type AdminDocument = AdminLogin & Document;

@Schema()
export class AdminLogin {

    @Prop()
    email: string;

    @Prop()
    password : string;

}

export const AdminSchema = SchemaFactory.createForClass(AdminLogin)