import { atom } from "recoil";

export type BeliPulsa = {
    id? : string
    noHandphone? : string
    nameProduct? : string
    price? : number
    adminFee? : number
    date?: Date
    status?: string
    total?: number
    paymentMethod?: {
        id:string
        name:string
        logo:any
    }
}

export const beliPulsa = atom({
    key:"beli-pulsa",
    default: {} as BeliPulsa
})