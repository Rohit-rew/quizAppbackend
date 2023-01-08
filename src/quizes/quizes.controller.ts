import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
} from "@nestjs/common";
import { quizType } from "./allQuizes.reposotory";
import { QuizesService } from "./quizes";
import { Request } from "express";

type createQuizResponse = {
  status: number;
  message: string;
  id: string;
};

@Controller("quiz")
export class QuizesController {
  constructor(private quizesService: QuizesService) {}

  // ===> protected
  // this creates a quiz and returns the quiz id which is then stored in adminquizcollection as a refrence
  @Post("create")
  async createQuiz(
    @Body() quizData: quizType,
    @Req() request: Request
  ): Promise<createQuizResponse> {
    const token = request.headers.authorization;
    if (token) {
      const isValidAdminToken = await this.quizesService.validateJwtToken(
        token
      );
      if (!isValidAdminToken)
        throw new HttpException("invalid token", HttpStatus.UNAUTHORIZED);

      const id = await this.quizesService.createQuiz(quizData);
      return {
        status: 201,
        message: "quiz created",
        id: id,
      };
    } else {
      throw new HttpException(
        "Authorization token not present",
        HttpStatus.UNAUTHORIZED
      );
    }
  }

  //===> protected
  // this gets all quizes that a particular admin has created and returns the quiz array
  @Post("getMany")
  async GetManyById(
    @Body() idArray: string[],
    @Req() request: Request
  ): Promise<quizType[] | null> {
    const token = request.headers.authorization;
    if (token) {
      // if token is present validate it
      const isValidAdminToken = await this.quizesService.validateJwtToken(
        token
      );
      //if token is not a valid admin token throw error
      if (!isValidAdminToken)
        throw new HttpException("invalid token", HttpStatus.UNAUTHORIZED);
      // if token is valid admin token proceed with the function
      const quizes = await this.quizesService.GetManyById(idArray);
      return quizes;
    } else { // if token is not present throw unauthorised error
      throw new HttpException(
        "Authorization token not present",
        HttpStatus.UNAUTHORIZED
      );
    }
  }
}
