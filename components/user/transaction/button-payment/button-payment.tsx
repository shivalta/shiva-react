import { BeliPulsa } from "../../global-state/pulsa"
import { BeliToken } from "../../global-state/token"
import { RecordDetailTransaction } from "../detail-transaction/detail-transaction"
import { useRecoilState, useSetRecoilState } from "recoil"
import { navigator } from "../../global-state/navigator"
import { blackScreen } from "../../global-state/black-screen"
import PopUp from "../../general/navigator/pop-up"
import DetailTransaction from "../detail-transaction/detail-transaction"
import { Button } from "@chakra-ui/react"
import { useEffect } from "react"
import { BeliPDAM } from "../../global-state/pdam"

type PropsButtonPayment = {
    detailServiceState: RecordDetailTransaction[]
}

const ButtonPayment = (props:PropsButtonPayment)=>{

    const { detailServiceState } = props
    const [navigatorState, setterNavigatorState] = useRecoilState(navigator)
    const setIsBlackScreenRender = useSetRecoilState(blackScreen)

    useEffect(()=>{
        return ()=>{
            setIsBlackScreenRender({
                isBlackScreenRender:false
            })
        }
    },[])

    const handleClick = ()=>{
        setIsBlackScreenRender({
            isBlackScreenRender: true
        })
        setterNavigatorState({
            ...navigatorState,
            isOpenPopUp: true,
            renderPopUp:
                <PopUp
                    title={"Detail Pembayaran"}
                    render={<DetailTransaction detailTransaction={detailServiceState}/>}
                />
        })
    }

    return(
        <Button
            fontSize="xs"
            bg="base"
            color="white"
            height="10"
            width="24"
            flexGrow="1"
            _hover={{bg:"base"}}
            onClick={handleClick}
            ml="2"
        >
            Detail
        </Button>
    )
}

export default ButtonPayment