import { beliPulsa } from "../../../components/global-state/globalState"
import Service from "../../../components/service/service"
import { Text, Flex, Box, Radio, RadioGroup, Divider } from "@chakra-ui/react"
import DetailPayment from "../../../components/detail-payment/detail-payment"
import Image from "next/image"
import logoMandiri from "../../../public/images/mandiri-2.png"
import logoBCA from "../../../public/images/bca-2.png"
import { useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { getDetailBeliPulsa } from "../../../components/global-state/globalState"

const Checkout = () => {

    const [choicedMethod, setChoicedMethod] = useState("")
    const [dataBeliPulsa, setDataBeliPulsa] = useRecoilState(beliPulsa)
    const detailBeliPulsa = useRecoilValue(getDetailBeliPulsa)

    const listPaymentMethod = [
        {
            id:"1",
            name:"BCA virtual account",
            logo:logoBCA
        },
        {
            id:"2",
            name:"Mandiri virtual account",
            logo:logoMandiri
        }
    ]

    return(
        <>
            <Service my={8}/>
            <Text as="h3" className="my-text" color="base" fontWeight="bold" mt="8">
                Detail Pembayaran
            </Text>
            <DetailPayment  detailPayment={detailBeliPulsa}/>
            <Text as="h3" className="my-text" color="base" fontWeight="bold" mt="8">
                Metode Pembayaran
            </Text>
            <RadioGroup onChange={setChoicedMethod} value={choicedMethod}>
                {
                    listPaymentMethod.map(({id,name,logo})=>{
                        return(
                            <>
                                <Flex alignItems="center" my="8" key={name}>
                                    <Image src={logo} width={80} height={30} alt={name}/>
                                    <Box px="4" className="my-text" fontWeight="semibold" flexGrow="1" fontSize="sm">{name}</Box>
                                    <Radio value={id} onClick={()=>{
                                        setDataBeliPulsa({
                                            ...dataBeliPulsa,
                                            paymentMethod:{
                                                id:id,
                                                name:name,
                                                logo:logo
                                            }
                                        })
                                    }}/>
                                </Flex>
                                <Divider orientation='horizontal' my="8" key={`divider-${name}`}/>
                            </>
                        )
                    })
                }
            </RadioGroup>
        </>
    )
}

export default Checkout