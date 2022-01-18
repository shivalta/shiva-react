import { beliPDAM } from "../../../components/user/global-state/pdam"
import Service from "../../../components/user/general/service-icon/service-icon"
import { Text } from "@chakra-ui/react"
import DetailTransaction from "../../../components/user/transaction/detail-transaction/detail-transaction"
import { useRecoilState, useRecoilValue } from "recoil"
import { getDetailBeliPDAM } from "../../../components/user/global-state/pdam"
import ChoicePaymentMethod from "../../../components/user/transaction/choice-payment-method/choice-payment-method"
import { backNavEffects } from "../../../components/user/global-state/back-nav-effects"
import { useSetRecoilState } from "recoil"
import { useEffect } from "react"
import { navigator } from "../../../components/user/global-state/navigator"
import { UserLayout } from "../../_app"
import ButtonCheckout from "../../../components/user/transaction/button-checkout/button-checkout"
import InfoTotalPayment from "../../../components/user/transaction/info-total-payment/info-total-payment"
import logoMandiri from "../../../public/images/mandiri-2.png"
import logoBCA from "../../../public/images/bca-2.png"


const Checkout = () => {

    const [dataBeliPDAM, setDataBeliPDAM] = useRecoilState(beliPDAM)
    const [navigatorState, setterNavigatorState] = useRecoilState(navigator)
    const detailBeliPDAM = useRecoilValue(getDetailBeliPDAM)
    const setBackNavEffects = useSetRecoilState(backNavEffects)

    useEffect(()=>{
        setterNavigatorState({
            ...navigatorState,
            button: <ButtonCheckout serviceState={dataBeliPDAM} detailServiceState={detailBeliPDAM} serviceName="pdam"/>,
            renderContent: <InfoTotalPayment total={dataBeliPDAM.total || 0}/>
        })
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
        return ()=>{
            setterNavigatorState({})
        }
    },[dataBeliPDAM, detailBeliPDAM])

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
            <DetailTransaction  detailTransaction={detailBeliPDAM}/>
            <ChoicePaymentMethod
                listPaymentMethod={listPaymentMethod}
                setterServiceState={setDataBeliPDAM}
                serviceState={dataBeliPDAM}
            />
        </>
    )
}

export default Checkout

Checkout.getLayout = UserLayout