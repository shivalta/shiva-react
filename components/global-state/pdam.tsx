import { atom, selector, RecoilState } from "recoil"
import { RecordDetailPayment } from "../detail-payment/detail-payment"
import { rupiahFormatter } from "../../helper/rupiah-formatter"

export type BeliPDAM = {
    id? : string
    noPDAM? : string
    region?: string
    nameProduct? : string
    bill? : number
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

export const beliPDAM: RecoilState<BeliPDAM> = atom({
    key:"beli-pdam",
    default: {}
})

export const getDetailBeliPDAM = selector({
    key:"detail-beli-pdam",
    get:({get}) => {
        const dataBeliPDAM = get(beliPDAM)
        const detailBeliPDAM:RecordDetailPayment[] = [
            {
                name:"Nama Produk",
                value:dataBeliPDAM.nameProduct? dataBeliPDAM.nameProduct : "-"
            },
            {
                name:"Metode Pembayaran",
                value: dataBeliPDAM.paymentMethod? dataBeliPDAM.paymentMethod.name : "-"
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
                name:"Tagihan",
                value:dataBeliPDAM.bill? rupiahFormatter(dataBeliPDAM.bill,"Rp.") : "0"
            },
            {
                name:"Biaya admin",
                value:dataBeliPDAM.adminFee? rupiahFormatter(dataBeliPDAM.adminFee,"Rp.") : "0"
            },
            {
                name:"Total pembayaran",
                value:dataBeliPDAM.total? rupiahFormatter(dataBeliPDAM.total,"Rp.") : "0"
            }
        ]
        return detailBeliPDAM
    }
})