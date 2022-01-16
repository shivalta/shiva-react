import { Button } from "@chakra-ui/react"
import { BeliPulsa } from "../../global-state/pulsa"
import { BeliToken } from "../../global-state/token"
import { RecordDetailTransaction } from "../detail-transaction/detail-transaction"
import { useRecoilState, useSetRecoilState } from "recoil"
import { user } from "../../global-state/user"
import { navigator } from "../../global-state/navigator"
import { useRouter } from "next/router"
import PopUp from "../../general/navigator/pop-up"
import DetailTransaction from "../detail-transaction/detail-transaction"
import InfoTotalPayment from "../info-total-payment/info-total-payment"
import AlertPaymentMethod from "../alert-payment-method/alert-payment-method"
import { BeliPDAM } from "../../global-state/pdam"
import { blackScreen } from "../../global-state/black-screen"
import InfoConFirmPayment from "../info-confirm-payment/info-confirm-payment"
import { useEffect } from "react"


type PropsButtonCheckout<T> = {
        serviceState: T
        serviceName: "pulsa" | "token" | "pdam"
        detailServiceState: RecordDetailTransaction[]
}

const ButtonCheckout = <T extends BeliPulsa | BeliToken | BeliPDAM>(props:PropsButtonCheckout<T>)=>{

    const { serviceState, serviceName, detailServiceState } = props
    const [navigatorState, setterNavigatorState] = useRecoilState(navigator)
    const [userState, setUserState] = useRecoilState(user)
    const setIsBlackScreenRender = useSetRecoilState(blackScreen)
    const router = useRouter()
    const { pathname } = router

    useEffect(()=>{
        return ()=>{
            setIsBlackScreenRender({
                isBlackScreenRender:false
            })
        }
    },[])

    const handleClick = ()=>{
        if(navigatorState.isOpenPopUp){
            if(userState.valid){
                router.push(`/transaction/${serviceName}/payment`)
            }
            else{
                setUserState({
                    ...userState,
                    afterLogin:pathname
                })
                router.push("/login")
            }
        }else{
            if(serviceState.paymentMethod){
                setIsBlackScreenRender({
                    isBlackScreenRender: true
                })
                setterNavigatorState({
                    ...navigatorState,
                    isOpenPopUp: true,
                    renderContent: <InfoTotalPayment total={serviceState.total || 0}/>,
                    renderPopUp:
                        <PopUp
                            title={"Detail Pembayaran"}
                            render={<>
                                <DetailTransaction detailTransaction={detailServiceState} />
                                <InfoConFirmPayment serviceState={serviceState}/>
                            </>}
                        />
                })
            }else{
                setterNavigatorState({
                    ...navigatorState,
                    renderContent: <>
                        <AlertPaymentMethod/>
                        <InfoTotalPayment total={serviceState.total || 0}/>
                    </>
                })
            }
        }
    }

    return(
        <Button
            fontSize="xs"
            bg="base"
            color="white"
            height="10"
            width="24"
            flexGrow="1"
            _hover={{bg:"base"}}
            onClick={handleClick}
            ml="2"
        >
            Bayar
        </Button>
    )
}

export default ButtonCheckout