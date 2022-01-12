import { beliPulsa } from "../../../components/global-state/pulsa"
import Service from "../../../components/service/service"
import { Text } from "@chakra-ui/react"
import DetailPayment from "../../../components/detail-payment/detail-payment"
import { useRecoilState, useRecoilValue } from "recoil"
import { getDetailBeliPulsa } from "../../../components/global-state/pulsa"
import ChoicePaymentMethod from "../../../components/choice-payment-method/choice-payment-method"
import { backNavEffects } from "../../../components/global-state/back-nav-effects"
import { useSetRecoilState } from "recoil"
import { UserLayout } from "../../_app"
import logoMandiri from "../../../public/images/mandiri-2.png"
import logoBCA from "../../../public/images/bca-2.png"
import { useEffect } from "react"

const Checkout = () => {

    const [dataBeliPulsa, setDataBeliPulsa] = useRecoilState(beliPulsa)
    const detailBeliPulsa = useRecoilValue(getDetailBeliPulsa)
    const setBackNavEffects = useSetRecoilState(backNavEffects)

    useEffect(()=>{
        setBackNavEffects({
            effects:()=>{
                setDataBeliPulsa({
                    ...dataBeliPulsa,
                    nameProduct:"",
                    price:0,
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
            <Service setting={{my:"8"}} title="pulsa"/>
            <Text as="h3" className="my-text" color="base" fontWeight="bold" mt="8">
                Detail Pembayaran
            </Text>
            <DetailPayment  detailPayment={detailBeliPulsa}/>
            <ChoicePaymentMethod
                listPaymentMethod={listPaymentMethod}
                setterServiceState={setDataBeliPulsa}
                serviceState={dataBeliPulsa}
            />
        </>
    )
}

export default Checkout

Checkout.getLayout = UserLayout