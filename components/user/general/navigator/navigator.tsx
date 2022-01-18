import { Box, Icon } from "@chakra-ui/react"
import Link from "next/link"
import { MdHome, MdArticle, MdAccountBox } from "react-icons/md"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { beliPulsa } from "../../global-state/pulsa"
import { beliToken } from "../../global-state/token"
import { beliPDAM } from "../../global-state/pdam"
import { useRouter } from "next/router"
import { navigator } from "../../global-state/navigator"

type ActiveNav = "history" | "profile" | "home"

const Navigator = ()=>{

    const navigatorState = useRecoilValue(navigator)

    const setDataBeliPulsa = useSetRecoilState(beliPulsa)
    const setDataBeliToken = useSetRecoilState(beliToken)
    const setDataBeliPDAM = useSetRecoilState(beliPDAM)
    const patternHistory = /\/history-transaction/
    const patternProfile = /\/profile/
    const { pathname } = useRouter()

    const handleClick = ()=>{
        setDataBeliPulsa({})
        setDataBeliToken({})
        setDataBeliPDAM({})
    }

    const getActiveNav = ():ActiveNav => {
        if(pathname.match(patternHistory)){
            return "history"
        }
        if(pathname.match(patternProfile)){
            return "profile"
        }
        return "home"
    }

    const activeNav = getActiveNav()

    return(
        <Box
            position="fixed"
            left="50%"
            transform="translateX(-50%)"
            bottom="0"
            maxWidth="480px"
            width="full"
            height="auto"
            borderTopLeftRadius="navigator"
            borderTopRightRadius="navigator"
            shadow="navigator"
            px="5"
            py="3"
            bg="white"
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
            flexWrap="wrap"
        >
            {
                navigatorState.isOpenPopUp? navigatorState.renderPopUp || null : null
            }
            {
                navigatorState.renderContent || null
            }
            <Link href="/" passHref>
                <Box as="a" px="2" onClick={handleClick} >
                    <Icon as={MdHome} color={activeNav==="home" ? "base" : "gray.300"} h={10} width={10} />
                </Box>
            </Link>
            <Link href="/history-transaction" passHref>
                <Box as="a" px="2" onClick={handleClick}>
                    <Icon as={MdArticle} color={activeNav==="history" ? "base" : "gray.300"} h={10} width={10} />
                </Box>
            </Link>
            <Link href="/profile" passHref>
                <Box as="a" px="2" onClick={handleClick}>
                    <Icon as={MdAccountBox} color={activeNav==="profile" ? "base" : "gray.300"} h={10} width={10} />
                </Box>
            </Link>
            {
                navigatorState.button || null
            }
        </Box>
    )
}

export default Navigator