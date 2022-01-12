import { UserLayout } from "./_app"
import { useFormik } from "formik"
import { Text, FormControl, FormLabel, Input, FormErrorMessage, Button } from "@chakra-ui/react"
import * as Yup from 'yup';
import { useRouter } from "next/router"

const Register = () => {

    const router = useRouter()
    const formik = useFormik({
        initialValues:{
            name:"",
            email:"",
            handphone:"",
            password:""
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
            password: Yup.string()
                .min(10, 'isi password minimal 10 karakter ya')
                .required('isi password dulu ya'),
        }),
        onSubmit:(values)=>{
            router.push("/login")
        }
    })

    const {name, email, handphone, password} = formik.values

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
            <FormControl isInvalid={formik.errors.password && formik.touched.password ? true : false}>
                <FormLabel htmlFor="password" textColor="base" mt="3">Password</FormLabel>
                <Input
                    onChange={formik.handleChange} onBlur={formik.handleBlur} id="email" variant='outline'
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
                Daftar
            </Button>
        </>
    )
}

export default Register

Register.getLayout = UserLayout