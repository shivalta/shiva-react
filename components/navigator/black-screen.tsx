import { Box } from "@chakra-ui/react"
import { useEffect } from "react"

const BlackScreen = () => {

    document.body.style.overflow = "hidden"

    useEffect(()=>{
        return ()=>{
            document.body.style.overflow = "scroll"
        }
    })

    return(
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
    )
}

export default BlackScreen