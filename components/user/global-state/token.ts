import { atom, selector, RecoilState } from "recoil"
import { RecordDetailTransaction } from "../transaction/detail-transaction/detail-transaction"
import { rupiahFormatter } from "../../../helper/rupiah-formatter"

export type BeliToken = {
    id? : string
    noPLN? : string
    username?: string
    nameProduct? : string
    nameCategory?: string
    price? : number
    adminFee? : number
    tax?: number
    date?: string
    status?: boolean
    total?: number
    virtualAccount?: string
    paymentMethod?: {
        bank_name: string
        bank_code: string
    }
}

export const beliToken: RecoilState<BeliToken> = atom({
    key:"beli-token",
    default: {}
})

export const generateDetailBeliToken = (dataBeliToken:BeliToken) :RecordDetailTransaction[]=> {
    const detailBeliToken:RecordDetailTransaction[] = [
        {
            name:"Nama Produk",
            value:dataBeliToken.nameProduct? dataBeliToken.nameProduct : "-"
        },
        {
            name:"Metode Pembayaran",
            value: dataBeliToken.paymentMethod? dataBeliToken.paymentMethod.bank_name : "-"
        },
        {
            name:"No PLN",
            value:dataBeliToken.noPLN? dataBeliToken.noPLN : "-"
        },
        {
            name:"Nama Pengguna",
            value:dataBeliToken.username? dataBeliToken.username : "-"
        },
        {
            name:"Harga",
            value:dataBeliToken.price? rupiahFormatter(dataBeliToken.price,"Rp.") : "0"
        },
        {
            name:"Biaya admin",
            value:dataBeliToken.adminFee? rupiahFormatter(dataBeliToken.adminFee,"Rp.") : "0"
        },
        {
            name:"Pajak",
            value:dataBeliToken.tax? `${dataBeliToken.tax}%` : "0%"
        },
        {
            name:"Total pembayaran",
            value:dataBeliToken.total? rupiahFormatter(dataBeliToken.total,"Rp.") : "0"
        }
    ]

    return detailBeliToken
}

export const getDetailBeliToken = selector({
    key:"detail-beli-token",
    get:({get}) => {
        const dataBeliToken = get(beliToken)
        return generateDetailBeliToken(dataBeliToken)
    }
})