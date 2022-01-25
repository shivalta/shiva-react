import { ChakraProvider, extendTheme, Flex, Box, Text, Button } from '@chakra-ui/react'
import { MdProductionQuantityLimits } from 'react-icons/md'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import '../styles/globals.css'
import BackNav from '../components/user/general/back-nav/back-nav'
import BlackScreen from '../components/user/general/black-screen/black-screen'
import Image from 'next/image'
import { NextPage } from 'next'
import { ReactElement, ReactNode,useEffect,useState } from 'react'
import shivaLogo from '../public/images/shiva.png'
import Navigator from '../components/user/general/navigator/navigator'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export const UserLayout = (page: ReactElement) => {

  return(
    <Flex
      alignItems="center"
      flexDirection="column"
      width="full"
      bg="blue.100"
    >
    <Box
      maxWidth="480px"
      width="full"
      minHeight='100vh'
      bg='white'
      p='6'
      pb="36"
      >
        <Flex>
          <Box height="8" width="8" position="relative" borderRadius="md" overflow="hidden" mr="2">
            <Image src={shivaLogo} alt="shiva-logo" layout="fill" />
          </Box>
          <Text
              as="h1"
              fontSize="xl"
              color="base"
              className="my-text-2"
              fontWeight="bold"
          >
              SHIVA
          </Text>
        </Flex>
        <BackNav/>
        <BlackScreen/>
        {page}
        <Navigator/>
      </Box>
    </Flex>
  )
}

export const AdminLayout = (page: ReactElement) => {

  type ListKeyCRUD = {
    [key:string]:number
  }

  const listKeyCRUD:ListKeyCRUD = {
    "products":0,
    "product-class":1,
    "product-categories":2
  }

  const router = useRouter()
  const { asPath } = router
  const [activeCRUD, setActiveCRUD] = useState(listKeyCRUD[asPath.slice(12)])
  const listCRUD = [
    {
      path:"products",
      name:"products",
      key:0
    },
    {
      path:"product-class",
      name:"product class",
      key:1
    },
    {
      path:"product-categories",
      name:"product categories",
      key:2
    }
  ]

  useEffect(()=>{
    setActiveCRUD(listKeyCRUD[asPath.slice(12)])
  },[asPath])

  return(
    <Flex>
      <Box width="300px" minHeight="100vh" background="base" py="10" px="4">
        <Box position="sticky" top="10">
          <Text
            as="h1"
            fontSize="xl"
            color="white"
            className="my-text-2"
            fontWeight="bold"
            mb="10"
          >
            SHIVA ADMIN
          </Text>
          {
            listCRUD.map(({path,name,key})=>{
              return(
                <Link href={`/admin/crud/${path}`} passHref key={`crud-${key}`}>
                  <Button
                      as="a"
                      colorScheme={activeCRUD === key ? "gray" : ""}
                      className="my-text"
                      width="full"
                      justifyContent="flex-start"
                      textTransform="capitalize"
                      fontWeight="bold"
                      leftIcon={<MdProductionQuantityLimits/>}
                      my="2"
                  >
                          {name}
                  </Button>
                </Link>
              )
            })
          }
        </Box>
      </Box>
      <Box width="calc(100% - 300px)" p="10">
        {page}
      </Box>
    </Flex>
  )
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const theme = extendTheme({
    config: {
      cssVarPrefix: 'shiva',
    },
    colors: {
      base: '#0007B0',
      base_second: '#FA591D',
      base_admin:"#11CBE1"
    },
    radii: {
      navigator: "40px"
    },
    shadows: {
      navigator: "0px 5px 20px rgba(0, 0, 0, 0.25)"
    },
    sizes: {
      "0.1": "0.005rem"
    },
    styles:{
      global: (props:any) => ({
        '.my-text': {
          fontFamily: 'Nunito'
        },
        '.my-text-2': {
          fontFamily: 'Montserrat'
        }
      })
    }
  })

  const getLayout = Component.getLayout ?? ((page) => page)
  const page = getLayout(<Component {...pageProps} />)

  return (
      <ChakraProvider theme={theme}>
        <Head>
          <title>Shiva | Solusi Pembayaran Masa Kini</title>
          <meta name="description" content="Shiva" />
          <link rel="icon" href="/images/shiva.png" />
        </Head>
        <RecoilRoot>
          {page}
        </RecoilRoot>
      </ChakraProvider>
  )
}

export default MyApp
