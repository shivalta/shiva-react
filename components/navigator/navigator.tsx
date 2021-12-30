import { AiFillHome } from "react-icons/ai"
import { MdAccountBox, MdArticle } from "react-icons/md"
import { Box, Icon, Flex, Text, Divider, Button, Alert, AlertIcon} from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { rupiahFormatter } from "../../helper/rupiah-formatter"
import { useState } from "react"
import BlackScreen from "./black-screen"
import ConfirmPayment from "./confirm-payment"
import { useRecoilValue } from "recoil"
import { beliPulsa } from "../global-state/globalState"

const Navigator = () => {
    const {pathname} = useRouter()
    const [isRenderDetail, setIsRenderDetail] = useState(false)
    const dataBeliPulsa = useRecoilValue(beliPulsa)
    const patternHistory = /\/history-transaction/
    const patternProfile = /\/profile/
    const patternPulsaCheckout = /\/transaction\/pulsa\/checkout/


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
        if(isRenderDetail){
            setIsRenderDetail(false)
        }
        return ""
    }

    const isCheckout = getIsCheckout()

    const activeNav = getActiveNav()

    return (
        <>
            {
                isRenderDetail ? dataBeliPulsa.paymentMethod? <BlackScreen/>: null : null
            }
            <Box
                position="fixed"
                left="50%"
                transform="translateX(-50%)"
                bottom="0"
                width="400px"
                height={isCheckout ? "auto" : "20"}
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
                    isRenderDetail?dataBeliPulsa.paymentMethod?
                    <ConfirmPayment setIsRenderDetail={setIsRenderDetail}/>
                    :
                    <Alert status="error" className="my-text" fontSize="xs" borderRadius="lg" variant="solid" padding="2" my="4">
                        <AlertIcon />
                        Isi metode pembayaran dulu ya
                    </Alert> : null
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
                        <Icon as={AiFillHome} color={activeNav==="home" ? "base" : "gray.300"} h={8} width={8} />
                    </Box>
                </Link>
                <Link href="/history-transaction" passHref>
                    <Box as="a" px="2">
                        <Icon as={MdArticle} color={activeNav==="history" ? "base" : "gray.300"} h={9} width={9} />
                    </Box>
                </Link>
                <Link href="/profile" passHref>
                    <Box as="a" px="2">
                        <Icon as={MdAccountBox} color={activeNav==="profile" ? "base" : "gray.300"} h={9} width={9} />
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
                            onClick={()=>setIsRenderDetail(true)}
                        >
                            Bayar
                        </Button> : null
                }
            </Box>
        </>
    )
}

export default Navigator