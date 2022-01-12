import { MdHome,MdAccountBox, MdArticle } from "react-icons/md"
import { Box, Icon, Flex, Text, Divider, Button, Alert, AlertIcon} from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { rupiahFormatter } from "../../helper/rupiah-formatter"
import { useState } from "react"
import BlackScreen from "./black-screen"
import { useRecoilValue, useRecoilState, SetterOrUpdater } from "recoil"
import { BeliPulsa, beliPulsa, getDetailBeliPulsa } from "../global-state/pulsa"
import { BeliToken, beliToken, getDetailBeliToken } from "../global-state/token"
import { BeliPDAM, beliPDAM, getDetailBeliPDAM } from "../global-state/pdam"
import PopUp from "./pop-up"
import { RecordDetailPayment } from "../detail-payment/detail-payment"
import DetailPayment from "../detail-payment/detail-payment"
import InfoConFirmPayment from "./info-confirm-payment"
import { user } from "../global-state/user"

const patternCheckout = /\/transaction\/+[a-zA-Z]+\/checkout/
const patternPayment = /\/transaction\/+[a-zA-Z]+\/payment/

const useServiceData = (): [BeliPulsa | BeliToken, SetterOrUpdater<BeliPulsa | BeliToken | BeliPDAM>, RecordDetailPayment[], string] => {
    const router = useRouter()
    const {asPath:pathname} = router
    const [dataBeliPulsa, setDataBeliPulsa] = useRecoilState(beliPulsa)
    const [dataBeliToken, setDataBeliToken] = useRecoilState(beliToken)
    const [dataBeliPDAM, setDataBeliPDAM] = useRecoilState(beliPDAM)
    const detailBeliPulsa = useRecoilValue(getDetailBeliPulsa)
    const detailBeliToken = useRecoilValue(getDetailBeliToken)
    const detailBeliPDAM = useRecoilValue(getDetailBeliPDAM)

    let matchedPath : RegExpMatchArray | null = null
    let currentService = ""
    if(pathname.match(patternCheckout)){
        matchedPath = pathname.match(patternCheckout)
        currentService = matchedPath? matchedPath[0].split("/")[2] : ""
    }
    else if(pathname.match(patternPayment)){
        matchedPath = pathname.match(patternPayment)
        currentService = matchedPath? matchedPath[0].split("/")[2] : ""
    }

    if(currentService === "pulsa"){
        return [dataBeliPulsa, setDataBeliPulsa, detailBeliPulsa, currentService]
    }
    else if(currentService === "token"){
        return [dataBeliToken, setDataBeliToken, detailBeliToken, currentService]
    }
    else if(currentService === "pdam"){
        return [dataBeliPDAM, setDataBeliPDAM, detailBeliPDAM, currentService]
    }

    return [dataBeliPulsa, setDataBeliPulsa, detailBeliPulsa, currentService]
}

