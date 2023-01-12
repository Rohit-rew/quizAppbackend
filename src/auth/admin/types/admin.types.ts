export type successRegister = {
    status : number,
    success : boolean,
    message : string
}

export type successLogin = {
    status : number,
    success : true,
    message : string ,
    token: string
}

export type adminLoginBody = {
    email : string
    password : string
}

export type adminRegisterBody = {
    name : string,
    email : string,
    password : string
}