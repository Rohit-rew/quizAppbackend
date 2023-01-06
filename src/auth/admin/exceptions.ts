
export class AdminAlreadyExists extends Error {
    constructor(msg:string){
        super(msg)
    }
}