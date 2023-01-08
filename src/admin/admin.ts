import { Injectable } from '@nestjs/common';
import { AdminQuizrepo } from './AdminQuiz.repository';

@Injectable()
export class AdminService {

    constructor(private adminQuizRepo : AdminQuizrepo){}

    create():string{
        
        return "created"
    }
    find():string{

        return "found"
    }
}
