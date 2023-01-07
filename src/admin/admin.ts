import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {

    sendString():string{
        return "works"
    }
}
