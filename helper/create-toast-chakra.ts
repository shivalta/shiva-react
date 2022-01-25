import { BaseResponse } from "./base-request"
import { NextRouter } from "next/router"

type ParamsUseToastChakra = {
    response: BaseResponse<any>
    pathReload?: string
    isReload?: boolean
    toast: any
    router: NextRouter
}

export const createToastChakra = (params:ParamsUseToastChakra)=>{
    const { response, pathReload, toast, router, isReload } = params

    if(response.status === "success"){
        toast({
            title: response.status,
            description: response.message,
            status: response.status,
            duration:2000,
            position: 'top',
        })
        if(pathReload){
            setTimeout(()=>{
                router.push(pathReload)
            },2000)
        }else if(isReload){
            router.reload()
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