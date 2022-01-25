import { atom, RecoilState } from "recoil"

export type User = {
    data?: ResponseDataUser
    valid: boolean
    afterLogin?:string
}

export type ResponseDataUser = {
    token: string
    user:{
        id: string
        name: string
        email: string
        handphone: string
        address: string
    }
}

export const user: RecoilState<User> = atom({
    key:"user",
    default: {
        valid: false,
        afterLogin:""
    } as User
})



