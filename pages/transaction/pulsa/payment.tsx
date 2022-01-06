import VirtualAccount from "../../../components/virtual-account/virtual-account"
import { beliPulsa } from "../../../components/global-state/globalState"
import { backNavEffects } from "../../../components/global-state/globalState"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { useEffect } from "react"

const Payment = () => {

    const dataBeliPulsa = useRecoilValue(beliPulsa)
    const setBackNavEffects = useSetRecoilState(backNavEffects)

    useEffect(()=>{
        setBackNavEffects({
            effects:()=>{
                console.log("halo")
            }
        })
    })

    return(
        <VirtualAccount serviceState={dataBeliPulsa}/>
    )

}

export default Payment