import { questionType } from "../schema/allQuizes.schema";

export type quizType = {
  quizName: string;
  totalQuestions: number;
  category: string;
  createdBy: string;
  creatorId: string;
  questionSet: questionType[];
};

export type createQuizResponse = {
  status: number;
  message: string;
  id: string;
};

export type paramTypes = {
  id: string;
};
