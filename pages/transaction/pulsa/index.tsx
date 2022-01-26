import ServiceIcon from '../../../components/user/general/service-icon/service-icon'
import { Input, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { beliPulsa } from '../../../components/user/global-state/pulsa'
import { backNavEffects } from '../../../components/user/global-state/back-nav-effects'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { useRouter } from 'next/router'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ChoiceNominal from '../../../components/user/transaction/choice-nominal/choice-nominal'
import { DataNominal,  ListDataNominal} from '../../../components/user/transaction/choice-nominal/choice-nominal'
import { UserLayout } from "../../_app"
import Image from 'next/image'
import { baseRequest } from '../../../helper/base-request'

type ListIdProvider = {
    [key:string] : string
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

    const getDataListNominal = async (provider:string) => {
        const listIdProvider:ListIdProvider = {
            telkomsel : "8",
            indosat: "9"
        }
        let idProvider = listIdProvider[provider]
        const response = await baseRequest<any>({
            method:"GET",
            url:`/products?search=${idProvider}&key=product_category_id`
        })
        const listNominal = {
            logo: response.data[0].product_categories.image,
            data: response.data.map((data:any)=>{
                if(data.is_active){
                    return {
                        id: data.id,
                        category: data.product_class.name,
                        name: data.name,
                        price: data.price,
                        adminFee: data.admin_fee,
                        tax: data.product_categories.tax
                    }
                }
            })
        }
        setDataNominalPulsa(listNominal)
    }

    const setListNominal = (handphone:string="") => {
        if(handphone.match(/0822/)){
            getDataListNominal("telkomsel")
        }
        else if(handphone.match(/0815/)){
            getDataListNominal("indosat")
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

    const handleClickNominal = ({name, price, adminFee, tax, id, category}:DataNominal)=>{
        if(!(formik.errors.handphone && formik.touched.handphone)){
            setDataBeliPulsa({
                id:id,
                nameCategory:category,
                nameProduct:name,
                price:price,
                adminFee:adminFee,
                noHandphone:handphoneValue,
                tax:tax,
                total:price+(price*tax/100)+adminFee
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
            <ServiceIcon setting={{my:"8"}} title="pulsa"/>
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