import VirtualAccount from "../../../components/user/transaction/virtual-account/virtual-account"
import { beliPulsa, getDetailBeliPulsa } from "../../../components/user/global-state/pulsa"
import { backNavEffects } from "../../../components/user/global-state/back-nav-effects"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { navigator } from "../../../components/user/global-state/navigator"
import { UserLayout } from "../../_app"
import ButtonPayment from "../../../components/user/transaction/button-payment/button-payment"
import { useEffect } from "react"

const Payment = () => {

    const dataBeliPulsa = useRecoilValue(beliPulsa)
    const detailBeliPulsa = useRecoilValue(getDetailBeliPulsa)
    const setBackNavEffects = useSetRecoilState(backNavEffects)
    const setterNavigatorState = useSetRecoilState(navigator)

    useEffect(()=>{
        setterNavigatorState({
            button: <ButtonPayment detailServiceState={detailBeliPulsa} />,
        })
        setBackNavEffects({
            effects:()=>{}
        })
        return ()=>{
            setterNavigatorState({})
        }
    },[detailBeliPulsa])

    return(
        <VirtualAccount serviceState={dataBeliPulsa}/>
    )

}

export default Payment

Payment.getLayout = UserLayout