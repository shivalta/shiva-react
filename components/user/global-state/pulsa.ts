import { atom, selector, RecoilState } from "recoil"
import { RecordDetailTransaction } from "../transaction/detail-transaction/detail-transaction"
import { rupiahFormatter } from "../../../helper/rupiah-formatter"

export type BeliPulsa = {
    id? : string
    noHandphone? : string
    nameCategory?: string
    nameProduct? : string
    price? : number
    adminFee? : number
    tax?: number
    date?: Date
    status?: boolean
    total?: number
    virtualAccount?: string
    paymentMethod?: {
        id:string
        name:string
        logo:any
    }
}

export const beliPulsa: RecoilState<BeliPulsa> = atom({
    key:"beli-pulsa",
    default: {}
})

export const generateDetailBeliPulsa = (dataBeliPulsa:BeliPulsa):RecordDetailTransaction[]=> {
    const detailBeliPulsa:RecordDetailTransaction[] = [
        {
            name:"Nama Produk",
            value:dataBeliPulsa.nameProduct? dataBeliPulsa.nameProduct : "-"
        },
        {
            name:"Metode Pembayaran",
            value: dataBeliPulsa.paymentMethod? dataBeliPulsa.paymentMethod.name : "-"
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
            name:"Pajak",
            value:dataBeliPulsa.tax? `${dataBeliPulsa.tax}%` : "0%"
        },
        {
            name:"Total pembayaran",
            value:dataBeliPulsa.total? rupiahFormatter(dataBeliPulsa.total,"Rp.") : "0"
        }
    ]

    return detailBeliPulsa
}

export const getDetailBeliPulsa = selector({
    key:"detail-beli-pulsa",
    get:({get}) => {
        const dataBeliPulsa = get(beliPulsa)
        return generateDetailBeliPulsa(dataBeliPulsa)
    }
})