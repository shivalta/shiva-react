import { Flex,Box,Text } from "@chakra-ui/react"
import Image from "next/image"
import pulsaPicture from "../../public/images/phone-call.png"
import Link from 'next/link'
import { FlexProps } from '@chakra-ui/react'

type PropsService = {
    setting?: FlexProps
    title: string
    href?: string
}

const Service = (props:PropsService)=> {

    const {setting, title, href} = props

    return(
        <Link href={href || ""} passHref>
            <Flex as="a" width="full" height="28" justifyContent="center" {...setting}>
                <Box width="20" p="3" height="20" borderRadius="lg" shadow="base">
                    <Image src={pulsaPicture} alt="pulsa" />
                    <Text className="my-text" color="base" fontWeight="bold" textAlign="center" my="2">{title}</Text>
                </Box>
            </Flex>
        </Link>
    )
}

export default Service