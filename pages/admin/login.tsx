import { Flex, Box, Text, FormControl, FormLabel, Input, FormErrorMessage, Button, useToast } from "@chakra-ui/react"
import Image from "next/image"
import CityImage from "../../public/images/city.jpg"
import { MdOutlineLogin } from "react-icons/md"
import { useRouter } from "next/router"
import { useFormik } from "formik"
import { useRecoilState } from "recoil"
import * as Yup from "yup"
import { createToastChakra } from "../../helper/create-toast-chakra"
import { useEffect } from "react"
import { admin, ResponseDataAdmin } from "../../components/user/global-state/admin"
import { baseRequest } from "../../helper/base-request"

const LoginAdmin = () => {

    const router = useRouter()
    const [adminState, setterAdminState] = useRecoilState(admin)
    const toast = useToast()
    const formik = useFormik({
        initialValues:{
            email:"",
            password:"",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .min(10, 'isi email minimal 10 karakter ya')
                .email('isi email ya')
                .required('isi email dulu ya'),
            password: Yup.string()
                .min(10, 'isi password minimal 10 karakter ya')
                .required('isi password dulu ya'),
            afterLogin: Yup.string()
        }),
        onSubmit:async (values)=>{
            const response = await baseRequest<ResponseDataAdmin>({
                url:"/auth/login",
                method:"POST",
                body:{
                    email: values.email,
                    password: values.password
                }
            })
            if(response.status === "success"){
                setterAdminState({
                    ...adminState,
                    data:response.data,
                    valid:true
                })
                router.push("/admin/crud/products")
            }
            else{
                createToastChakra({
                    response:response,
                    router:router,
                    toast: toast
                })
            }
        }
    })

    useEffect(()=>{
        localStorage.setItem("admin-persist", JSON.stringify(adminState))
    },[adminState])

    const { email, password } = formik.values

    return(
        <Flex>
            <Box width="800px" minHeight="100vh" py="10" px="4" position="relative">
                <Image src={CityImage} layout="fill" alt="city-image"/>
            </Box>
            <Box width="calc(100% - 800px)" p="10">
                <Text
                    as="h2"
                    className="my-text-2"
                    textAlign="center"
                    color="base"
                    fontWeight="bold"
                    fontSize="xl"
                    mt="20"
                    mb="10"
                >
                    MASUK
                </Text>
                <FormControl isInvalid={formik.errors.email && formik.touched.email ? true : false}>
                    <FormLabel htmlFor="email" textColor="base" mt="3">email</FormLabel>
                    <Input
                        onChange={formik.handleChange} onBlur={formik.handleBlur} id="email" variant='outline'
                        placeholder='user@gmail.com' shadow="base" size="lg" value={email} name="email"
                    />
                    {
                        <FormErrorMessage>{formik.touched.email? formik.errors.email : ""}</FormErrorMessage>
                    }
                </FormControl>
                <FormControl isInvalid={formik.errors.password && formik.touched.password ? true : false}>
                    <FormLabel htmlFor="password" textColor="base" mt="3">password</FormLabel>
                    <Input
                        onChange={formik.handleChange} onBlur={formik.handleBlur} id="password" variant='outline'
                        placeholder='user123xxx' shadow="base" size="lg" value={password} name="password" type="password"
                    />
                    {
                        <FormErrorMessage>{formik.touched.password? formik.errors.password : ""}</FormErrorMessage>
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
                    leftIcon={<MdOutlineLogin/>}
                    onClick={(e)=>{
                        formik.handleSubmit()
                    }}
                >
                    Masuk
                </Button>
            </Box>
        </Flex>
    )
}

export default LoginAdmin