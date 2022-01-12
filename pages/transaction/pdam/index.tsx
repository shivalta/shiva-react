import Service from '../../../components/service/service'
import { Input, FormControl, FormLabel, FormErrorMessage, Select, Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { beliPDAM } from '../../../components/global-state/pdam'
import { backNavEffects } from '../../../components/global-state/back-nav-effects'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { useRouter } from 'next/router'
import { useFormik } from 'formik';
import { UserLayout } from "../../_app"
import * as Yup from 'yup';

const listRegion = ["Sidoarjo", "Surabaya", "Malang"]

type FormPDAM = {
    noPDAM : string
    region : string
}

const Index = () => {

    const router = useRouter()
    const [dataBeliPDAM, setDataBeliPDAM] = useRecoilState(beliPDAM)
    const setBackNavEffects = useSetRecoilState(backNavEffects)
    const formik = useFormik<FormPDAM>({
        initialValues: {
            noPDAM: dataBeliPDAM.noPDAM || "",
            region: dataBeliPDAM.region || ""
        },
        validationSchema: Yup.object({
            noPDAM: Yup.string()
              .min(10, 'isi no PDAM minimal 10 karakter ya')
              .required('isi no PDAM dulu ya'),
            region:Yup.string()
            .required('pilih wilayah pengguna dulu ya'),
        }),
        onSubmit:(values:FormPDAM) => {
            const {noPDAM, region} = values
            const randomBill = Math.floor(Math.random() * 101) + 100000
            const adminFee = 2000
            setDataBeliPDAM({
                nameProduct:"PDAM",
                noPDAM:noPDAM,
                bill:randomBill,
                adminFee:adminFee,
                region:region,
                total:randomBill+adminFee
            })
            router.push("/transaction/pdam/checkout")
        }
    })

    const {noPDAM, region} = formik.values

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value.match(/^[0-9]*$/)){
            formik.handleChange(e)
        }
    }

    useEffect(()=>{
        setBackNavEffects({
            effects:()=>{
                setDataBeliPDAM({})
            }
        })
    },[])



    return (
        <>
            <Service setting={{my:"8"}} title="pdam"/>
            <FormControl isInvalid={formik.errors.noPDAM && formik.touched.noPDAM ? true : false}>
                <FormLabel htmlFor="noPDAM" textColor="base">No PDAM</FormLabel>
                <Input
                    type="tel" onChange={handleChange} onBlur={formik.handleBlur} id="noPDAM" variant='outline'
                    placeholder='12xx' shadow="base" size="lg" value={noPDAM} name="noPDAM"
                />
                {
                    <FormErrorMessage>{formik.touched.noPDAM? formik.errors.noPDAM : ""}</FormErrorMessage>
                }
            </FormControl>
            <FormControl isInvalid={formik.errors.region && formik.touched.region ? true : false}>
                <FormLabel htmlFor="region" textColor="base" mt="3">Wilayah</FormLabel>
                <Select
                    placeholder='pilih wilayah' name="region" variant="outline"
                    value={region} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    shadow="base" size="lg"
                >
                    {
                        listRegion.map((region)=><option key={`option-${region}`}>{region}</option>)
                    }
                </Select>
                {
                    <FormErrorMessage>{formik.touched.region? formik.errors.region : ""}</FormErrorMessage>
                }
            </FormControl>
                <Button
                    fontSize="xs"
                    bg="base"
                    color="white"
                    width="full"
                    height="10"
                    my="8"
                    _hover={{bg:"base"}}
                    onClick={(e)=>{
                        formik.handleSubmit()
                    }}
                >
                    Cek tagihan
                </Button>
        </>
    )
}

export default Index

Index.getLayout = UserLayout