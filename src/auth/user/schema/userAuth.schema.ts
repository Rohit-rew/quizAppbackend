/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type userDocument = UserRegister & Document

@Schema({collection : "Users"})
export class UserRegister{

    @Prop()
    name:string;

    @Prop()
    email:string;

    @Prop()
    password:string;
}

export const UserSchema = SchemaFactory.createForClass(UserRegister)