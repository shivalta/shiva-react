import { beliPulsa } from "../../../components/user/global-state/pulsa"
import Service from "../../../components/user/general/service-icon/service-icon"
import { Text } from "@chakra-ui/react"
import DetailTransaction from "../../../components/user/transaction/detail-transaction/detail-transaction"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { getDetailBeliPulsa } from "../../../components/user/global-state/pulsa"
import ChoicePaymentMethod from "../../../components/user/transaction/choice-payment-method/choice-payment-method"
import { backNavEffects } from "../../../components/user/global-state/back-nav-effects"
import { UserLayout } from "../../_app"
import logoMandiri from "../../../public/images/mandiri-2.png"
import logoBCA from "../../../public/images/bca-2.png"
import { useEffect } from "react"
import { navigator } from "../../../components/user/global-state/navigator"
import ButtonCheckout from "../../../components/user/transaction/button-checkout/button-checkout"
import InfoTotalPayment from "../../../components/user/transaction/info-total-payment/info-total-payment"

const Checkout = () => {

    const [dataBeliPulsa, setDataBeliPulsa] = useRecoilState(beliPulsa)
    const [navigatorState, setterNavigatorState] = useRecoilState(navigator)
    const detailBeliPulsa = useRecoilValue(getDetailBeliPulsa)
    const setBackNavEffects = useSetRecoilState(backNavEffects)

    useEffect(()=>{
        setterNavigatorState({
            ...navigatorState,
            button: <ButtonCheckout serviceState={dataBeliPulsa} detailServiceState={detailBeliPulsa} serviceName="pulsa"/>,
            renderContent: <InfoTotalPayment total={dataBeliPulsa.total || 0}/>
        })
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
        return ()=>{
            setterNavigatorState({})
        }
    },[dataBeliPulsa, detailBeliPulsa])

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
            <DetailTransaction detailTransaction={detailBeliPulsa}/>
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