import { Box, Text, Flex, Button } from "@chakra-ui/react"
import Image from "next/image"
import AvatarIcon from "../../public/images/avatar.png"
import { UserLayout } from "../_app"
import { MdEditNote } from "react-icons/md"
import Link from "next/link"
import ButtonLogout from "../../components/user/profile/button-logout"

const Profile = () => {

    return(
        <>
            <Text
                as="h2"
                className="my-text-2"
                textAlign="center"
                color="base"
                fontWeight="bold"
                mt="20"
                mb="10"
            >
                Profil
            </Text>
            <Flex p="5" borderRadius="lg" boxShadow="base">
                <Box height="20" width="20" mr="5" position="relative">
                    <Image layout="fill" src={AvatarIcon} alt="avatar-profile-icon"/>
                </Box>
                <Box>
                    <Text
                        as="h3"
                        className="my-text"
                        color="base"
                        fontWeight="bold"
                        mb="2"
                    >
                        Naufal Ghani Achmani
                    </Text>
                    <Text className="my-text" fontSize="sm" color="gray.600">naufalghaniachmani@gmail.com</Text>
                    <Text className="my-text" fontSize="xs" color="gray.600">082236486879</Text>
                </Box>
            </Flex>
            <Flex justifyContent="space-between">
                <Link href="/profile/edit" passHref>
                    <Button
                        fontSize="xs"
                        bg="base"
                        color="white"
                        width="48%"
                        height="10"
                        _hover={{bg:"base"}}
                        mt="5"
                        as="a"
                        leftIcon={<MdEditNote/>}
                        >
                        Edit Profil
                    </Button>
                </Link>
                <ButtonLogout/>
            </Flex>

        </>
    )
}

export default Profile

Profile.getLayout = UserLayout