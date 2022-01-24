import { Method } from "axios"
import axios from "axios"

type ParamsBaseRequest = {
    url:string
    body?:object
    method:Method
    token?:string
    acceptType?: "form-data"
}

export type BaseResponse<T> = {
    status: "success" | "error"
    data: T
    message: string
}

const BASE_URL_API = "http://ec2-3-145-217-17.us-east-2.compute.amazonaws.com:1111/api/v1/"

export const baseRequest = async <T>(params:ParamsBaseRequest) : Promise<BaseResponse<T>> => {

    const { url, body, method, token, acceptType } = params

    const configHeaders = {
        "json":{
            'Accept': 'application/json',
            'Content-type': 'application/json',
            // 'Access-Control-Allow-Origin': "*"
        },
        "form-data":{
            "Content-Type": "multipart/form-data"
        }
    }

    let headers:any = {}

    if(acceptType){
        headers=configHeaders[acceptType]
    }else{
        headers=configHeaders["json"]
    }

    if(token){
        headers['Authorization'] = `Bearer ${token}`
    }

    const response = await axios({
            headers:headers,
            baseURL:BASE_URL_API,
            method: method,
            url: url,
            data: body
    })
    .then((succesResponse) => {
        return succesResponse.data
    })
    .catch((errorResponse) => {
        return errorResponse
    })

    return response
}