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
    
    @Prop({required : [true , "Quiz name not provided"]})
    quizName: string

    @Prop({required : [true , "Total Questions not provided"]})
    totalQuestions: number

    @Prop({required : [true , "category not provided"]})
    category: string

    @Prop({required : [true , "createdBy not provided"]})
    createdBy: string

    @Prop({required : [true , "Question set not provided"]})
    questionSet: questionType[]

    @Prop({required : [true , "creator id requierd"]})
    creatorId: string

    @Prop({default : Date.now()})
    createdAt : Date

    _id: string

}

export const AllQuizesSchema = SchemaFactory.createForClass(AllQuizes)