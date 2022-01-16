import { rupiahFormatter } from "../../../../helper/rupiah-formatter"
import { Flex, Text, Divider } from "@chakra-ui/react"

type PropsInfoTotalPayment = {
    total:number
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

export default InfoTotalPayment