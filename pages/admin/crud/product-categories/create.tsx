import { useFormik } from "formik"
import { FormControl, FormLabel, Input, FormErrorMessage,
         Text, Button, useToast, Flex } from "@chakra-ui/react"
import { AdminLayout } from "../../../_app"
import { MdOutlineCreateNewFolder, MdCameraEnhance } from "react-icons/md"
import { useRef, useEffect } from "react"
import { baseRequest } from "../../../../helper/base-request"
import { createToastChakra } from "../../../../helper/create-toast-chakra"
import * as Yup from "yup"
import { useRouter } from "next/router"
import { useRecoilState } from "recoil"
import { admin } from "../../../../components/user/global-state/admin"

const CreateProductCategories = () => {

    const imageInputRef = useRef<HTMLInputElement>(null)
    const imageInputFiles:FileList = imageInputRef.current?.files!
    const [adminState, setterAdminState] = useRecoilState(admin)
    const toast = useToast()
    const router = useRouter()
    const formRef = useRef<HTMLFormElement>(null)
    const formik = useFormik({
        initialValues:{
            name:"",
            product_class_id:"",
            image:"",
            tax:""
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(4, 'isi nama minimal 4 karakter ya')
                .required('isi nama dulu ya'),
            product_class_id: Yup.string()
                .required('isi product class id dulu ya'),
            image: Yup.mixed()
                .required("isi gambar dulu ya"),
            tax: Yup.string()
                .min(1, 'isi tax minimal 1 karakter ya')
                .required('isi tax dulu ya'),
        }),
        onSubmit:async ()=>{
            const formData = new FormData(formRef.current!)
            const response = await baseRequest({
                method:"POST",
                url:"/categories",
                acceptType:"form-data",
                body:formData,
                token:adminState.data?.token
            })
            createToastChakra({
                response:response,
                router:router,
                toast:toast,
                pathReload:"/admin/crud/product-categories"
            })
        }
    })

    const handleClickUploadImage = () => {
        imageInputRef.current?.click()
    }

    const handleChangeUploadImage = () => {
        formik.setFieldValue("image", imageInputRef.current?.files)
    }

    useEffect(()=>{
        setterAdminState(JSON.parse(localStorage.getItem("admin-persist") || ""))
    },[])

    const { name, product_class_id, tax } = formik.values

    return(
        <form ref={formRef}>
            <Text as="h2" fontWeight="bold" className="my-text" color="base" fontSize="2xl" mb="10">
                Create New Product Categories
            </Text>
            <FormControl isInvalid={formik.errors.name && formik.touched.name ? true : false}>
                <FormLabel htmlFor="name" textColor="base" mt="3">name</FormLabel>
                <Input
                    onChange={formik.handleChange} onBlur={formik.handleBlur} id="name" variant='outline'
                    placeholder='ex: telkomsel' shadow="base" size="lg" value={name} name="name"
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
            <FormControl isInvalid={formik.errors.tax && formik.touched.tax ? true : false}>
                <FormLabel htmlFor="tax" textColor="base" mt="3">tax</FormLabel>
                <Input
                    onChange={formik.handleChange} onBlur={formik.handleBlur} id="tax" variant='outline'
                    placeholder='ex: 5 (in percent)' shadow="base" size="lg" value={tax} name="tax"
                />
                {
                    <FormErrorMessage>{formik.touched.tax? formik.errors.tax : ""}</FormErrorMessage>
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
                    <Text ml="2">{}</Text>
                </Flex>
                <Input id="input-image" onChange={handleChangeUploadImage} type="file" name="image" accept="image/*" ref={imageInputRef} hidden/>
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

export default CreateProductCategories

CreateProductCategories.getLayout = AdminLayout