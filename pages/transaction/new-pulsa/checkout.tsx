import { beliPulsa } from "../../../components/global-state/pulsa"
import Service from "../../../components/service/service"
import { Text, Button, Alert, AlertIcon } from "@chakra-ui/react"
import DetailPayment from "../../../components/detail-payment/detail-payment"
import { useRecoilState, useRecoilValue } from "recoil"
import { getDetailBeliPulsa } from "../../../components/global-state/pulsa"
import ChoicePaymentMethod from "../../../components/choice-payment-method/choice-payment-method"
import { backNavEffects } from "../../../components/global-state/back-nav-effects"
import { useSetRecoilState } from "recoil"
import { NewUserLayout } from "../../_app"
import logoMandiri from "../../../public/images/mandiri-2.png"
import logoBCA from "../../../public/images/bca-2.png"
import { useEffect } from "react"
import { user } from "../../../components/global-state/user"
import { navigator } from "../../../components/global-state/navigator"
import { useRouter } from "next/router"
import NewPopUp from "../../../components/navigator/new-pop-up"

const Checkout = () => {

    const [dataBeliPulsa, setDataBeliPulsa] = useRecoilState(beliPulsa)
    const [navigatorState, setterNavigatorState] = useRecoilState(navigator)
    const [userState, setUserState] = useRecoilState(user)
    const detailBeliPulsa = useRecoilValue(getDetailBeliPulsa)
    const setBackNavEffects = useSetRecoilState(backNavEffects)
    const router = useRouter()
    const { pathname } = router

    const AlertPaymentMethod = () => {
        return(
            <Alert status="error" className="my-text" fontSize="xs" borderRadius="lg" variant="solid" padding="2" my="4">
                <AlertIcon />
                Isi metode pembayaran dulu ya
            </Alert>
        )
    }

    const ButtonCheckout = ()=>{
        return(
            <Button
                fontSize="xs"
                bg="base"
                color="white"
                height="10"
                width="24"
                flexGrow="1"
                _hover={{bg:"base"}}
                onClick={()=>{
                    if(navigatorState.isOpenPopUP){
                        if(userState.valid){
                            router.push("/transaction/new-pulsa/payment")
                        }
                        else{
                            setUserState({
                                ...userState,
                                afterLogin:pathname
                            })
                            router.push("/login")
                        }
                    }else{
                        if(dataBeliPulsa.paymentMethod){
                            setterNavigatorState({
                                ...navigatorState,
                                isOpenPopUP: true,
                                renderPopUp:
                                    <NewPopUp
                                        title={"Detail Pembayaran"}
                                        render={<DetailPayment  detailPayment={detailBeliPulsa}/>}
                                    />
                            })
                        }else{
                            setterNavigatorState({
                                ...navigatorState,
                                isOpenPopUP: true,
                                renderPopUp: <AlertPaymentMethod/>
                            })
                        }
                    }
                }}
            ml="2"
            >
                Bayar
            </Button>
        )
    }

    useEffect(()=>{
        setterNavigatorState({
            ...navigatorState,
            button: <ButtonCheckout/>
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
    },[])

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
            <DetailPayment detailPayment={detailBeliPulsa}/>
            <ChoicePaymentMethod
                listPaymentMethod={listPaymentMethod}
                setterServiceState={setDataBeliPulsa}
                serviceState={dataBeliPulsa}
            />
        </>
    )
}

export default Checkout

Checkout.getLayout = NewUserLayout