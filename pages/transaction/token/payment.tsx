import VirtualAccount from "../../../components/user/transaction/virtual-account/virtual-account"
import { beliToken, getDetailBeliToken } from "../../../components/user/global-state/token"
import { backNavEffects } from "../../../components/user/global-state/back-nav-effects"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { UserLayout } from "../../_app"
import ButtonPayment from "../../../components/user/transaction/button-payment/button-payment"
import { navigator } from "../../../components/user/global-state/navigator"
import { useEffect } from "react"

const Payment = () => {

    const dataBeliToken = useRecoilValue(beliToken)
    const detailBeliToken = useRecoilValue(getDetailBeliToken)
    const setBackNavEffects = useSetRecoilState(backNavEffects)
    const setterNavigatorState = useSetRecoilState(navigator)

    useEffect(()=>{
        setterNavigatorState({
            button: <ButtonPayment detailServiceState={detailBeliToken} />,
        })
        setBackNavEffects({
            effects:()=>{}
        })
        return ()=>{
            setterNavigatorState({})
        }
    },[detailBeliToken])

    return(
        <VirtualAccount serviceState={dataBeliToken}/>
    )

}

export default Payment

Payment.getLayout = UserLayout