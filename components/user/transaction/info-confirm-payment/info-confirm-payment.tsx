import { ListItem, List, ListIcon, Text, Flex } from "@chakra-ui/react"
import Image from "next/image"
import { MdCheckCircle } from "react-icons/md"
import { BeliPDAM } from "../../global-state/pdam"
import { BeliPulsa } from "../../global-state/pulsa"
import { BeliToken } from "../../global-state/token"


type PropsInfoConfirmPayment<T> = {
    serviceState: T
}

const InfoConFirmPayment = <T extends BeliPulsa | BeliToken | BeliPDAM>(props:PropsInfoConfirmPayment<T>) => {

    const { serviceState } = props

    return(
        <>
            <Flex width="full" alignItems="center" py="4">
                <Image width={80} height={30} src={serviceState.paymentMethod?.logo} alt={serviceState.paymentMethod?.name}/>
                <Text as="h3" px="4" className="my-text" fontWeight="bold" fontSize="sm">
                    {serviceState.paymentMethod?.name}
                </Text>
            </Flex>
            <List spacing={3} width="full" pt="3" pb="6">
                <ListItem className="my-text" fontSize="xs" display="flex">
                    <ListIcon as={MdCheckCircle} color='green.500' mt="1"/>
                    <Text>
                        Transaksi ini akan otomatis menggantikan tagihan {serviceState.paymentMethod?.name} yang belum dibayar
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

export default InfoConFirmPayment