import Service from '../../../components/user/general/service-icon/service-icon'
import { Input, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { beliToken } from '../../../components/user/global-state/token'
import { backNavEffects } from '../../../components/user/global-state/back-nav-effects'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { useRouter } from 'next/router'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ChoiceNominal from '../../../components/user/transaction/choice-nominal/choice-nominal'
import { UserLayout } from "../../_app"
import { baseRequest } from '../../../helper/base-request'
import { DataNominal,  ListDataNominal} from '../../../components/user/transaction/choice-nominal/choice-nominal'

const Index = () => {

    const router = useRouter()
    const [dataBeliToken, setDataBeliToken] = useRecoilState(beliToken)
    const [dataNominalToken, setDataNominalToken] = useState<ListDataNominal | undefined>(undefined)
    const setBackNavEffects = useSetRecoilState(backNavEffects)
    const formik = useFormik({
        initialValues: {
            noPLN : dataBeliToken.noPLN? dataBeliToken.noPLN : ""
        },
        validationSchema: Yup.object({
            noPLN: Yup.string()
              .max(3, 'isi no PLN maximal 3 karakter ya')
              .required('isi no PLN dulu ya')
        }),
        onSubmit:(values:any) => {}
    })

    const noPLN = formik.values.noPLN

    const getDataListNominal = async () => {
        let idProvider = 10
        const response = await baseRequest<any>({
            method:"GET",
            url:`/products?search=${idProvider}&key=product_category_id`
        })
        const listNominal = {
            data: response.data.map((data:any)=>{
                if(data.is_active){
                    return {
                        name: data.name,
                        price: data.price,
                        adminFee: data.admin_fee,
                        tax: data.product_categories.tax
                    }
                }
            })
        }
        setDataNominalToken(listNominal)
    }

    const setListNominal = (noPLN:string="") => {
        if(noPLN.length < 4 && noPLN.length > 0){
            getDataListNominal()
        }
        else{
            setDataNominalToken(undefined)
        }
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value.match(/^[0-9]*$/)){
            setListNominal(e.target.value)
            formik.handleChange(e)
        }
    }


    const handleClickNominal = async ({name, price, adminFee, tax}:DataNominal)=>{
        const response = await baseRequest<any>({
            method:"POST",
            url:"/checkout",
            body:{
                user_value: formik.values.noPLN,
                product_id: 27
            }
        })
        const username = response.data.user_value
        setDataBeliToken({
            username:username,
            nameProduct:name,
            price:price,
            adminFee:adminFee,
            noPLN:noPLN,
            tax:tax,
            total:price+(price*tax/100)+adminFee
        })
        router.push("/transaction/token/checkout")
    }

    useEffect(()=>{
        setBackNavEffects({
            effects:()=>{
                setDataBeliToken({
                    ...dataBeliToken,
                    noPLN:""
                })
            }
        })
        setListNominal(noPLN)
    },[])



    return (
        <>
            <Service setting={{my:"8"}} title="token"/>
            <FormControl isInvalid={formik.errors.noPLN && formik.touched.noPLN ? true : false}>
                <FormLabel htmlFor="noPLN" textColor="base">No meter PLN / ID pelanggan</FormLabel>
                <Input
                    type="tel" onChange={handleChange} onBlur={formik.handleBlur} id="noPLN" variant='outline'
                    placeholder='0-100' shadow="base" size="lg" value={noPLN} name="noPLN"
                />
                {
                    <FormErrorMessage>{formik.errors.noPLN}</FormErrorMessage>
                }
                {
                    dataNominalToken ? (
                        <ChoiceNominal
                            title="Nominal Token"
                            dataNominal={dataNominalToken.data}
                            handleClickNominal={handleClickNominal}
                        />
                    ) : null
                }
            </FormControl>
        </>
    )
}

export default Index

Index.getLayout = UserLayout