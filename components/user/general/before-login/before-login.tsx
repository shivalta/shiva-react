import { Text, Flex, Button } from "@chakra-ui/react"
import { MdOutlineLogin, MdEditNote } from "react-icons/md"
import Link from "next/link"

const BeforeLogin = () => {
    return(
        <>
            <Text
                as="h2"
                className="my-text"
                color="base"
                fontWeight="bold"
                fontSize="4xl"
                textAlign="center"
                mt="20"
            >
                OOPS
            </Text>
            <Text
                className="my-text"
                textAlign="center"
                color="base"
            >
                masuk dulu ya untuk melihat history
            </Text>
            <Flex justifyContent="space-between">
                <Link href="/login" passHref>
                    <Button
                        as="a"
                        fontSize="xs"
                        bg="base"
                        color="white"
                        width="48%"
                        height="10"
                        _hover={{bg:"base"}}
                        mt="5"
                        leftIcon={<MdOutlineLogin/>}
                        >
                        Masuk
                    </Button>
                </Link>
                <Link href="/register" passHref>
                    <Button
                        as="a"
                        fontSize="xs"
                        bg="base_second"
                        color="white"
                        width="48%"
                        height="10"
                        _hover={{bg:"base_second"}}
                        mt="5"
                        leftIcon={<MdEditNote/>}
                        >
                        Daftar
                    </Button>
                </Link>
            </Flex>
        </>
    )
}

export default BeforeLogin