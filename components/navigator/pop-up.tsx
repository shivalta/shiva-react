import { Flex, Text, Center, List, ListItem, ListIcon } from "@chakra-ui/react"
import Image from "next/image"
import { MdCheckCircle } from "react-icons/md"
import DetailPayment from "../detail-payment/detail-payment"
import { useRecoilValue } from "recoil"
import { beliPulsa, getDetailBeliPulsa } from "../global-state/globalState"

type PropsConfirmPayment = {
    setIsRenderDetail : (value:boolean)=>void
    title : string
}

const PopUp = (props:PropsConfirmPayment)=> {

    const {setIsRenderDetail, title} = props
    const dataBeliPulsa = useRecoilValue(beliPulsa)
    const detailBeliPulsa = useRecoilValue(getDetailBeliPulsa)

    return(
        <>
            <Flex width="full" py="2" mb="3" justify="space-between" alignItems="center">
                <Text as="h3" className="my-text" color="base" fontWeight="bold">
                    {title}
                </Text>
                <Center
                    height="5"
                    width="5"
                    shadow="base"
                    onClick={()=>setIsRenderDetail(false)}
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
            <DetailPayment  detailPayment={detailBeliPulsa}/>
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
    )
}

export default PopUp