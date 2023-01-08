import { Prop , Schema, SchemaFactory } from "@nestjs/mongoose";

export type AllQuizDocument = AllQuizes & Document

export type questionType = {
    ques : string,
    choice : {
        1: string,
        2: string,
        3: string,
        4: string,
    }
    hasMultipleAns : boolean,
    answer : number[],
    difficultyLevel : number
}


@Schema()
export default class AllQuizes{
    
    @Prop({required : true})
    quizName: string

    @Prop()
    totalQuestions: number

    @Prop()
    category: string

    @Prop()
    createdBy: string

    @Prop()
    questionSet: questionType[]

    _id: string

}

export const AllQuizesSchema = SchemaFactory.createForClass(AllQuizes)