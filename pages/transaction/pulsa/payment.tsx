import VirtualAccount from "../../../components/virtual-account/virtual-account"
import { beliPulsa } from "../../../components/global-state/globalState"
import { useRecoilValue } from "recoil"

const Payment = () => {

    const dataBeliPulsa = useRecoilValue(beliPulsa)

    return(
        <VirtualAccount serviceState={dataBeliPulsa}/>
    )

}

export default Payment