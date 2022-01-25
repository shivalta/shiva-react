import { atom, RecoilState } from "recoil"

export type Admin = {
    data?: ResponseDataAdmin
    valid: boolean
}

export type ResponseDataAdmin = {
    token: string
    user:{
        id: string
        name: string
        email: string
        handphone: string
        address: string
    }
}

export const admin: RecoilState<Admin> = atom({
    key:"admin",
    default: {
        valid: false
    } as Admin
})



