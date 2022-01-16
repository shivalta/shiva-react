import { Box, Divider, Flex, Icon, Spacer, Text} from "@chakra-ui/react"
import { MdOutlineFileCopy } from "react-icons/md"
import Image from "next/image"
import { rupiahFormatter } from "../../../../helper/rupiah-formatter"
import { BeliPulsa } from "../../global-state/pulsa"
import { BeliToken } from "../../global-state/token"
import { BeliPDAM } from "../../global-state/pdam"

type PropsVirtualAccount<T> = {
    serviceState: T
}

const VirtualAccount = <T extends BeliPulsa | BeliToken | BeliPDAM>(props:PropsVirtualAccount<T>) => {

    const {serviceState} = props

    return(
        <Box p="5" borderRadius="xl" boxShadow="base" my="8">
            <Text textAlign="center" as="h2" fontWeight="bold" className="my-text" >
                {serviceState.nameProduct}
            </Text>
            <Divider my="4"/>
            <Flex justifyContent="space-between">
                <Image width={80} height={30} src={serviceState.paymentMethod?.logo || ""} alt={serviceState.paymentMethod?.name}/>
                <Text fontWeight="bold" className="my-text" fontSize="sm">{serviceState.paymentMethod?.name}</Text>
            </Flex>
            <Text as="h3" className="my-text" color="base" fontSize="sm" fontWeight="bold" mt="4" mb="2">Nomor Virtual Account</Text>
            <Flex justifyContent="space-between">
                <Text fontWeight="bold" className="my-text">80777082236486879</Text>
                <Flex alignItems="center">
                    <Text className="my-text" fontSize="sm" mx="1">salin</Text>
                    <Icon as={MdOutlineFileCopy}></Icon>
                </Flex>
            </Flex>
            <Text as="h3" className="my-text" color="base" fontSize="sm" fontWeight="bold" my="2">Total Pembayaran</Text>
            <Text as="h3" className="my-text" fontWeight="bold" my="2">
                {rupiahFormatter(serviceState.total?serviceState.total:0,"Rp.")}
            </Text>
            <Divider my="4"/>
            <Text as="h3" className="my-text" color="base" fontSize="sm" fontWeight="bold" my="2">Pembayaran Berakhir Dalam</Text>
            <Text as="h3" className="my-text" fontWeight="bold" my="2" color="base_second">
                23:40:45
            </Text>
            <Text as="h3" className="my-text" color="base" fontSize="sm" fontWeight="bold" my="2">Batas Akhir Pembayaran</Text>
            <Text as="h3" className="my-text" fontWeight="bold" my="2" color="base_second">
                Rabu, 15 Desember 2021 16:11
            </Text>
        </Box>
    )
}

export default VirtualAccount