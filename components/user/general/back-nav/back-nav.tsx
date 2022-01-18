import { Center, Icon } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { backNavEffects } from "../../global-state/back-nav-effects"
import { TiArrowBack } from "react-icons/ti"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"

const BackNav = () => {

    const router = useRouter()
    const [counterRender, setCounterRender] = useState(0)
    const handleClick = useRecoilValue(backNavEffects)
    const isRender = ():boolean => {
        if(counterRender !== 1 && router.asPath !== "/"){
            return true
        }
        return false
    }

    useEffect(()=>{
        setCounterRender(counterRender+1)
    }, [router])

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
            background="white"
            as="button"
        >
            <Icon as={TiArrowBack} color="base" h={5} width={5} />
        </Center> : null
    )


}

export default BackNav