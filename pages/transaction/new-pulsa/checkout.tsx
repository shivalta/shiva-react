import { beliPulsa } from "../../../components/global-state/pulsa"
import Service from "../../../components/service/service"
import { Text, Button, Alert, AlertIcon, Flex, Divider } from "@chakra-ui/react"
import DetailPayment from "../../../components/detail-payment/detail-payment"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { getDetailBeliPulsa } from "../../../components/global-state/pulsa"
import { rupiahFormatter } from "../../../helper/rupiah-formatter"
import ChoicePaymentMethod from "../../../components/choice-payment-method/choice-payment-method"
import { backNavEffects } from "../../../components/global-state/back-nav-effects"
import { NewUserLayout } from "../../_app"
import logoMandiri from "../../../public/images/mandiri-2.png"
import logoBCA from "../../../public/images/bca-2.png"
import { useEffect } from "react"
import { user } from "../../../components/global-state/user"
import { navigator } from "../../../components/global-state/navigator"
import { useRouter } from "next/router"
import NewPopUp from "../../../components/navigator/new-pop-up"

type PropsInfoTotalPayment = {
    total:number
}

const AlertPaymentMethod = () => {
    return(
        <Alert status="error" className="my-text" fontSize="xs" borderRadius="lg" variant="solid" padding="2" my="4">
            <AlertIcon />
            Isi metode pembayaran dulu ya
        </Alert>
    )
}

const InfoTotalPayment = (props:PropsInfoTotalPayment) => {
    const { total } = props
    return(
        <>
            <Flex justifyContent="space-between" width="full">
                <Text className="my-text" color="base_second" fontSize="sm" fontWeight="semibold">Total Pembayaran</Text>
                <Text className="my-text" color="base_second" fontSize="sm" fontWeight="semibold">{rupiahFormatter(total,"Rp.")}</Text>
            </Flex>
            <Divider my="3" />
        </>
    )
}

const ButtonCheckout = ()=>{

    const dataBeliPulsa = useRecoilValue(beliPulsa)
    const [navigatorState, setterNavigatorState] = useRecoilState(navigator)
    const [userState, setUserState] = useRecoilState(user)
    const detailBeliPulsa = useRecoilValue(getDetailBeliPulsa)
    const router = useRouter()
    const { pathname } = router

    const handleClick = ()=>{
        if(navigatorState.isOpenPopUp){
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
                    isOpenPopUp: true,
                    renderContent: <InfoTotalPayment total={dataBeliPulsa.total || 0}/>,
                    renderPopUp:
                        <NewPopUp
                            title={"Detail Pembayaran"}
                            render={<DetailPayment detailPayment={detailBeliPulsa}/>}
                        />
                })
            }else{
                setterNavigatorState({
                    ...navigatorState,
                    renderContent: <>
                        <AlertPaymentMethod/>
                        <InfoTotalPayment total={dataBeliPulsa.total || 0}/>
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

const Checkout = () => {

    const [dataBeliPulsa, setDataBeliPulsa] = useRecoilState(beliPulsa)
    const [navigatorState, setterNavigatorState] = useRecoilState(navigator)
    const detailBeliPulsa = useRecoilValue(getDetailBeliPulsa)
    const setBackNavEffects = useSetRecoilState(backNavEffects)

    useEffect(()=>{
        setterNavigatorState({
            ...navigatorState,
            button: <ButtonCheckout />,
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