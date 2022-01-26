import { Box, Flex, Icon, Text, useToast } from "@chakra-ui/react"
import { MdOutlineFileCopy } from "react-icons/md"
import { rupiahFormatter } from "../../../../helper/rupiah-formatter"
import { BeliPulsa } from "../../global-state/pulsa"
import { BeliToken } from "../../global-state/token"
import { BeliPDAM } from "../../global-state/pdam"

type PropsVirtualAccount<T> = {
    serviceState: T
}

const VirtualAccount = <T extends BeliPulsa | BeliToken | BeliPDAM>(props:PropsVirtualAccount<T>) => {

    const { serviceState } = props
    const toast = useToast()

    const copyTextToClipboard = async (text:string) => {
        return await navigator.clipboard.writeText(text)
    }

    const handleCopyClick = (copyText:string) => {
        copyTextToClipboard(copyText)
          .then(() => {
            toast({
                description: "virtual akun berhasil disalin.",
                status: 'success',
                position: 'top'
            })
          })
          .catch((err) => {
            console.log(err)
          })
    }

    return(
        <Box p="5" borderRadius="xl" boxShadow="base" my="8">
            <Text textAlign="center" as="h2" fontWeight="bold" className="my-text" >
                {serviceState.nameProduct}
            </Text>
            <Box height="0.1" width="full" background="gray.100" borderRadius="base" my="4"/>
            <Flex justifyContent="space-between">
                <Text fontWeight="bold" className="my-text" fontSize="sm">{serviceState.paymentMethod?.bank_name}</Text>
            </Flex>
            <Text as="h3" className="my-text" color="base" fontSize="sm" fontWeight="bold" mt="4" mb="2">Nomor Virtual Akun</Text>
            <Flex justifyContent="space-between">
                <Text fontWeight="bold" className="my-text">{serviceState.virtualAccount}</Text>
                <Flex cursor="pointer" alignItems="center" onClick={()=>handleCopyClick(serviceState.virtualAccount!)}>
                    <Text className="my-text" fontSize="sm" mx="1">salin</Text>
                    <Icon as={MdOutlineFileCopy}></Icon>
                </Flex>
            </Flex>
            <Text as="h3" className="my-text" color="base" fontSize="sm" fontWeight="bold" my="2">Total Pembayaran</Text>
            <Text as="h3" className="my-text" fontWeight="bold" my="2">
                {rupiahFormatter(serviceState.total?serviceState.total:0,"Rp.")}
            </Text>
            <Box height="0.1" width="full" background="gray.100" borderRadius="base" my="4"/>
            {/* <Text as="h3" className="my-text" color="base" fontSize="sm" fontWeight="bold" my="2">Pembayaran Berakhir Dalam</Text>
            <Text as="h3" className="my-text" fontWeight="bold" my="2" color="base_second">
                23:40:45
            </Text> */}
            <Text as="h3" className="my-text" color="base" fontSize="sm" fontWeight="bold" my="2">Batas Akhir Pembayaran</Text>
            <Text as="h3" className="my-text" fontWeight="bold" my="2" color="base_second">
                {serviceState.deadlinePayment}
            </Text>
        </Box>
    )
}

export default VirtualAccount