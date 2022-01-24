import { UserLayout } from "./_app"
import { useFormik } from "formik"
import { Text, FormControl, FormLabel, Input, FormErrorMessage, Button, Textarea, useToast } from "@chakra-ui/react"
import * as Yup from 'yup'
import { useRouter } from "next/router"
import { baseRequest } from "../helper/base-request"
import { createToastChakra } from "../helper/create-toast-chakra"
import { useState } from "react"

const Register = () => {

    const router = useRouter()
    const toast = useToast()
    const [finishedRegister, setFinishedRegister] = useState(false)
    const formik = useFormik({
        initialValues:{
            name:"",
            email:"",
            handphone:"",
            address:"",
            password:"",
            repassword:""
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(10, 'isi nama minimal 10 karakter ya')
                .required('isi nama dulu ya'),
            email: Yup.string()
                .min(10, 'isi email minimal 10 karakter ya')
                .email('isi email ya')
                .required('isi email dulu ya'),
            handphone: Yup.string()
                .min(10, 'isi handphone minimal 10 karakter ya')
                .required('isi handphone dulu ya'),
            address: Yup.string()
                .min(10, 'isi alamat minimal 10 karakter ya')
                .required('isi alamat dulu ya'),
            password: Yup.string()
                .min(10, 'isi password minimal 10 karakter ya')
                .required('isi password dulu ya'),
            repassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'harus sama dengan password ya')
                .required('isi konfirmasi password dulu ya')
        }),
        onSubmit:async (values)=>{
            const response = await baseRequest({
                url:"/users",
                method:"POST",
                body:values
            })
            createToastChakra({
                response:response,
                router:router,
                toast:toast
            })
            setFinishedRegister(true)
        }
    })

    const {name, email, handphone, address, password, repassword} = formik.values

    if(finishedRegister){
        return(
            <>
                <Text
                    as="h2"
                    className="my-text"
                    color="base"
                    fontWeight="bold"
                    fontSize="4xl"
                    textAlign="center"
                    mt="20"
                >
                    BERHASIL
                </Text>
                <Text
                    className="my-text"
                    textAlign="center"
                    color="base"
                >
                    verifikasi email sudah dikirim ke <b>{email}</b> silakan di cek ya
                </Text>
            </>
        )
    }

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
                DAFTAR
            </Text>
            <FormControl isInvalid={formik.errors.name && formik.touched.name ? true : false}>
                <FormLabel htmlFor="name" textColor="base" mt="3">nama lengkap</FormLabel>
                <Input
                    onChange={formik.handleChange} onBlur={formik.handleBlur} id="name" variant='outline'
                    placeholder='ex: budi santoso' shadow="base" size="lg" value={name} name="name"
                />
                {
                    <FormErrorMessage>{formik.touched.name? formik.errors.name : ""}</FormErrorMessage>
                }
            </FormControl>
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
            <FormControl isInvalid={formik.errors.handphone && formik.touched.handphone ? true : false}>
                <FormLabel htmlFor="handphone" textColor="base" mt="3">handphone</FormLabel>
                <Input
                    onChange={formik.handleChange} onBlur={formik.handleBlur} id="handphone" variant='outline'
                    placeholder='0822xxx' shadow="base" size="lg" value={handphone} name="handphone"
                />
                {
                    <FormErrorMessage>{formik.touched.handphone? formik.errors.handphone : ""}</FormErrorMessage>
                }
            </FormControl>
            <FormControl isInvalid={formik.errors.address && formik.touched.address ? true : false}>
                <FormLabel htmlFor="address" textColor="base" mt="3">alamat</FormLabel>
                <Textarea
                    onChange={formik.handleChange} onBlur={formik.handleBlur} id="address" variant='outline'
                    placeholder='surabaya...' shadow="base" size="lg" value={address} name="address"
                />
                {
                    <FormErrorMessage>{formik.touched.address? formik.errors.address : ""}</FormErrorMessage>
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
            <FormControl isInvalid={formik.errors.repassword && formik.touched.repassword ? true : false}>
                <FormLabel htmlFor="repassword" textColor="base" mt="3">konfirmasi password</FormLabel>
                <Input
                    onChange={formik.handleChange} onBlur={formik.handleBlur} id="repassword" variant='outline'
                    placeholder='user123xxx' shadow="base" size="lg" value={repassword} name="repassword" type="password"
                />
                {
                    <FormErrorMessage>{formik.touched.repassword? formik.errors.repassword : ""}</FormErrorMessage>
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
                Daftar
            </Button>
        </>
    )
}

export default Register

Register.getLayout = UserLayout