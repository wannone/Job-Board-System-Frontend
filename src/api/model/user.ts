export type UserData = {
    id: number,
    username: string,
    role: string
}
export type UserAuth = {
    data : UserData,
    token : string
}