import VirtualAccount from "../../../components/virtual-account/virtual-account"
import { beliPulsa } from "../../../components/global-state/pulsa"
import { backNavEffects } from "../../../components/global-state/back-nav-effects"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { UserLayout } from "../../_app"
import { useEffect } from "react"

const Payment = () => {

    const dataBeliPulsa = useRecoilValue(beliPulsa)
    const setBackNavEffects = useSetRecoilState(backNavEffects)

    useEffect(()=>{
        setBackNavEffects({
            effects:()=>{}
        })
    })

    return(
        <VirtualAccount serviceState={dataBeliPulsa}/>
    )

}

export default Payment

Payment.getLayout = UserLayout