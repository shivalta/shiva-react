import { Text, FormControl, FormLabel, Input, FormErrorMessage, Button, Textarea, useToast } from "@chakra-ui/react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { UserLayout } from "../_app"
import { BaseResponse, baseRequest } from "../../helper/base-request"
import { useState, useEffect } from "react"
import { createToastChakra } from "../../helper/create-toast-chakra"
import { User } from "../../components/user/global-state/user"
import BeforeLogin from "../../components/user/general/before-login/before-login"
import { useRouter } from "next/router"

type DataUser = {
    id: number
    name: string
    email: string
    handphone: string
    address: string
}

const EditProfile = ()=>{

    const router = useRouter()
    const toast = useToast()
    const [dataUser, setDataUser] = useState<BaseResponse<DataUser>>() // data user from api
    const [userPersisted, setUserPersisted] = useState<User | null>() //data user from local storage
    const formik = useFormik({
        initialValues:{
            ...dataUser?.data,
            password:"",
            repassword:""
        },
        enableReinitialize:true,
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
                .min(10, 'isi password minimal 10 karakter ya'),
            repassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'harus sama dengan password ya')
        }),
        onSubmit:async (values)=>{
            const response = await baseRequest({
                url:`users/${userPersisted?.data?.user.id}`,
                method:"PUT",
                body:values
            })
            createToastChakra({
                response:response,
                path:"/profile",
                router:router,
                toast:toast
            })
        }
    })

    useEffect(()=>{
        if(localStorage.getItem("user-persist")){
          setUserPersisted(JSON.parse(localStorage.getItem("user-persist") || ""))
        }else{
            setUserPersisted(null)
        }
    },[])

    useEffect(()=>{
        const getDataUser = async () =>{
            const userPersisted = JSON.parse(localStorage.getItem("user-persist") || "")
            const dataUser = await baseRequest<DataUser>({
                url:`users/${userPersisted?.data?.user.id}`,
                method:"GET",
            })
            setDataUser(dataUser)
        }
        getDataUser()
    },[])

    if(userPersisted === null){
        return <BeforeLogin/>
    }

    if(dataUser === undefined){
        return null
    }

    if(dataUser.status === "error"){
        return <BeforeLogin/>
    }

    const {name, email, handphone, address, password, repassword} = formik.values

    return(
        <>
            <Text
                as="h2"
                className="my-text-2"
                textAlign="center"
                color="base"
                fontWeight="bold"
                mt="20"
                mb="10"
            >
                Profil
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
                <FormLabel htmlFor="password" textColor="base" mt="3">password baru</FormLabel>
                <Input
                    onChange={formik.handleChange} onBlur={formik.handleBlur} id="password" variant='outline'
                    placeholder='user123xxx' shadow="base" size="lg" value={password} name="password" type="password"
                />
                {
                    <FormErrorMessage>{formik.touched.password? formik.errors.password : ""}</FormErrorMessage>
                }
            </FormControl>
            <FormControl isInvalid={formik.errors.repassword && formik.touched.repassword ? true : false}>
                <FormLabel htmlFor="repassword" textColor="base" mt="3">konfirmasi password baru</FormLabel>
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
                Edit Profil
            </Button>
        </>
    )
}

export default EditProfile

EditProfile.getLayout = UserLayout