import Service from '../../../components/service/service'
import { Input, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { beliPulsa } from '../../../components/global-state/pulsa'
import { backNavEffects } from '../../../components/global-state/back-nav-effects'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { useRouter } from 'next/router'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ChoiceNominal from '../../../components/choice-nominal/choice-nominal'
import { DataNominal,  ListDataNominal} from '../../../components/choice-nominal/choice-nominal'
import { UserLayout } from "../../_app"
import Image from 'next/image'

const listNominalPulsa = {
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

const Index = () => {

    const router = useRouter()
    const [dataBeliPulsa, setDataBeliPulsa] = useRecoilState(beliPulsa)
    const [dataNominalPulsa, setDataNominalPulsa] = useState<ListDataNominal | undefined>(undefined)
    const setBackNavEffects = useSetRecoilState(backNavEffects)
    const formik = useFormik({
        initialValues: {
            handphone:dataBeliPulsa.noHandphone? dataBeliPulsa.noHandphone : ""
        },
        validationSchema: Yup.object({
            handphone: Yup.string()
              .min(10, 'isi no handphone minimal 10 karakter ya')
              .required('isi no handphone dulu ya')
        }),
        onSubmit:(values) => {}
    })

    const handphoneValue = formik.values.handphone

    const setListNominal = (handphone:string="") => {
        if(handphone.match(/0822/)){
            setDataNominalPulsa(listNominalPulsa.telkomsel)
        }
        else if(handphone.match(/0815/)){
            setDataNominalPulsa(listNominalPulsa.indosat)
        }
        else{
            setDataNominalPulsa(undefined)
        }
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value.match(/^[0-9]*$/)){
            setListNominal(e.target.value)
            formik.handleChange(e)
        }
    }

    const handleClickNominal = ({name, price, adminFee}:DataNominal)=>{
        if(!(formik.errors.handphone && formik.touched.handphone)){
            setDataBeliPulsa({
                nameProduct:name,
                price:price,
                adminFee:adminFee,
                noHandphone:handphoneValue,
                total:price+adminFee
            })
            router.push("/transaction/pulsa/checkout")
        }
    }

    useEffect(()=>{
        setBackNavEffects({
            effects:()=>{
                setDataBeliPulsa({
                    ...dataBeliPulsa,
                    noHandphone:""
                })
            }
        })
        setListNominal(handphoneValue)
    },[])



    return (
        <>
            <Service setting={{my:"8"}} title="pulsa"/>
            <FormControl isInvalid={formik.errors.handphone && formik.touched.handphone ? true : false}>
                <FormLabel htmlFor="handphone" textColor="base">No Handphone</FormLabel>
                <Input
                    type="tel" onChange={handleChange} onBlur={formik.handleBlur} id="handphone" variant='outline'
                    placeholder='08xx' shadow="base" size="lg" value={handphoneValue} name="handphone"
                />
                {
                    <FormErrorMessage>{formik.errors.handphone}</FormErrorMessage>
                }
                {
                    dataNominalPulsa ? (
                        <ChoiceNominal
                            title="Nominal Pulsa"
                            dataNominal={dataNominalPulsa.data}
                            handleClickNominal={handleClickNominal}
                            render={()=><Image src={dataNominalPulsa.logo!} width={140} height={80} alt="logo provider"/>}
                        />
                    ) : null
                }
            </FormControl>
        </>
    )
}

export default Index

Index.getLayout = UserLayout