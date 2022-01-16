import { Box } from "@chakra-ui/react"
import { useRecoilValue } from "recoil"
import { blackScreen } from "../../global-state/black-screen"
import React, { useEffect } from "react"

const BlackScreen = () => {

    const { isBlackScreenRender } = useRecoilValue(blackScreen)

    useEffect(()=>{
        if(isBlackScreenRender){
            document.body.style.overflowY = "hidden"
        }
        return ()=>{
            document.body.style.overflowY = "scroll"
        }
    })

    if(isBlackScreenRender){
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
            </Box>
        )
    }

    return null
}

export default BlackScreen