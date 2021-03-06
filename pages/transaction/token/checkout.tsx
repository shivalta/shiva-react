import { beliToken } from "../../../components/user/global-state/token"
import Service from "../../../components/user/general/service-icon/service-icon"
import { Text } from "@chakra-ui/react"
import DetailTransaction from "../../../components/user/transaction/detail-transaction/detail-transaction"
import { useRecoilState, useRecoilValue } from "recoil"
import { getDetailBeliToken } from "../../../components/user/global-state/token"
import ChoicePaymentMethod from "../../../components/user/transaction/choice-payment-method/choice-payment-method"
import { backNavEffects } from "../../../components/user/global-state/back-nav-effects"
import { useSetRecoilState } from "recoil"
import { useEffect } from "react"
import { UserLayout } from "../../_app"
import ButtonCheckout from "../../../components/user/transaction/button-checkout/button-checkout"
import { navigator } from "../../../components/user/global-state/navigator"
import InfoTotalPayment from "../../../components/user/transaction/info-total-payment/info-total-payment"
import { useRouter } from "next/router"

const Checkout = () => {

    const [dataBeliToken, setDataBeliToken] = useRecoilState(beliToken)
    const [navigatorState, setterNavigatorState] = useRecoilState(navigator)
    const detailBeliToken = useRecoilValue(getDetailBeliToken)
    const setBackNavEffects = useSetRecoilState(backNavEffects)
    const router = useRouter()

    useEffect(()=>{
        if(dataBeliToken.noPLN === undefined){
            router.push("/transaction/token")
        }
    },[])

    useEffect(()=>{
        setterNavigatorState({
            ...navigatorState,
            button: <ButtonCheckout
                setterServiceState={setDataBeliToken}
                serviceState={dataBeliToken}
                detailServiceState={detailBeliToken}
                serviceName="token"
            />,
            renderContent: <InfoTotalPayment total={dataBeliToken.total || 0}/>
        })
        setBackNavEffects({
            effects:()=>{
                setDataBeliToken({
                    ...dataBeliToken,
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
    },[dataBeliToken, dataBeliToken])

    return(
        <>
            <Service setting={{my:"8"}} title="token"/>
            <Text as="h3" className="my-text" color="base" fontWeight="bold" mt="8">
                Detail Pembayaran
            </Text>
            <DetailTransaction  detailTransaction={detailBeliToken}/>
            <ChoicePaymentMethod
                setterServiceState={setDataBeliToken}
                serviceState={dataBeliToken}
            />
        </>
    )
}

export default Checkout

Checkout.getLayout = UserLayout