import VirtualAccount from "../../../components/user/transaction/virtual-account/virtual-account"
import { beliPDAM } from "../../../components/user/global-state/pdam"
import { backNavEffects } from "../../../components/user/global-state/back-nav-effects"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { UserLayout } from "../../_app"
import ButtonPayment from "../../../components/user/transaction/button-payment/button-payment"
import { getDetailBeliPDAM } from "../../../components/user/global-state/pdam"
import { navigator } from "../../../components/user/global-state/navigator"
import { useEffect } from "react"

const Payment = () => {

    const dataBeliPDAM = useRecoilValue(beliPDAM)
    const detailBeliPDAM = useRecoilValue(getDetailBeliPDAM)
    const setBackNavEffects = useSetRecoilState(backNavEffects)
    const setterNavigatorState = useSetRecoilState(navigator)

    useEffect(()=>{
        setterNavigatorState({
            button: <ButtonPayment detailServiceState={detailBeliPDAM} />,
        })
        setBackNavEffects({
            effects:()=>{}
        })
        return ()=>{
            setterNavigatorState({})
        }
    },[detailBeliPDAM])

    return(
        <VirtualAccount serviceState={dataBeliPDAM}/>
    )

}

export default Payment

Payment.getLayout = UserLayout