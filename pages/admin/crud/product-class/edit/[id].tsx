import { useFormik } from "formik"
import { FormControl, FormLabel, Input, FormErrorMessage,
         Text, RadioGroup, Radio, Stack, Button, useToast, Flex } from "@chakra-ui/react"
import { AdminLayout } from "../../../../_app"
import { MdOutlineCreateNewFolder, MdCameraEnhance } from "react-icons/md"
import { useEffect, useRef, useState } from "react"
import { baseRequest } from "../../../../../helper/base-request"
import { createToastChakra } from "../../../../../helper/create-toast-chakra"
import * as Yup from "yup"
import { useRouter } from "next/router"

type DataProductClass = {
    id: number
    name: string
    is_pasca: string
    image: string
}

const EditProductClass = ()=>{

    const hiddenImageInput = useRef<HTMLInputElement>(null)
    const toast = useToast()
    const router = useRouter()
    const formRef = useRef<HTMLFormElement>(null)
    const [dataProductClass, setDataProductClass] = useState<DataProductClass>()
    const formik = useFormik({
        initialValues:{
            image:"",
            ...dataProductClass,
        },
        enableReinitialize:true,
        validationSchema: Yup.object({
            name: Yup.string()
                .min(5, 'isi nama minimal 5 karakter ya')
                .required('isi nama dulu ya'),
            is_pasca: Yup.boolean()
                .required('isi is_pasca dulu ya'),
            image: Yup.mixed().required("isi gambar dulu ya")
        }),
        onSubmit:async ()=>{
            const formData = new FormData(formRef.current!)
            const response = await baseRequest({
                method:"PUT",
                url:`/class/${router.query.id}`,
                acceptType:"form-data",
                body:formData
            })
            createToastChakra({
                response:response,
                router:router,
                toast:toast,
                path:"/admin/crud/product-class"
            })
        }
    })

    const handleClickUploadImage = () => {
        hiddenImageInput.current?.click()
    }

    const handleChangeUploadImage = () => {
        formik.setFieldValue("image", hiddenImageInput.current?.files)
    }

    useEffect(()=>{
        const getDataProductClass = async ()=>{
            const response = await baseRequest<DataProductClass>({
                method:"GET",
                url:`/class/${router.query.id}`
            })
            const is_pasca = response.data.is_pasca? "1" : "0"
            const dataResponse = {
                ...response.data,
                is_pasca
            }
            setDataProductClass(dataResponse)
        }
        if(router.query.id){
            getDataProductClass()
        }
    },[router])

    const { name, is_pasca } = formik.values

    return(
        <form ref={formRef}>
            <Text as="h2" fontWeight="bold" className="my-text" color="base" fontSize="2xl" mb="10">
                Create New Product Class
            </Text>
            <FormControl isInvalid={formik.errors.name && formik.touched.name ? true : false}>
                <FormLabel htmlFor="name" textColor="base" mt="3">name</FormLabel>
                <Input
                    onChange={formik.handleChange} onBlur={formik.handleBlur} id="name" variant='outline'
                    placeholder='ex: pulsa' shadow="base" size="lg" value={name} name="name"
                />
                {
                    <FormErrorMessage>{formik.touched.name? formik.errors.name : ""}</FormErrorMessage>
                }
            </FormControl>
            <FormControl isInvalid={formik.errors.is_pasca && formik.touched.is_pasca ? true : false}>
                <FormLabel htmlFor="name" textColor="base" mt="3">is pasca</FormLabel>
                <RadioGroup onChange={formik.handleChange} value={formik.values.is_pasca} onBlur={formik.handleBlur}>
                    <Stack direction='row'>
                        <Radio
                            onChange={formik.handleChange}
                            value="1" checked={is_pasca==="1"}
                            onBlur={formik.handleBlur}
                            name="is_pasca"
                        >
                            true
                        </Radio>
                        <Radio
                            onChange={formik.handleChange}
                            value="0"
                            checked={is_pasca==="0"}
                            onBlur={formik.handleBlur}
                            name="is_pasca"
                        >
                            false
                        </Radio>
                    </Stack>
                </RadioGroup>
                {
                    <FormErrorMessage>{formik.touched.is_pasca? formik.errors.is_pasca : ""}</FormErrorMessage>
                }
            </FormControl>
            <FormControl isInvalid={formik.errors.image && formik.touched.image ? true : false}>
                <FormLabel htmlFor="name" textColor="base" mt="3">image</FormLabel>
                <Flex alignItems="center">
                    <Button
                        fontSize="xs"
                        bg="base_second"
                        color="white"
                        width="32"
                        height="10"
                        _hover={{bg:"base_second"}}
                        leftIcon={<MdCameraEnhance/>}
                        onClick={handleClickUploadImage}
                        >
                        upload image
                    </Button>
                    <Text ml="2">{formik.values.image[0]?.name || ""}</Text>
                </Flex>
                <Input id="input-image" onChange={handleChangeUploadImage} type="file" name="image" accept="image/*" ref={hiddenImageInput} hidden/>
                {
                    <FormErrorMessage>{formik.touched.image? formik.errors.image : ""}</FormErrorMessage>
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
                    Create
            </Button>
        </form>
    )
}

export default EditProductClass

EditProductClass.getLayout = AdminLayout