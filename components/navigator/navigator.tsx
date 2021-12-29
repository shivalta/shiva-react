import { AiFillHome } from "react-icons/ai"
import { MdAccountBox, MdArticle, MdCheckCircle } from "react-icons/md"
import { Box, Icon, Flex, Text, Divider, Button, Center, List, ListItem, ListIcon, Alert, AlertIcon} from "@chakra-ui/react"
import { MotionBox } from "../motion-box/motion-box"
import Link from "next/link"
import { useRouter } from "next/router"
import { useRecoilValue } from "recoil"
import { beliPulsa } from "../global-state/globalState"
import { rupiahFormatter } from "../../helpers/rupiah-formatter"
import { useState } from "react"
import DetailPayment from "../detail-payment/detail-payment"
import Image from "next/image"

const Navigator = () => {
    const {pathname} = useRouter()
    const [renderDetail, setRenderDetail] = useState(false)
    const patternHistory = /\/history-transaction/
    const patternProfile = /\/profile/
    const patternPulsaCheckout = /\/transaction\/pulsa\/checkout/
    const dataBeliPulsa = useRecoilValue(beliPulsa)
    const detailBeliPulsa = [
        {"Nama produk" : dataBeliPulsa.nameProduct},
        {"No handphone" : dataBeliPulsa.noHandphone},
        {"Harga" : dataBeliPulsa.price? rupiahFormatter(dataBeliPulsa.price,"Rp.") : 0},
        {"Biaya admin" : dataBeliPulsa.adminFee? rupiahFormatter(dataBeliPulsa.adminFee,"Rp.") : 0},
        {"Total pembayaran" : dataBeliPulsa.total? rupiahFormatter(dataBeliPulsa.total,"Rp.") : 0}
    ]

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


    const isCheckout = (): string => {
        if(pathname.match(patternPulsaCheckout)){
            return dataBeliPulsa.total? rupiahFormatter(dataBeliPulsa.total, "Rp.") : ""
        }
        return ""
    }

    const activeNav = getActiveNav()

    return (
        <>
            {
                renderDetail ? dataBeliPulsa.paymentMethod?
                <Box
                    position="fixed"
                    height="100vh"
                    left="50%"
                    transform="translateX(-50%)"
                    bottom="0"
                    background="blackAlpha.600"
                    width="400px"
                >
                </Box>
                : null : null
            }
            <MotionBox
                position="fixed"
                left="50%"
                transform="translateX(-50%)"
                bottom="0"
                width="400px"
                height={isCheckout() ? "auto" : "20"}
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
                    renderDetail?dataBeliPulsa.paymentMethod?
                    <>
                        <Flex width="full" py="2" mb="3" justify="space-between" alignItems="center">
                            <Text as="h3" className="my-text" color="base" fontWeight="bold">
                                Konfirmasi Pembayaran
                            </Text>
                            <Center
                                height="5"
                                width="5"
                                shadow="base"
                                onClick={()=>setRenderDetail(false)}
                                p="4"
                                borderRadius="lg"
                                fontWeight="bold"
                                color="base"
                                as="button"
                                className="my-text"
                            >
                                X
                            </Center>
                        </Flex>
                        <DetailPayment  detailBeliPulsa={detailBeliPulsa}/>
                        <Flex width="full" alignItems="center" py="4">
                            <Image width={80} height={30} src={dataBeliPulsa.paymentMethod?.logo} alt={dataBeliPulsa.paymentMethod?.name}/>
                            <Text as="h3" px="4" className="my-text" fontWeight="bold" fontSize="sm">
                                {dataBeliPulsa.paymentMethod?.name}
                            </Text>
                        </Flex>
                        <List spacing={3} width="full" pt="3" pb="6">
                            <ListItem className="my-text" fontSize="xs" display="flex">
                                <ListIcon as={MdCheckCircle} color='green.500' mt="1"/>
                                <Text>
                                    Transaksi ini akan otomatis menggantikan tagihan {dataBeliPulsa.paymentMethod?.name} yang belum dibayar
                                </Text>
                            </ListItem>
                            <ListItem className="my-text" fontSize="xs" display="flex">
                                <ListIcon as={MdCheckCircle} color='green.500' mt="1"/>
                                <Text>
                                    Dapatkan kode pembayaran setelah klik Bayar
                                </Text>
                            </ListItem>
                            <ListItem className="my-text" fontSize="xs" display="flex">
                                <ListIcon as={MdCheckCircle} color='green.500' mt="1"/>
                                <Text>
                                    Tidak disarankan bayar melalui bank lain agar transaksi dapat diproses tanpa kendala
                                </Text>
                            </ListItem>
                        </List>
                    </>
                    :
                    <Alert status="error" className="my-text" fontSize="xs" borderRadius="lg" variant="solid" padding="2" my="4">
                        <AlertIcon />
                        There was an error processing your request
                    </Alert> : null
                }
                {
                    isCheckout() ? (
                        <>
                            <Flex justifyContent="space-between" width="full">
                                <Text className="my-text" color="base_second" fontSize="sm" fontWeight="semibold">Total Pembayaran</Text>
                                <Text className="my-text" color="base_second" fontSize="sm" fontWeight="semibold">{isCheckout()}</Text>
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
                    isCheckout() ?
                        <Button
                            fontSize="xs"
                            bg="base"
                            color="white"
                            height="10"
                            width="24"
                            flexGrow="1"
                            _hover={{bg:"base"}}
                            onClick={()=>setRenderDetail(true)}
                        >
                            Bayar
                        </Button> : null
                }
            </MotionBox>
        </>
    )
}

export default Navigator