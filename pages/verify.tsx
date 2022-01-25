import { useRouter } from "next/router"
import { useEffect } from "react"
import { baseRequest } from "../helper/base-request"
import { useToast, Text } from "@chakra-ui/react"
import { UserLayout } from "./_app"
import { createToastChakra } from "../helper/create-toast-chakra"

const Verify = ()=>{
    const router = useRouter()
    const toast = useToast()
    const { query } = router

    useEffect(()=>{
        if(query.u){
            const verifyEmail = async () => {
                const response = await baseRequest({
                    url:"/verify",
                    method:"POST",
                    body:{
                        u:query.u,
                        v:query.v
                    }
                })
                createToastChakra({
                    pathReload:"/login",
                    response:response,
                    router:router,
                    toast:toast
                })
            }
            verifyEmail()
        }
    })

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
                SEBENTAR YA
            </Text>
            <Text
                className="my-text"
                textAlign="center"
                color="base"
            >
                kami sedang memverifikasi email kamu
            </Text>
        </>
    )
}

export default Verify

Verify.getLayout = UserLayout