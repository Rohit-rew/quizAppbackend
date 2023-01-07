/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongoose";

export type userDocument = UserRegister & Document

@Schema({collection : "Users"})
export class UserRegister{

    @Prop()
    name:string;

    @Prop()
    email:string;

    @Prop()
    password:string;

    _id:string

}

export const UserSchema = SchemaFactory.createForClass(UserRegister)