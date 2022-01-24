import { MdLogout } from "react-icons/md"
import { Button } from "@chakra-ui/react"
import { useRouter } from "next/router"

const ButtonLogout = () => {

    const router = useRouter()

    const handleClick = () => {
        localStorage.removeItem("user-persist")
        router.push("/")
    }

    return(
        <Button
            fontSize="xs"
            bg="base_second"
            color="white"
            height="10"
            width="48%"
            _hover={{bg:"base_second"}}
            mt="5"
            onClick={handleClick}
            leftIcon={<MdLogout/>}
        >
            Keluar
        </Button>
    )
}

export default ButtonLogout