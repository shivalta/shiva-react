import { Center, Icon } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { backNavEffects } from "../global-state/globalState";
import { TiArrowBack } from "react-icons/ti";
import { useRecoilValue } from "recoil";

const BackNav = () => {

    const router = useRouter()
    const patternBackNav = /\/transaction/
    const handleClick = useRecoilValue(backNavEffects)
    const isRender = ():boolean => {
        if(router.pathname.match(patternBackNav)){
            return true
        }
        return false
    }
    console.log(handleClick)
    return(
        isRender() ?
        <Center
            height="5"
            width="5"
            shadow="base"
            onClick={()=>{
                handleClick.effects()
                router.back()
            }}
            p="5"
            borderRadius="lg"
            mt="6"
            fontWeight="bold"
            color="base"
            as="button"
        >
            <Icon as={TiArrowBack} color="base" h={5} width={5} />
        </Center> : null
    )


}

export default BackNav