import { UserLayout } from "./_app"
import { useFormik } from "formik"
import { Text, FormControl, FormLabel, Input, FormErrorMessage, Button } from "@chakra-ui/react"
import * as Yup from 'yup';
import { useRouter } from "next/router"
import Link from "next/link";
import { useRecoilState } from "recoil";
import { user } from "../components/global-state/user";
import { useEffect } from "react";

const Login = () => {

    const router = useRouter()
    const [userState, setterUserState] = useRecoilState(user)
    const formik = useFormik({
        initialValues:{
            email:"",
            password:"",
            afterLogin:""
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
        onSubmit:(values)=>{
            // hit api for check token validity
            setterUserState({
                ...userState,
                valid:true
            })
            if(values.afterLogin){
                router.push(values.afterLogin)
            }else{
                router.push("/")
            }
        }
    })

    useEffect(()=>{
        formik.setFieldValue("afterLogin", userState.afterLogin)
    },[userState])

    const {email, password} = formik.values

    return(
        <>
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
                onClick={(e)=>{
                    formik.handleSubmit()
                }}
            >
                Masuk
            </Button>
            <Text
                className="my-text"
                fontSize="sm"
                textAlign="center"
                color="gray.500"
                fontWeight="semibold"
            >
                belum punya akun?
                <Link href="/register" passHref>
                    <Text as="a" color="base"> daftar</Text>
                </Link>
            </Text>
        </>
    )
}

export default Login

Login.getLayout = UserLayout