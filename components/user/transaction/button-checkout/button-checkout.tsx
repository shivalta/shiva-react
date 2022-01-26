import { Button, useToast } from "@chakra-ui/react"
import { BeliPulsa } from "../../global-state/pulsa"
import { BeliToken } from "../../global-state/token"
import { RecordDetailTransaction } from "../detail-transaction/detail-transaction"
import { useRecoilState, useSetRecoilState, SetterOrUpdater } from "recoil"
import { user, User } from "../../global-state/user"
import { navigator } from "../../global-state/navigator"
import { useRouter } from "next/router"
import PopUp from "../../general/navigator/pop-up"
import DetailTransaction from "../detail-transaction/detail-transaction"
import InfoTotalPayment from "../info-total-payment/info-total-payment"
import AlertPaymentMethod from "../alert-payment-method/alert-payment-method"
import { BeliPDAM } from "../../global-state/pdam"
import { blackScreen } from "../../global-state/black-screen"
import InfoConFirmPayment from "../info-confirm-payment/info-confirm-payment"
import { useEffect, useState } from "react"
import { baseRequest } from "../../../../helper/base-request"
import { createToastChakra } from "../../../../helper/create-toast-chakra"


type PropsButtonCheckout<T> = {
        setterServiceState: SetterOrUpdater<T>
        serviceState: T
        serviceName: "pulsa" | "token" | "pdam"
        detailServiceState: RecordDetailTransaction[]
}

const ButtonCheckout = <T extends BeliPulsa | BeliToken | BeliPDAM>(props:PropsButtonCheckout<T>)=>{

    const { serviceState, serviceName, detailServiceState, setterServiceState } = props
    const toast = useToast()
    const [navigatorState, setterNavigatorState] = useRecoilState(navigator)
    const [userPersisted, setUserPersisted] = useState<User | null>()
    const [userState, setUserState] = useRecoilState(user)
    const setIsBlackScreenRender = useSetRecoilState(blackScreen)
    const router = useRouter()
    const { pathname } = router

    useEffect(()=>{
        if(localStorage.getItem("user-persist")){
            setUserPersisted(JSON.parse(localStorage.getItem("user-persist") || ""))
          }else{
              setUserPersisted(null)
          }
        return ()=>{
            setIsBlackScreenRender({
                isBlackScreenRender:false
            })
        }
    },[])

    const handleClick = async ()=>{
        if(navigatorState.isOpenPopUp){
            if(userPersisted?.valid){
                let user_value = ""
                if(serviceState.nameCategory === "pulsa"){
                    let currentServiceState = serviceState as BeliPulsa
                    user_value = currentServiceState.noHandphone!
                }
                else if(serviceState.nameCategory === "token"){
                    let currentServiceState = serviceState as BeliToken
                    user_value = currentServiceState.noPLN!
                }
                else if(serviceState.nameCategory === "pdam"){
                    let currentServiceState = serviceState as BeliPDAM
                    user_value = currentServiceState.noPDAM!
                }
                const response = await baseRequest<any>({
                    method:"POST",
                    url:"/payment",
                    token:userPersisted.data?.token,
                    body:{
                        user_value,
                        product_id:serviceState.id,
                        bank_code:serviceState.paymentMethod?.bank_code
                    }
                })
                setterServiceState({
                    ...serviceState,
                    status:response.data.status,
                    virtualAccount:response.data.account_number,
                    deadlinePayment:response.data.expiration_payment
                })
                createToastChakra({
                    response:response,
                    router:router,
                    toast:toast,
                    pathReload:`/transaction/${serviceName}/payment`
                })
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