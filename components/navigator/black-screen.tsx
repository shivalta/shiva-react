import { Box, Text } from "@chakra-ui/react"
import React, { useEffect } from "react"

type PropsBlackScreen = {
    child?: React.ReactNode
}

const BlackScreen = (props:PropsBlackScreen) => {

    const { child } = props
    document.body.style.overflow = "hidden"

    useEffect(()=>{
        return ()=>{
            document.body.style.overflowY = "scroll"
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
            maxWidth="480px"
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            px="5"
        >
            {child || null}
        </Box>
    )
}

export default BlackScreen