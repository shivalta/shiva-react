import { beliPDAM } from "../../../components/global-state/pdam"
import Service from "../../../components/service/service"
import { Text } from "@chakra-ui/react"
import DetailPayment from "../../../components/detail-payment/detail-payment"
import { useRecoilState, useRecoilValue } from "recoil"
import { getDetailBeliPDAM } from "../../../components/global-state/pdam"
import ChoicePaymentMethod from "../../../components/choice-payment-method/choice-payment-method"
import { backNavEffects } from "../../../components/global-state/back-nav-effects"
import { useSetRecoilState } from "recoil"
import { useEffect } from "react"
import logoMandiri from "../../../public/images/mandiri-2.png"
import logoBCA from "../../../public/images/bca-2.png"


const Checkout = () => {

    const [dataBeliPDAM, setDataBeliPDAM] = useRecoilState(beliPDAM)
    const detailBeliPDAM = useRecoilValue(getDetailBeliPDAM)
    const setBackNavEffects = useSetRecoilState(backNavEffects)

    useEffect(()=>{
        setBackNavEffects({
            effects:()=>{
                setDataBeliPDAM({
                    ...dataBeliPDAM,
                    nameProduct:"",
                    bill:0,
                    adminFee:0,
                    total:0,
                    paymentMethod:undefined
                })
            }
        })
    })

    const listPaymentMethod = [
        {
            id:"BCA-1",
            name:"BCA virtual account",
            logo:"/../../../public/images/bca-2.png"
        },
        {
            id:"MANDIRI-2",
            name:"Mandiri virtual account",
            logo:"/../../../public/images/mandiri-2.png"
        }
    ]

    return(
        <>
            <Service setting={{my:"8"}} title="pdam"/>
            <Text as="h3" className="my-text" color="base" fontWeight="bold" mt="8">
                Detail Pembayaran
            </Text>
            <DetailPayment  detailPayment={detailBeliPDAM}/>
            <ChoicePaymentMethod
                listPaymentMethod={listPaymentMethod}
                setterServiceState={setDataBeliPDAM}
                serviceState={dataBeliPDAM}
            />
        </>
    )
}

export default Checkout