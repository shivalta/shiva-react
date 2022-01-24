import { BaseResponse } from "./base-request"
import { NextRouter } from "next/router"

type ParamsUseToastChakra = {
    response: BaseResponse
    path?: string
    toast: any
    router: NextRouter
}

export const createToastChakra = (params:ParamsUseToastChakra)=>{
    const { response, path, toast, router } = params

    if(response.status === "success"){
        toast({
            title: response.status,
            description: response.message,
            status: response.status,
            duration:2000,
            position: 'top',
        })
        if(path){
            setTimeout(()=>{
                router.push(path)
            },2000)
        }
    }
    else{
        toast({
            title: response.status,
            description: response.message,
            status: response.status,
            duration:2000,
            position: 'top',
        })
    }
}