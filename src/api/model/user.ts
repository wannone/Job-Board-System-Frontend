export type UserData = {
    id: number,
    username: string,
    role: string
}
export type UserAuth = {
    data : UserData,
    token : string
}
export type UserRegist = {
    username: string,
    name: string,
    email: string,
    company: string,
    password: string,
}