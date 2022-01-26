import { Box, Text, Flex, Button } from "@chakra-ui/react"
import Image from "next/image"
import AvatarIcon from "../../public/images/avatar.png"
import { UserLayout } from "../_app"
import { MdEditNote } from "react-icons/md"
import Link from "next/link"
import ButtonLogout from "../../components/user/profile/button-logout"
import { baseRequest, BaseResponse } from "../../helper/base-request"
import BeforeLogin from "../../components/user/general/before-login/before-login"
import { User } from "../../components/user/global-state/user"
import { useEffect, useState } from "react"

type DataUser = {
    id: number
    name: string
    email: string
    handphone: string
    address: string
}

const Profile = () => {

    const [dataUser, setDataUser] = useState<BaseResponse<DataUser>>()   //data user from api
    const [userPersisted, setUserPersisted] = useState<User | null>() //data user from local storage

    useEffect(()=>{
        if(localStorage.getItem("user-persist")){
          setUserPersisted(JSON.parse(localStorage.getItem("user-persist") || ""))
        }else{
            setUserPersisted(null)
        }
    },[])

    useEffect(()=>{
        const getDataUser = async () =>{
            const userPersisted = JSON.parse(localStorage.getItem("user-persist") || "")
            const dataUser = await baseRequest<DataUser>({
                url:`users/${userPersisted?.data?.user.id}`,
                method:"GET",
                token:userPersisted.data.token
            })
            setDataUser(dataUser)
        }
        getDataUser()
    },[])

    if(userPersisted === null || userPersisted?.valid === false){
        return <BeforeLogin/>
    }

    if(dataUser === undefined){
        return null
    }

    if(dataUser.status === "error"){
        return <BeforeLogin/>
    }

    const { name, email, handphone } = dataUser.data

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
                        {name}
                    </Text>
                    <Text className="my-text" fontSize="sm" color="gray.600">{email}</Text>
                    <Text className="my-text" fontSize="xs" color="gray.600">{handphone}</Text>
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