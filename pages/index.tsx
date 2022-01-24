import Head from 'next/head'
import { Text, Button, SimpleGrid } from "@chakra-ui/react"
import Service from "../components/user/general/service-icon/service-icon"
import HomeSlider from "../components/user/home-slider/home-slider"
import { MdOutlineLogin } from "react-icons/md"
import { UserLayout } from './_app'
import { User } from '../components/user/global-state/user'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Home = () => {

  const [userPersisted, setUserPersisted] = useState<User>()


  useEffect(()=>{
    if(localStorage.getItem("user-persist")){
      setUserPersisted(JSON.parse(localStorage.getItem("user-persist") || ""))
    }
  },[])

  return (
    <>
      <Head>
        <title>Shiva | Solusi Pembayaran Masa Kini</title>
        <meta name="description" content="Shiva" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
            <Service title="pulsa" href="/transaction/pulsa" />
            <Service title="token" href="/transaction/token"/>
            <Service title="pdam" href="/transaction/pdam"/>
        </SimpleGrid>
    </>
  )
}

export default Home

Home.getLayout = UserLayout
