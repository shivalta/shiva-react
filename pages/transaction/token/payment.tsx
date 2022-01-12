import VirtualAccount from "../../../components/virtual-account/virtual-account"
import { beliToken } from "../../../components/global-state/token"
import { backNavEffects } from "../../../components/global-state/back-nav-effects"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { UserLayout } from "../../_app"
import { useEffect } from "react"

const Payment = () => {

    const dataBeliToken = useRecoilValue(beliToken)
    const setBackNavEffects = useSetRecoilState(backNavEffects)

    useEffect(()=>{
        setBackNavEffects({
            effects:()=>{}
        })
    })

    return(
        <VirtualAccount serviceState={dataBeliToken}/>
    )

}

export default Payment

Payment.getLayout = UserLayout