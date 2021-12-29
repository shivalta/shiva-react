import { Center } from "@chakra-ui/react"
import { useRouter } from "next/router"

const BackNav = () => {

    const router = useRouter()
    const patternBackNav = /\/transaction/
    const isRender = ():boolean => {
        if(router.pathname.match(patternBackNav)){
            return true
        }
        return false
    }

    return(
        isRender() ?
        <Center
            height="5"
            width="5"
            shadow="base"
            onClick={router.back}
            p="5"
            borderRadius="lg"
            mt="3"
            fontWeight="bold"
            color="base"
            as="button"
        >
            🡨
        </Center> : null
    )


}

export default BackNav