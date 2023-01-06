import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type userDocument = UserRegister & Document

@Schema({collection : "Users"})
export class UserRegister{

    @Prop()
    name:String;

    @Prop()
    email:String;

    @Prop()
    password:String;
}

export const UserSchema = SchemaFactory.createForClass(UserRegister)