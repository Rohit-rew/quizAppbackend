import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
} from "@nestjs/common";
import { quizType } from "./allQuizes.reposotory";
import { QuizesService } from "./quizes";
import { Request } from "express";
import AllQuizes from "./schema/allQuizes.schema";

// types
type createQuizResponse = {
  status: number;
  message: string;
  id: string;
};

type paramTypes = {
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
      // if token is present validate it
      const isValidAdminToken = await this.quizesService.validateAdminJwtToken(
        token
      );
      if (!isValidAdminToken)
        // if not a valid admin token throw error
        throw new HttpException("invalid token", HttpStatus.UNAUTHORIZED);
      // if valid admin token proceed with the operation
      const id = await this.quizesService.createQuiz(quizData, token);
      return {
        status: 201,
        message: "quiz created",
        id: id,
      };
    } else {
      // if token is not present throw unauthorised error
      throw new HttpException(
        "Authorization token not present",
        HttpStatus.UNAUTHORIZED
      );
    }
  }

  //===> protected
  // this gets all quizes that a particular admin has created and returns the quiz array
  @Get("getAll")
  async GetManyById(@Req() request: Request): Promise<quizType[] | null> {
    const token = request.headers.authorization;
    if (token) {
      // if token is present validate it
      const isValidAdminToken = await this.quizesService.validateAdminJwtToken(
        token
      );
      //if token is not a valid admin token throw error
      if (!isValidAdminToken)
        throw new HttpException("invalid token", HttpStatus.UNAUTHORIZED);
      // if token is valid admin token proceed with the function
      const quizes = await this.quizesService.GetManyById(token);
      return quizes;
    } else {
      // if token is not present throw unauthorised error
      throw new HttpException(
        "Authorization token not present",
        HttpStatus.UNAUTHORIZED
      );
    }
  }

  // => protected route => only users can go
  @Get(":id")
  async test(
    @Param() param: paramTypes,
    @Req() request: Request
  ): Promise<AllQuizes> {
    const token = request.headers.authorization;
    if (token) {
      // if token persent validate it
      const isValidToken = await this.quizesService.validateUserJwtToken(token);
      if (!isValidToken)
        throw new HttpException("invalid token", HttpStatus.UNAUTHORIZED);

      const quiz = await this.quizesService.GetOneById(param.id);
      return quiz;
    } else {
      throw new HttpException(
        "Authorization token not present",
        HttpStatus.UNAUTHORIZED
      );
    }
  }
}
