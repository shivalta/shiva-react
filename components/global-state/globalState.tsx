import { atom } from "recoil"
import { selector } from "recoil"
import { RecordDetailPayment } from "../detail-payment/detail-payment"
import { rupiahFormatter } from "../../helper/rupiah-formatter"

export type BeliPulsa = {
    id? : string
    noHandphone? : string
    nameProduct? : string
    price? : number
    adminFee? : number
    date?: Date
    status?: string
    total?: number
    virtualAccount?: string
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

export const getDetailBeliPulsa = selector({
    key:"detail-beli-pulsa",
    get:({get}) => {
        const dataBeliPulsa = get(beliPulsa)
        const detailBeliPulsa:RecordDetailPayment[] = [
            {
                name:"Nama Produk",
                value:dataBeliPulsa.nameProduct? dataBeliPulsa.nameProduct : "-"
            },
            {
                name:"No handphone",
                value:dataBeliPulsa.noHandphone? dataBeliPulsa.noHandphone : "-"
            },
            {
                name:"Harga",
                value:dataBeliPulsa.price? rupiahFormatter(dataBeliPulsa.price,"Rp.") : "0"
            },
            {
                name:"Biaya admin",
                value:dataBeliPulsa.adminFee? rupiahFormatter(dataBeliPulsa.adminFee,"Rp.") : "0"
            },
            {
                name:"Total pembayaran",
                value:dataBeliPulsa.total? rupiahFormatter(dataBeliPulsa.total,"Rp.") : "0"
            }
        ]
        return detailBeliPulsa
    }
})