import { Prop , Schema, SchemaFactory } from "@nestjs/mongoose";


export type adminQuizDocument = AdminQuiz & Document


@Schema()
export default class AdminQuiz{

    @Prop()
    name : string

    @Prop()
    email : string

    @Prop()
    quizes : string[]

}

export const AdminQuizSchema = SchemaFactory.createForClass(AdminQuiz)