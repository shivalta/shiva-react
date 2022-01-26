import { useEffect, useState } from "react"
import { Flex, Text, RadioGroup, Box, Radio, Divider } from "@chakra-ui/react"
import Image from "next/image"
import { BeliPulsa } from "../../global-state/pulsa"
import { BeliToken } from "../../global-state/token"
import { BeliPDAM } from "../../global-state/pdam"
import { Fragment } from "react"
import { baseRequest } from "../../../../helper/base-request"

type PaymentMethod = {
    bank_name: string
    bank_code: string
}

type PropsChoicePaymentMethod<T> = {
    setterServiceState: (arg:T)=>void
    serviceState: T
}

const ChoicePaymentMethod =<T extends BeliPulsa | BeliToken | BeliPDAM>(props: PropsChoicePaymentMethod<T>)=>{

    const [listPaymentMethod, setListPaymentMethod] = useState<PaymentMethod[]>()
    const {setterServiceState, serviceState} = props
    const currentPaymentMethod = serviceState.paymentMethod?.bank_code || ""

    useEffect(()=>{
        const getDataPaymentMethod = async () => {
            const response = await baseRequest<PaymentMethod[]>({
                method:"GET",
                url:"/payment-list"
            })
            setListPaymentMethod(response.data)
        }
        getDataPaymentMethod()
    },[])

    return(
        <>
            <Text as="h3" className="my-text" color="base" fontWeight="bold" mt="8">
                Metode Pembayaran
            </Text>
            <RadioGroup value={currentPaymentMethod}>
                {
                    listPaymentMethod?.map(({bank_name,bank_code})=>{
                        return(
                            <Fragment key={bank_name}>
                                <Flex alignItems="center" my="8">
                                    <Box px="2" className="my-text" fontWeight="semibold" flexGrow="1" fontSize="sm">{bank_name}</Box>
                                    <Radio value={bank_code} onClick={()=>{
                                        setterServiceState({
                                            ...serviceState,
                                            paymentMethod:{
                                                bank_name,
                                                bank_code
                                            }
                                        })
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