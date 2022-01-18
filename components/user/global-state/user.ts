import { atom, RecoilState } from "recoil"

export type User = {
    token?: string
    valid: boolean
    afterLogin?:string
}

export const user: RecoilState<User> = atom({
    key:"user",
    default: {
        token: "",
        valid: false,
        afterLogin:""
    } as User
})