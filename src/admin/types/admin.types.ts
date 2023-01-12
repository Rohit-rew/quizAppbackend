export type adminQuizData = {
    name: string,
    email: string,
    adminId: string,
    quizes: string[]
}

export type decodedJwt = {
    email: string,
    name: string,
    admin: boolean,
    id: string,
    iat: number,
    exp: number
}