const Navigator = () => {
    const router = useRouter()
    const {asPath:pathname} = router
    const [isRenderDetailCheckout, setIsRenderDetailCheckout] = useState(false)
    const [isRenderDetailPayment, setIsRenderDetailPayment] = useState(false)
    const [serviceState, setterServiceState, detailServiceState, currentService] = useServiceData()
    const [userState, setUserState] = useRecoilState(user)
    const patternHistory = /\/history-transaction/
    const patternProfile = /\/profile/

    type ActiveNav = "history" | "profile" | "home"

    const getActiveNav = ():ActiveNav => {
        if(pathname.match(patternHistory)){
            return "history"
        }
        if(pathname.match(patternProfile)){
            return "profile"
        }
        return "home"
    }


    const getIsCheckout = (): string => {
        if(pathname.match(patternCheckout)){
            return serviceState.total? rupiahFormatter(serviceState.total, "Rp.") : ""
        }
        else if(isRenderDetailCheckout){
            setIsRenderDetailCheckout(false)
        }
        return ""
    }

    const getIsPayment = (): boolean => {
        if(pathname.match(patternPayment)){
            return true
        }
        else if(isRenderDetailPayment){
            setIsRenderDetailPayment(false)
        }
        return false
    }

    const isCheckout = getIsCheckout()
    const isPayment = getIsPayment()
    const activeNav = getActiveNav()

    return (
        <>
            {
                isRenderDetailCheckout || isRenderDetailPayment ? serviceState.paymentMethod? <BlackScreen/>: null : null
            }
            <Box
                position="fixed"
                left="50%"
                transform="translateX(-50%)"
                bottom="0"
                maxWidth="480px"
                width="full"
                height="auto"
                borderTopLeftRadius="navigator"
                borderTopRightRadius="navigator"
                shadow="navigator"
                px="5"
                py="3"
                bg="white"
                display="flex"
                justifyContent="space-evenly"
                alignItems="center"
                flexWrap="wrap"
            >
                {
                    isRenderDetailCheckout?serviceState.paymentMethod?
                    <PopUp
                        setIsRenderPopUp={setIsRenderDetailCheckout}
                        title={"Konfirmasi Pembayaran"}
                        render={
                            <>
                                <DetailPayment  detailPayment={detailServiceState}/>
                                <InfoConFirmPayment serviceState={serviceState}/>
                            </>
                        }
                    />
                    :
                    <Alert status="error" className="my-text" fontSize="xs" borderRadius="lg" variant="solid" padding="2" my="4">
                        <AlertIcon />
                        Isi metode pembayaran dulu ya
                    </Alert> : null
                }
                {
                    isRenderDetailPayment?
                    <PopUp
                        setIsRenderPopUp={setIsRenderDetailPayment}
                        title={"Detail Pembayaran"}
                        render={<DetailPayment  detailPayment={detailServiceState}/>}
                    />: null
                }
                {
                    isCheckout ? (
                        <>
                            <Flex justifyContent="space-between" width="full">
                                <Text className="my-text" color="base_second" fontSize="sm" fontWeight="semibold">Total Pembayaran</Text>
                                <Text className="my-text" color="base_second" fontSize="sm" fontWeight="semibold">{isCheckout}</Text>
                            </Flex>
                            <Divider my="3" />
                        </>
                    ): null
                }
                <Link href="/" passHref>
                    <Box as="a" px="2" onClick={()=>setterServiceState({})} >
                        <Icon as={MdHome} color={activeNav==="home" ? "base" : "gray.300"} h={10} width={10} />
                    </Box>
                </Link>
                <Link href="/history-transaction" passHref>
                    <Box as="a" px="2" onClick={()=>setterServiceState({})}>
                        <Icon as={MdArticle} color={activeNav==="history" ? "base" : "gray.300"} h={10} width={10} />
                    </Box>
                </Link>
                <Link href="/profile" passHref>
                    <Box as="a" px="2" onClick={()=>setterServiceState({})}>
                        <Icon as={MdAccountBox} color={activeNav==="profile" ? "base" : "gray.300"} h={10} width={10} />
                    </Box>
                </Link>
                {
                    isCheckout ?
                        <Button
                            fontSize="xs"
                            bg="base"
                            color="white"
                            height="10"
                            width="24"
                            flexGrow="1"
                            _hover={{bg:"base"}}
                            onClick={()=>{
                                if(isRenderDetailCheckout){
                                    if(userState.valid){
                                        router.push(`/transaction/${currentService}/payment`)
                                    }
                                    else{
                                        setUserState({
                                            ...userState,
                                            afterLogin:pathname
                                        })
                                        router.push("/login")
                                    }
                                }else{
                                    setIsRenderDetailCheckout(true)
                                }
                            }}
                            ml="2"
                        >
                            Bayar
                        </Button> : null
                }
                {
                    isPayment ?
                        <Button
                            fontSize="xs"
                            bg="base"
                            color="white"
                            height="10"
                            width="24"
                            flexGrow="1"
                            _hover={{bg:"base"}}
                            onClick={()=>{
                                setIsRenderDetailPayment(true)
                            }}
                            ml="2"
                        >
                            Detail
                        </Button> : null
                }
            </Box>
        </>
    )
}

export default Navigator