import { useState } from "react"
import { Flex, Text, RadioGroup, Box, Radio, Divider } from "@chakra-ui/react"
import Image from "next/image"
import { BeliPulsa } from "../global-state/globalState"
import { Fragment } from "react"

type PaymentMethod = {
    id: string
    name: string
    logo: string
}

type PropsChoicePaymentMethod<T> = {
    listPaymentMethod : PaymentMethod[]
    setterServiceState: (arg:T)=>void
    serviceState: T
}

const ChoicePaymentMethod =<T extends BeliPulsa>(props: PropsChoicePaymentMethod<T>)=>{

    const {listPaymentMethod, setterServiceState, serviceState} = props

    const [choicedMethod, setChoicedMethod] = useState("")

    return(
        <>
            <Text as="h3" className="my-text" color="base" fontWeight="bold" mt="8">
                Metode Pembayaran
            </Text>
            <RadioGroup value={choicedMethod}>
                {
                    listPaymentMethod.map(({id,name,logo})=>{
                        return(
                            <Fragment key={id}>
                                <Flex alignItems="center" my="8">
                                    <Image src={logo} width={80} height={30} alt={name}/>
                                    <Box px="4" className="my-text" fontWeight="semibold" flexGrow="1" fontSize="sm">{name}</Box>
                                    <Radio value={id} onClick={()=>{
                                        setterServiceState({
                                            ...serviceState,
                                            paymentMethod:{
                                                id:id,
                                                name:name,
                                                logo:logo
                                            }
                                        })
                                        setChoicedMethod(id)
                                    }}/>
                                </Flex>
                                <Divider orientation='horizontal' my="8" />
                            </Fragment>
                        )
                    })
                }
            </RadioGroup>
        </>
    )
}

export default ChoicePaymentMethod