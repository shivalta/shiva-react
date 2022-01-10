import { Flex, Box, Text } from "@chakra-ui/react"
import { v4 as uuidv4 } from "uuid"

export type RecordDetailPayment = {
    name:string | "Total pembayaran"
    value:string
}

export type PropsDetailPayment = {
    detailPayment: RecordDetailPayment[]
}

const DetailPayment = ({detailPayment}:PropsDetailPayment)=> {
    return(
        <Box shadow="base" p="4" borderRadius="lg" my="5" width="full">
            {
                detailPayment.map((data:RecordDetailPayment)=>{
                    if(data.name !== "Total pembayaran"){
                        return(
                            <Flex flexWrap="wrap" key={uuidv4()}>
                                <Text
                                    w="50%"
                                    height="8"
                                    fontWeight="semibold"
                                    className="my-text"
                                    color="gray.500"
                                    fontSize="sm"
                                >
                                    {data.name}
                                </Text>
                                <Text
                                    w="50%"
                                    height="8"
                                    fontWeight="bold"
                                    className="my-text"
                                    fontSize="sm"
                                    pl="2"
                                >
                                    {data.value}
                                </Text>
                            </Flex>
                        )
                    }
                    else{
                        return(
                            <Flex flexWrap="wrap" key={uuidv4()}>
                                <Text
                                    w="50%"
                                    height="8"
                                    fontWeight="semibold"
                                    className="my-text"
                                    color="gray.500"
                                    fontSize="sm"
                                    display="flex"
                                    alignItems="center"
                                >
                                    {data.name}
                                </Text>
                                <Text
                                    w="50%"
                                    fontWeight="bold"
                                    className="my-text"
                                    fontSize="sm"
                                    background="base_second"
                                    color="white"
                                    p="2"
                                    borderRadius="md"
                                >
                                    {data.value}
                                </Text>
                            </Flex>
                        )
                    }
                })
            }
        </Box>
    )
}

export default DetailPayment