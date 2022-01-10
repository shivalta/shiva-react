import { beliToken } from "../../../components/global-state/token"
import Service from "../../../components/service/service"
import { Text } from "@chakra-ui/react"
import DetailPayment from "../../../components/detail-payment/detail-payment"
import { useRecoilState, useRecoilValue } from "recoil"
import { getDetailBeliToken } from "../../../components/global-state/token"
import ChoicePaymentMethod from "../../../components/choice-payment-method/choice-payment-method"
import { backNavEffects } from "../../../components/global-state/back-nav-effects"
import { useSetRecoilState } from "recoil"
import { useEffect } from "react"
import logoMandiri from "../../../public/images/mandiri-2.png"
import logoBCA from "../../../public/images/bca-2.png"

const Checkout = () => {

    const [dataBeliToken, setDataBeliToken] = useRecoilState(beliToken)
    const detailBeliToken = useRecoilValue(getDetailBeliToken)
    const setBackNavEffects = useSetRecoilState(backNavEffects)

    useEffect(()=>{
        setBackNavEffects({
            effects:()=>{
                setDataBeliToken({
                    ...dataBeliToken,
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
            <Service setting={{my:"8"}} title="token"/>
            <Text as="h3" className="my-text" color="base" fontWeight="bold" mt="8">
                Detail Pembayaran
            </Text>
            <DetailPayment  detailPayment={detailBeliToken}/>
            <ChoicePaymentMethod
                listPaymentMethod={listPaymentMethod}
                setterServiceState={setDataBeliToken}
                serviceState={dataBeliToken}
            />
        </>
    )
}

export default Checkout