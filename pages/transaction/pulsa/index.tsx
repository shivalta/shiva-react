import Service from '../../../components/service/service'
import { Input, FormControl, FormLabel, FormErrorMessage, Text, Flex } from '@chakra-ui/react'
import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'
import { beliPulsa } from '../../../components/global-state/globalState'
import { useSetRecoilState } from 'recoil'

const dataProvider = {
    telkomsel:{
        logo: "/../public/images/telkomsel.png",
        data: [
            {
                name: "Telkomsel Rp.5.000",
                price: 6000,
                adminFee: 1000
            },
            {
                name: "Telkomsel Rp.10.000",
                price: 11000,
                adminFee: 1000
            },
            {
                name: "Telkomsel Rp.20.000",
                price: 21000,
                adminFee: 1000
            },
        ]
    },
    indosat:{
        logo: "/../public/images/indosat.png",
        data: [
            {
                name: "Indosat Rp.5.000",
                price: 6000,
                adminFee: 1000
            },
            {
                name: "Indosat Rp.10.000",
                price: 11000,
                adminFee: 1000
            },
            {
                name: "Indosat Rp.20.000",
                price: 21000,
                adminFee: 1000
            },
        ]
    }
}

function Example() {

    type DataProvider = {
        name:string
        price:number
        adminFee:number
    }

    type ListDataProvider = {
        logo:string
        data: DataProvider[]
    }

    const [handphoneValue, setHandphoneValue] = useState("")
    const [dataPulsa, setDataPulsa] = useState<ListDataProvider | undefined>(undefined)
    const setDataBeliPulsa = useSetRecoilState(beliPulsa)

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) : void => {
        if (e.target.value === '' || /^[0-9\b]+$/.test(e.target.value)) {
            setHandphoneValue(e.target.value)
            if(e.target.value === "0822"){
                setDataPulsa(dataProvider.telkomsel)
            }
            else if(e.target.value === "0815"){
                setDataPulsa(dataProvider.indosat)
            }
            else{
                setDataPulsa(undefined)
            }
        }
    }

    const updateDataBeliPulsa = (data:DataProvider)=>{
        setDataBeliPulsa(
            {
                nameProduct:data.name,
                price:data.price,
                adminFee:data.adminFee,
                noHandphone:handphoneValue,
                total:data.price + data.adminFee
            }
        )
    }

    const isHandphoneValueValid = (()=>{
        if(handphoneValue.length < 10){
            return false
        }
        return true
    })()


    return (
        <>
            <Service my={8}/>
            <FormControl isIn>
                <FormLabel htmlFor="handphone" textColor="base">No Handphone</FormLabel>
                <Input
                    type="tel" onChange={handleChange} id="handphone" variant='outline'
                    placeholder='08xx' shadow="base" size="lg" value={handphoneValue}
                />
                {
                    isHandphoneValueValid? <FormErrorMessage>No handphone is required</FormErrorMessage> : null
                }
                {
                    dataPulsa ? (
                        <>
                            <Text as="h3" className="my-text" color="base" fontWeight="bold" mt="5">
                                Nominal pulsa
                            </Text>
                            <Image src={dataPulsa.logo} width={140} height={80} alt="logo provider"/>
                            {
                                dataPulsa.data.map(({name,price,adminFee})=>{
                                    return(
                                        <Link href="/transaction/pulsa/checkout" key={name} passHref>
                                            <Flex onClick={()=>updateDataBeliPulsa({name,price,adminFee})}
                                                as="a" justify="space-between" alignItems="center" rounded="xl" shadow="base"
                                                px="3" py="5" my="3"
                                            >
                                                <Text fontWeight="bold" className="my-text">{name}</Text>
                                                <Text fontWeight="semibold" classname="my-text" fontSize="xl" color="base_second">Rp.{price}</Text>
                                            </Flex>
                                        </Link>
                                    )
                                })
                            }
                        </>
                    ) : null
                }

            </FormControl>
        </>
    )
}

export default Example