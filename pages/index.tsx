import type { NextPage } from 'next'
import Head from 'next/head'
import { Text, Button, SimpleGrid } from "@chakra-ui/react"
import Service from "../components/service/service"
import HomeSlider from "../components/home-slider/homeSlider"


const Home: NextPage = () => {
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
            Hi saat ini kamu masih guest lho, masuk ke akun kamu yuk
        </Text>
        <Button
            fontSize="xs"
            bg="base"
            color="white"
            width="full"
            height="10"
            _hover={{bg:"base"}}
            >
                Masuk
        </Button>
        <SimpleGrid columns={3} spacing={5} my="8" px="8">
            <Service title="pulsa" href="/transaction/pulsa" />
            <Service title="token" href="/transaction/token"/>
            <Service title="PDAM" href="/transaction/pdam"/>
        </SimpleGrid>
    </>
  )
}

export default Home
