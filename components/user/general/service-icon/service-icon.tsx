import { Flex,Text } from "@chakra-ui/react"
import Image from "next/image"
import Link from 'next/link'
import { FlexProps } from '@chakra-ui/react'
import { useEffect, useState } from "react"
import { baseRequest } from "../../../../helper/base-request"

type PropsService = {
    setting?: FlexProps
    title: string
    href?: string
    image?: string
}

type ServiceData = {
    id: string
    name: string
    is_pasca: boolean
    image: string
    slug: string
  }

const ServiceIcon = (props:PropsService)=> {

    const [urlImage, setUrlImage] = useState<string>()
    const {setting, title, href, image} = props

    useEffect(()=>{
        const getUrlImage = async () => {
            const response = await baseRequest<ServiceData[]>({
                method:"GET",
                url:`/class?search=${title}&key=name`
            })
            setUrlImage(response.data[0].image)
        }
        getUrlImage()
    },[])

    let currentUrlImage = ""
    if(image){
        currentUrlImage = image
    }else if(urlImage){
        currentUrlImage = urlImage
    }

    if(currentUrlImage === ""){
        return null
    }

    return(
        <Link href={href || ""} passHref>
            <Flex as="a" width="full" height="20" justifyContent="center" {...setting}>
                <Flex flexDirection="column" alignItems="center" width="24" p="3" height="24" borderRadius="lg" shadow="base">
                    <Image src={currentUrlImage} alt={title} height={70} width={40} />
                    <Text className="my-text" color="base" fontWeight="bold" textAlign="center" mt="2">{title}</Text>
                </Flex>
            </Flex>
        </Link>
    )
}

export default ServiceIcon