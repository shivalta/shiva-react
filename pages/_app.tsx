import { ChakraProvider, extendTheme, Flex, Box, Text } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Navigator from '../components/navigator/navigator'
import { AnimateSharedLayout } from 'framer-motion'
import { RecoilRoot } from 'recoil'
import '../styles/globals.css'
import BackNav from '../components/back-nav/back-nav'
import Image from 'next/image'
import shivaLogo from '../public/images/shiva.png'

function MyApp({ Component, pageProps }: AppProps) {
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

  return (
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        <AnimateSharedLayout>
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
                <Component {...pageProps} />
                <Navigator/>
            </Box>
          </Flex>
        </AnimateSharedLayout>
      </RecoilRoot>
    </ChakraProvider>
  )
}

export default MyApp
