import { useRecoilState, useSetRecoilState } from "recoil"
import { navigator } from "../../global-state/navigator"
import { blackScreen } from "../../global-state/black-screen"
import { Flex, Text, Center } from "@chakra-ui/react"


type PropsPopUp = {
    title : string
    render: React.ReactNode
}

const PopUp = (props:PropsPopUp)=> {

    const {title, render} = props
    const [navigatorState, setterNavigatorState] = useRecoilState(navigator)
    const setIsBlackScreenRender = useSetRecoilState(blackScreen)

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
                    onClick={()=>{
                        setIsBlackScreenRender({
                            isBlackScreenRender:false
                        })
                        setterNavigatorState({
                            ...navigatorState,
                            isOpenPopUp: !navigatorState.isOpenPopUp
                        })
                    }}
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