import { useFormik } from "formik"
import { FormControl, FormLabel, Input, FormErrorMessage,
         Text, RadioGroup, Radio, Stack, Button, useToast, Flex } from "@chakra-ui/react"
import { AdminLayout } from "../../../../_app"
import { MdOutlineCreateNewFolder, MdCameraEnhance } from "react-icons/md"
import { useRef } from "react"
import { baseRequest } from "../../../../../helper/base-request"
import { createToastChakra } from "../../../../../helper/create-toast-chakra"
import * as Yup from "yup"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useRecoilState } from "recoil"
import { admin } from "../../../../../components/user/global-state/admin"

type DataProducts = {
    id: number
    product_class: {
        id: number
        name: string
        is_pasca: boolean
        image: string
        slug: string
    }
    product_categories: {
        id: number
        name: string
        image: string
        tax: number
        slug: string
    }
    sku: string
    name: string
    admin_fee: number
    stock: number
    price: number
    is_active: boolean
}

type DataProductsFormik = {
    id: number
    product_class_id: string
    product_category_id: string
    sku: string
    name: string
    admin_fee: string
    stock: string
    price: string
    is_active: string
}

const EditProducts = () => {

    const toast = useToast()
    const router = useRouter()
    const formRef = useRef<HTMLFormElement>(null)
    const [adminState, setterAdminState] = useRecoilState(admin)
    const [dataProductsFormik, setDataProductsFormik] = useState<DataProductsFormik>()
    const formik = useFormik({
        initialValues:{
            ...dataProductsFormik
        },
        enableReinitialize:true,
        validationSchema: Yup.object({
            sku: Yup.string()
                .min(4, 'isi sku minimal 4 karakter ya')
                .required('isi sku dulu ya'),
            name: Yup.string()
                .min(4, 'isi nama minimal 4 karakter ya')
                .required('isi nama dulu ya'),
            product_class_id: Yup.string()
                .required('isi product class id dulu ya'),
            product_category_id: Yup.string()
                .required('isi product categories id dulu ya'),
            admin_fee: Yup.string()
                .min(3, 'isi admin fee minimal 3 karakter ya')
                .required('isi admin fee dulu ya'),
            stock: Yup.string()
                .min(5, 'isi stock minimal 5 karakter ya')
                .required('isi stock dulu ya'),
            price: Yup.string()
                .min(4, 'isi price minimal 4 karakter ya')
                .required('isi price dulu ya'),
            is_active: Yup.boolean()
                .required('isi is active dulu ya'),
        }),
        onSubmit:async (values)=>{
            const product_class_id = parseInt(values.product_class_id!)
            const product_category_id = parseInt(values.product_category_id!)
            const stock = parseInt(values.stock!)
            const price = parseInt(values.price!)
            const admin_fee = parseInt(values.admin_fee!)
            const is_active = values.is_active === "1" ? true : false
            const response = await baseRequest({
                method:"PUT",
                url:`/products/${router.query.id}`,
                body:{
                    ...values,
                    product_class_id,
                    product_category_id,
                    stock,
                    price,
                    admin_fee,
                    is_active
                },
                token:adminState.data?.token
            })
            createToastChakra({
                response:response,
                router:router,
                toast:toast,
                pathReload:"/admin/crud/products"
            })
        }
    })

    useEffect(()=>{
        const getDataProducts = async ()=>{
            const response = await baseRequest<DataProducts>({
                method:"GET",
                url:`/products/${router.query.id}`
            })
            const { id, sku, name, admin_fee, is_active, price, stock, product_categories, product_class } = response.data
            setDataProductsFormik({
                id,
                sku,
                name,
                admin_fee: admin_fee.toString(),
                is_active: is_active === true ? "1" : "0",
                price: price?.toString(),
                stock: stock.toString(),
                product_category_id: product_categories.id.toString(),
                product_class_id: product_class.id.toString()
            })
        }
        if(router.query.id){
            getDataProducts()
        }
    },[router])

    useEffect(()=>{
        setterAdminState(JSON.parse(localStorage.getItem("admin-persist") || ""))
    },[])

    const { sku, name, admin_fee, stock, price, product_class_id, product_category_id } = formik.values
    const is_active = formik.values.is_active? "1" : "0"

    return(
        <form ref={formRef}>
            <Text as="h2" fontWeight="bold" className="my-text" color="base" fontSize="2xl" mb="10">
                Edit Products
            </Text>
            <FormControl isInvalid={formik.errors.sku && formik.touched.sku ? true : false}>
                <FormLabel htmlFor="sku" textColor="base" mt="3">sku</FormLabel>
                <Input
                    onChange={formik.handleChange} onBlur={formik.handleBlur} id="name" variant='outline'
                    placeholder='ex: TELKOMSEL_5000' shadow="base" size="lg" value={sku} name="sku"
                />
                {
                    <FormErrorMessage>{formik.touched.sku? formik.errors.sku : ""}</FormErrorMessage>
                }
            </FormControl>
            <FormControl isInvalid={formik.errors.name && formik.touched.name ? true : false}>
                <FormLabel htmlFor="name" textColor="base" mt="3">name</FormLabel>
                <Input
                    onChange={formik.handleChange} onBlur={formik.handleBlur} id="name" variant='outline'
                    placeholder='ex: telkomsel Rp.5000' shadow="base" size="lg" value={name} name="name"
                />
                {
                    <FormErrorMessage>{formik.touched.name? formik.errors.name : ""}</FormErrorMessage>
                }
            </FormControl>
            <FormControl isInvalid={formik.errors.product_class_id && formik.touched.product_class_id ? true : false}>
                <FormLabel htmlFor="product_class_id" textColor="base" mt="3">product class id</FormLabel>
                <Input
                    onChange={formik.handleChange} onBlur={formik.handleBlur} id="product_class_id" variant='outline'
                    placeholder='ex: 2' shadow="base" size="lg" value={product_class_id} name="product_class_id"
                />
                {
                    <FormErrorMessage>{formik.touched.product_class_id? formik.errors.product_class_id : ""}</FormErrorMessage>
                }
            </FormControl>
            <FormControl isInvalid={formik.errors.product_category_id && formik.touched.product_category_id ? true : false}>
                <FormLabel htmlFor="product_category_id" textColor="base" mt="3">product categories id</FormLabel>
                <Input
                    onChange={formik.handleChange} onBlur={formik.handleBlur} id="name" variant='outline'
                    placeholder='ex: 3' shadow="base" size="lg" value={product_category_id} name="product_category_id"
                />
                {
                    <FormErrorMessage>{formik.touched.product_category_id? formik.errors.product_category_id : ""}</FormErrorMessage>
                }
            </FormControl>
            <FormControl isInvalid={formik.errors.admin_fee && formik.touched.admin_fee ? true : false}>
                <FormLabel htmlFor="admin_fee" textColor="base" mt="3">admin fee</FormLabel>
                <Input
                    onChange={formik.handleChange} onBlur={formik.handleBlur} id="admin_fee" variant='outline'
                    placeholder='ex: 2000' shadow="base" size="lg" value={admin_fee} name="admin_fee"
                />
                {
                    <FormErrorMessage>{formik.touched.admin_fee? formik.errors.admin_fee : ""}</FormErrorMessage>
                }
            </FormControl>
            <FormControl isInvalid={formik.errors.stock && formik.touched.stock ? true : false}>
                <FormLabel htmlFor="stock" textColor="base" mt="3">stock</FormLabel>
                <Input
                    onChange={formik.handleChange} onBlur={formik.handleBlur} id="stock" variant='outline'
                    placeholder='ex: 200000' shadow="base" size="lg" value={stock} name="stock"
                />
                {
                    <FormErrorMessage>{formik.touched.stock? formik.errors.stock : ""}</FormErrorMessage>
                }
            </FormControl>
            <FormControl isInvalid={formik.errors.price && formik.touched.price ? true : false}>
                <FormLabel htmlFor="price" textColor="base" mt="3">price</FormLabel>
                <Input
                    onChange={formik.handleChange} onBlur={formik.handleBlur} id="price" variant='outline'
                    placeholder='ex: 20000' shadow="base" size="lg" value={price} name="price"
                />
                {
                    <FormErrorMessage>{formik.touched.price? formik.errors.price : ""}</FormErrorMessage>
                }
            </FormControl>
            <FormControl isInvalid={formik.errors.is_active && formik.touched.is_active ? true : false}>
                <FormLabel htmlFor="is_active" textColor="base" mt="3">is active</FormLabel>
                <RadioGroup onChange={formik.handleChange} value={formik.values.is_active} onBlur={formik.handleBlur}>
                    <Stack direction='row'>
                        <Radio
                            onChange={formik.handleChange}
                            value="1" checked={is_active==="1"}
                            onBlur={formik.handleBlur}
                            name="is_active"
                        >
                            true
                        </Radio>
                        <Radio
                            onChange={formik.handleChange}
                            value="0"
                            checked={is_active==="0"}
                            onBlur={formik.handleBlur}
                            name="is_active"
                        >
                            false
                        </Radio>
                    </Stack>
                </RadioGroup>
                {
                    <FormErrorMessage>{formik.touched.is_active? formik.errors.is_active : ""}</FormErrorMessage>
                }
            </FormControl>
            <Button
                fontSize="xs"
                bg="base"
                color="white"
                width="48"
                height="10"
                _hover={{bg:"base"}}
                mt="10"
                display="block"
                ml="auto"
                leftIcon={<MdOutlineCreateNewFolder/>}
                onClick={()=>formik.handleSubmit()}
                >
                    Edit
            </Button>
        </form>
    )
}

export default EditProducts

EditProducts.getLayout = AdminLayout