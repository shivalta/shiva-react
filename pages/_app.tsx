import { ChakraProvider, extendTheme, Flex, Box, Text } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Navigator from '../components/navigator/navigator'
import { AnimateSharedLayout } from 'framer-motion'
import { RecoilRoot, atom } from 'recoil'
import '../styles/globals.css'
import BackNav from '../components/back-nav/back-nav'

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
              width='400px'
              minHeight='100vh'
              bg='white'
              p='6'
              pb="16"
              >
                <Text
                    as="h1"
                    fontSize="xl"
                    color="base"
                    className="my-text-2"
                    fontWeight="bold"
                >
                    SHIVA
                </Text>
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
