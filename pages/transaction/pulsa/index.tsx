import Service from '../../../components/service/service'
import { Input, FormControl, FormLabel, FormErrorMessage, Text, Flex } from '@chakra-ui/react'
import Image from 'next/image'
import { useState } from 'react'
import { beliPulsa } from '../../../components/global-state/globalState'
import { useSetRecoilState } from 'recoil'
import { useRouter } from 'next/router'
import { useFormik } from 'formik';
import * as Yup from 'yup';

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

    const schema = Yup.object({
        handphone: Yup.string()
          .min(10, 'isi no handphone minimal 10 karakter ya')
          .required('isi no handphone dulu ya')
    })

    const formik = useFormik({
        initialValues:{
            handphone:""
        },
        onSubmit:(values)=>console.log(values),
        validationSchema: schema
    })
    const handphoneValue = formik.values.handphone
    const [dataPulsa, setDataPulsa] = useState<ListDataProvider | undefined>(undefined)
    const setDataBeliPulsa = useSetRecoilState(beliPulsa)
    const router = useRouter()

    const handleClickNominal = ({name,price,adminFee}:DataProvider) => {
        if(!(formik.errors.handphone && formik.touched.handphone)){
            setDataBeliPulsa({
                nameProduct:name,
                price:price,
                adminFee:adminFee,
                noHandphone:handphoneValue,
                total:price + adminFee
            })
            router.push("/transaction/pulsa/checkout")
        }
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value.match(/0822/)){
            setDataPulsa(dataProvider.telkomsel)
        }
        else if(e.target.value.match(/0815/)){
        setDataPulsa(dataProvider.indosat)
        }
        formik.handleChange(e)
    }

    return (
        <>
            <Service my={8}/>
            <FormControl isInvalid={formik.errors.handphone && formik.touched.handphone ? true : false}>
                <FormLabel htmlFor="handphone" textColor="base">No Handphone</FormLabel>
                <Input
                    type="tel" onChange={handleChange} onBlur={formik.handleBlur} id="handphone" variant='outline'
                    placeholder='08xx' shadow="base" size="lg" value={handphoneValue}
                />
                {
                    <FormErrorMessage>{formik.errors.handphone}</FormErrorMessage>
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
                                        <Flex onClick={()=>handleClickNominal({name,price,adminFee})} key={name}
                                            as="a" justify="space-between" alignItems="center" rounded="xl" shadow="base"
                                            px="3" py="5" my="3" tabIndex={0} cursor="pointer"
                                        >
                                            <Text fontWeight="bold" className="my-text">{name}</Text>
                                            <Text fontWeight="semibold" className="my-text" fontSize="xl" color="base_second">Rp.{price}</Text>
                                        </Flex>
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