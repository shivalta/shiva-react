import { Flex, Text, Center } from "@chakra-ui/react"


type PropsPopUp = {
    setIsRenderPopUp : (value:boolean)=>void
    title : string
    render: React.ReactNode
}

const PopUp = (props:PropsPopUp)=> {

    const {setIsRenderPopUp, title, render} = props

    return(
        <>
            <Flex width="full" py="2" justify="space-between" alignItems="center">
                <Text as="h3" className="my-text" color="base" fontWeight="bold">
                    {title}
                </Text>
                <Center
                    height="5"
                    width="5"
                    shadow="base"
                    onClick={()=>setIsRenderPopUp(false)}
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
            {
                render
            }
        </>
    )
}

export default PopUp