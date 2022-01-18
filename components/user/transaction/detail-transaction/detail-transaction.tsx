import { Flex, Box, Text } from "@chakra-ui/react"
import { v4 as uuidv4 } from "uuid"

export type RecordDetailTransaction = {
    name:string | "Total pembayaran"
    value:string
}

type PropsDetailTransaction = {
    detailTransaction: RecordDetailTransaction[]
    topChild?: React.ReactNode
    bottomChild?: React.ReactNode
}

const DetailTransaction = ({detailTransaction, topChild, bottomChild}:PropsDetailTransaction)=> {
    return(
        <Box background="white" shadow="base" p="4" borderRadius="lg" my="5" width="full">
            {
                topChild || null
            }
            {
                detailTransaction.map((data:RecordDetailTransaction)=>{
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
            {
                bottomChild || null
            }
        </Box>
    )
}

export default DetailTransaction