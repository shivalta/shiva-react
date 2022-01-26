import { atom, selector, RecoilState } from "recoil"
import { RecordDetailTransaction } from "../transaction/detail-transaction/detail-transaction"
import { rupiahFormatter } from "../../../helper/rupiah-formatter"

export type BeliPDAM = {
    id? : number
    noPDAM? : string
    region?: string
    username?: string
    nameProduct? : string
    nameCategory?: string
    bill? : number
    adminFee? : number
    date?: string
    status?: string
    tax?: number
    total?: number
    deadlinePayment?: string
    virtualAccount?: string
    paymentMethod?: {
        bank_name: string
        bank_code: string
    }
}

export const beliPDAM: RecoilState<BeliPDAM> = atom({
    key:"beli-pdam",
    default: {}
})

export const generateDetailBeliPDAM = (dataBeliPDAM:BeliPDAM) :RecordDetailTransaction[]=> {
    const detailBeliPDAM:RecordDetailTransaction[] = [
        {
            name:"Jenis produk",
            value:dataBeliPDAM.nameCategory? dataBeliPDAM.nameCategory : "-"
        },
        {
            name:"Nama produk",
            value:dataBeliPDAM.nameProduct? dataBeliPDAM.nameProduct : "-"
        },
        {
            name:"Metode pembayaran",
            value: dataBeliPDAM.paymentMethod? dataBeliPDAM.paymentMethod.bank_name : "-"
        },
        {
            name:"No PDAM",
            value:dataBeliPDAM.noPDAM? dataBeliPDAM.noPDAM : "-"
        },
        {
            name:"Wilayah",
            value:dataBeliPDAM.region? dataBeliPDAM.region : "-"
        },
        {
            name:"Nama pengguna",
            value:dataBeliPDAM.username? dataBeliPDAM.username : "-"
        },
        // {
        //     name:"Tagihan",
        //     value:dataBeliPDAM.bill? rupiahFormatter(dataBeliPDAM.bill,"Rp.") : "0"
        // },
        {
            name:"Biaya admin",
            value:dataBeliPDAM.adminFee? rupiahFormatter(dataBeliPDAM.adminFee,"Rp.") : "0"
        },
        {
            name:"Pajak",
            value:dataBeliPDAM.tax? `${dataBeliPDAM.tax}%` : "0%"
        },
        {
            name:"Total pembayaran",
            value:dataBeliPDAM.total? rupiahFormatter(dataBeliPDAM.total,"Rp.") : "0"
        }
    ]

    return detailBeliPDAM
}

export const getDetailBeliPDAM = selector({
    key:"detail-beli-pdam",
    get:({get}) => {
        const dataBeliPDAM = get(beliPDAM)
        return generateDetailBeliPDAM(dataBeliPDAM)
    }
})