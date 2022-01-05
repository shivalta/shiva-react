import { MdHome,MdAccountBox, MdArticle } from "react-icons/md"
import { Box, Icon, Flex, Text, Divider, Button, Alert, AlertIcon} from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { rupiahFormatter } from "../../helper/rupiah-formatter"
import { useState } from "react"
import BlackScreen from "./black-screen"
import { useRecoilValue } from "recoil"
import { beliPulsa } from "../global-state/globalState"
import PopUp from "./pop-up"

const Navigator = () => {
    const router = useRouter()
    const {asPath:pathname} = router
    const [isRenderDetailCheckout, setIsRenderDetailCheckout] = useState(false)
    const [isRenderDetailPayment, setIsRenderDetailPayment] = useState(false)
    const dataBeliPulsa = useRecoilValue(beliPulsa)
    const patternHistory = /\/history-transaction/
    const patternProfile = /\/profile/
    const patternPulsaCheckout = /\/transaction\/pulsa\/checkout/
    const patternPulsaPayment = /\/transaction\/pulsa\/payment/

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
        if(pathname.match(patternPulsaCheckout)){
            return dataBeliPulsa.total? rupiahFormatter(dataBeliPulsa.total, "Rp.") : ""
        }
        else if(isRenderDetailCheckout){
            setIsRenderDetailCheckout(false)
        }
        return ""
    }

    const getIsPayment = (): boolean => {
        if(pathname.match(patternPulsaPayment)){
            return true
        }
        return false
    }

    const isCheckout = getIsCheckout()
    const isPayment = getIsPayment()
    const activeNav = getActiveNav()

    return (
        <>
            {
                isRenderDetailCheckout || isRenderDetailPayment ? dataBeliPulsa.paymentMethod? <BlackScreen/>: null : null
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
                    isRenderDetailCheckout?dataBeliPulsa.paymentMethod?
                    <PopUp setIsRenderDetail={setIsRenderDetailCheckout} title={"Konfirmasi Pembayaran"}/>
                    :
                    <Alert status="error" className="my-text" fontSize="xs" borderRadius="lg" variant="solid" padding="2" my="4">
                        <AlertIcon />
                        Isi metode pembayaran dulu ya
                    </Alert> : null
                }
                {
                    isRenderDetailPayment?
                    <PopUp setIsRenderDetail={setIsRenderDetailPayment} title={"Detail Pembayaran"}/>: null
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
                    <Box as="a" px="2">
                        <Icon as={MdHome} color={activeNav==="home" ? "base" : "gray.300"} h={10} width={10} />
                    </Box>
                </Link>
                <Link href="/history-transaction" passHref>
                    <Box as="a" px="2">
                        <Icon as={MdArticle} color={activeNav==="history" ? "base" : "gray.300"} h={10} width={10} />
                    </Box>
                </Link>
                <Link href="/profile" passHref>
                    <Box as="a" px="2">
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
                                    router.push("/transaction/pulsa/payment")
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