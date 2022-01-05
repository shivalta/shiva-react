import { beliPulsa } from "../../../components/global-state/globalState"
import Service from "../../../components/service/service"
import { Text } from "@chakra-ui/react"
import DetailPayment from "../../../components/detail-payment/detail-payment"
import { useRecoilState, useRecoilValue } from "recoil"
import { getDetailBeliPulsa } from "../../../components/global-state/globalState"
import ChoicePaymentMethod from "../../../components/choice-payment-method/choice-payment-method"
import logoMandiri from "../../../public/images/mandiri-2.png"
import logoBCA from "../../../public/images/bca-2.png"

const Checkout = () => {

    const [dataBeliPulsa, setDataBeliPulsa] = useRecoilState(beliPulsa)
    const detailBeliPulsa = useRecoilValue(getDetailBeliPulsa)

    const listPaymentMethod = [
        {
            id:"BCA-1",
            name:"BCA virtual account",
            logo:"/../../../public/images/bca-2.png"
        },
        {
            id:"MANDIRI-2",
            name:"Mandiri virtual account",
            logo:"/../../../public/images/mandiri-2.png"
        }
    ]

    return(
        <>
            <Service my="8"/>
            <Text as="h3" className="my-text" color="base" fontWeight="bold" mt="8">
                Detail Pembayaran
            </Text>
            <DetailPayment  detailPayment={detailBeliPulsa}/>
            <ChoicePaymentMethod
                listPaymentMethod={listPaymentMethod}
                setterServiceState={setDataBeliPulsa}
                serviceState={dataBeliPulsa}
            />
        </>
    )
}

export default Checkout