import { beliPulsa } from "../../../components/user/global-state/pulsa"
import Service from "../../../components/user/general/service-icon/service-icon"
import { Text } from "@chakra-ui/react"
import DetailTransaction from "../../../components/user/transaction/detail-transaction/detail-transaction"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { getDetailBeliPulsa } from "../../../components/user/global-state/pulsa"
import ChoicePaymentMethod from "../../../components/user/transaction/choice-payment-method/choice-payment-method"
import { backNavEffects } from "../../../components/user/global-state/back-nav-effects"
import { UserLayout } from "../../_app"
import { useEffect } from "react"
import { navigator } from "../../../components/user/global-state/navigator"
import ButtonCheckout from "../../../components/user/transaction/button-checkout/button-checkout"
import InfoTotalPayment from "../../../components/user/transaction/info-total-payment/info-total-payment"
import { useRouter } from "next/router"

const Checkout = () => {

    const [dataBeliPulsa, setDataBeliPulsa] = useRecoilState(beliPulsa)
    const [navigatorState, setterNavigatorState] = useRecoilState(navigator)
    const detailBeliPulsa = useRecoilValue(getDetailBeliPulsa)
    const setBackNavEffects = useSetRecoilState(backNavEffects)
    const router = useRouter()

    useEffect(()=>{
        if(dataBeliPulsa.noHandphone === undefined){
            router.push("/transaction/pulsa")
        }
    },[])

    useEffect(()=>{
        setterNavigatorState({
            ...navigatorState,
            button: <ButtonCheckout
                setterServiceState={setDataBeliPulsa}
                serviceState={dataBeliPulsa}
                detailServiceState={detailBeliPulsa}
                serviceName="pulsa"
            />,
            renderContent: <InfoTotalPayment total={dataBeliPulsa.total || 0}/>
        })
        setBackNavEffects({
            effects:()=>{
                setDataBeliPulsa({
                    ...dataBeliPulsa,
                    id:0,
                    nameCategory:"",
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

    return(
        <>
            <Service setting={{my:"8"}} title="pulsa"/>
            <Text as="h3" className="my-text" color="base" fontWeight="bold" mt="8">
                Detail Pembayaran
            </Text>
            <DetailTransaction detailTransaction={detailBeliPulsa}/>
            <ChoicePaymentMethod
                setterServiceState={setDataBeliPulsa}
                serviceState={dataBeliPulsa}
            />
        </>
    )
}

export default Checkout

Checkout.getLayout = UserLayout