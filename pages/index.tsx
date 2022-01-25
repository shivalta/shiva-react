import Head from 'next/head'
import { Text, Button, SimpleGrid } from "@chakra-ui/react"
import Service from "../components/user/general/service-icon/service-icon"
import HomeSlider from "../components/user/home-slider/home-slider"
import { MdOutlineLogin } from "react-icons/md"
import { UserLayout } from './_app'
import { User } from '../components/user/global-state/user'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { baseRequest } from '../helper/base-request'

type ServiceData = {
  id: string
  name: string
  is_pasca: boolean
  image: string
  slug: string
}

const Home = () => {

  const [userPersisted, setUserPersisted] = useState<User>()
  const [serviceData, setServiceData] = useState<ServiceData[]>()

  useEffect(()=>{
    const getServiceData = async () => {
      const response = await baseRequest<ServiceData[]>({
        method:"GET",
        url:"/class",
      })
      setServiceData(response.data)
    }
    if(localStorage.getItem("user-persist")){
      setUserPersisted(JSON.parse(localStorage.getItem("user-persist") || ""))
    }
    getServiceData()
  },[])

  return (
    <>
        <HomeSlider />
        <Text
            color="base"
            maxW="64"
            className="my-text"
            mt="8"
            mb="5"
            fontWeight="bold"
            fontSize="md"
        >
            {
              userPersisted?.data?
              `Hi ${userPersisted.data?.user.name} mau bayar apa kamu hari ini?`
              :
              "Hi saat ini kamu masih guest lho, masuk ke akun kamu yuk"
            }
        </Text>
        {
          userPersisted?.data? null :
            <Link href="/login" passHref>
              <Button
                  fontSize="xs"
                  bg="base"
                  color="white"
                  width="full"
                  height="10"
                  _hover={{bg:"base"}}
                  as="a"
                  leftIcon={<MdOutlineLogin/>}
                  >
                      Masuk
              </Button>
            </Link>
        }

        <SimpleGrid columns={3} spacing={5} my="8" px="8">
          {
            serviceData?.map(({ id, name, image })=>(
              <Service key={`service-${id}`} title={name} href={`/transaction/${name}`} image={image} />
            ))
          }
        </SimpleGrid>
    </>
  )
}

export default Home

Home.getLayout = UserLayout
