import { ChakraProvider, extendTheme, Flex, Box, Text } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import '../styles/globals.css'
import BackNav from '../components/user/general/back-nav/back-nav'
import BlackScreen from '../components/user/general/black-screen/black-screen'
import Image from 'next/image'
import { NextPage } from 'next'
import React, { ReactElement, ReactNode } from 'react'
import shivaLogo from '../public/images/shiva.png'
import Navigator from '../components/user/general/navigator/navigator'

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

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const theme = extendTheme({
    config: {
      cssVarPrefix: 'shiva',
    },
    colors: {
      base: '#0007B0',
      base_second: '#FA591D'
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
      <RecoilRoot>
        {page}
      </RecoilRoot>
    </ChakraProvider>
  )
}

export default MyApp
