import VirtualAccount from "../../../components/virtual-account/virtual-account"
import { beliPDAM } from "../../../components/global-state/pdam"
import { backNavEffects } from "../../../components/global-state/back-nav-effects"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { useEffect } from "react"

const Payment = () => {

    const dataBeliPDAM = useRecoilValue(beliPDAM)
    const setBackNavEffects = useSetRecoilState(backNavEffects)

    useEffect(()=>{
        setBackNavEffects({
            effects:()=>{}
        })
    })

    return(
        <VirtualAccount serviceState={dataBeliPDAM}/>
    )

}

export default Payment