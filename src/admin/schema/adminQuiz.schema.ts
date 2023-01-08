import { Prop , Schema, SchemaFactory } from "@nestjs/mongoose";


export type adminQuizDocument = AdminQuiz & Document


@Schema()
export default class AdminQuiz{

    @Prop({required : [true , "Admin name is required"]})
    name : string

    @Prop({required : [true , 'email field is required']})
    email : string

    @Prop({required : [true , "admin Id is required"]})
    adminId:string


    @Prop({required : [true , "quiz id array os required"]})
    quizes : string[]

}

export const AdminQuizSchema = SchemaFactory.createForClass(AdminQuiz)