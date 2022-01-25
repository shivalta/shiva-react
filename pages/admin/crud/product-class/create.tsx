import { useFormik } from "formik"
import { FormControl, FormLabel, Input, FormErrorMessage,
         Text, RadioGroup, Radio, Stack, Button, useToast, Flex } from "@chakra-ui/react"
import { AdminLayout } from "../../../_app"
import { MdOutlineCreateNewFolder, MdCameraEnhance } from "react-icons/md"
import { useRef } from "react"
import { baseRequest } from "../../../../helper/base-request"
import { createToastChakra } from "../../../../helper/create-toast-chakra"
import * as Yup from "yup"
import { useRouter } from "next/router"

const CreateProductClass = () => {

    const imageInputRef = useRef<HTMLInputElement>(null)
    const imageInputFiles:FileList = imageInputRef.current?.files!
    const toast = useToast()
    const router = useRouter()
    const formRef = useRef<HTMLFormElement>(null)
    const formik = useFormik({
        initialValues:{
            name:"",
            is_pasca:"",
            image:"",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(4, 'isi nama minimal 4 karakter ya')
                .required('isi nama dulu ya'),
            is_pasca: Yup.boolean()
                .required('isi is_pasca dulu ya'),
            image: Yup.mixed().required("isi gambar dulu ya")
        }),
        onSubmit:async ()=>{
            const formData = new FormData(formRef.current!)
            const response = await baseRequest({
                method:"POST",
                url:"/class",
                acceptType:"form-data",
                body:formData
            })
            createToastChakra({
                response:response,
                router:router,
                toast:toast,
                pathReload:"/admin/crud/product-class"
            })
        }
    })

    const handleClickUploadImage = () => {
        imageInputRef.current?.click()
    }

    const handleChangeUploadImage = () => {
        formik.setFieldValue("image", imageInputRef.current?.files)
    }

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

export default CreateProductClass

CreateProductClass.getLayout = AdminLayout