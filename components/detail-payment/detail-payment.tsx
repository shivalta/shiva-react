import { Flex, Box } from "@chakra-ui/react"

const DetailPayment = (props:any)=> {
    return(
        <Flex shadow="base" p="4" borderRadius="lg" my="2" flexWrap="wrap">
            {
                props.detailBeliPulsa?.map((data:any,index:number)=>{
                    if(index != props.detailBeliPulsa.length - 1){
                        return(
                            <>
                                <Box
                                    w="50%"
                                    height="8"
                                    fontWeight="semibold"
                                    className="my-text"
                                    color="gray.500"
                                    fontSize="sm"
                                >
                                    {Object.keys(data)[0]}
                                </Box>
                                <Box
                                    w="50%"
                                    height="8"
                                    fontWeight="bold"
                                    className="my-text"
                                    fontSize="sm"
                                    pl="2"
                                >
                                    {data[Object.keys(data)[0]]}
                                </Box>
                            </>
                        )
                    }
                    else{
                        return(
                            <>
                                <Box
                                    w="50%"
                                    height="8"
                                    fontWeight="semibold"
                                    className="my-text"
                                    color="gray.500"
                                    fontSize="sm"
                                    display="flex"
                                    alignItems="center"
                                >
                                    {Object.keys(data)[0]}
                                </Box>
                                <Box
                                    w="50%"
                                    fontWeight="bold"
                                    className="my-text"
                                    fontSize="sm"
                                    background="base_second"
                                    color="white"
                                    p="2"
                                    borderRadius="md"
                                >
                                    {data[Object.keys(data)[0]]}
                                </Box>
                            </>
                        )
                    }
                })
            }
        </Flex>
    )
}

export default DetailPayment