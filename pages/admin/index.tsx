import { Box, Flex, Button } from "@chakra-ui/react"
import { MdProductionQuantityLimits } from "react-icons/md"
import Link from "next/link"

const Admin = () => {
    return(
        <Flex>
            <Box width="60" height="100vh" background="base" py="10" px="2">
                <Link href="admin/crud/products" passHref>
                    <Button
                        as="a"
                        colorScheme=""
                        className="my-text"
                        width="full"
                        justifyContent="flex-start"
                        leftIcon={<MdProductionQuantityLimits/>}
                    >
                            Products
                    </Button>
                </Link>
                <Link href="admin/crud/product-class" passHref>
                    <Button
                        as="a"
                        colorScheme=""
                        className="my-text"
                        width="full"
                        justifyContent="flex-start"
                        leftIcon={<MdProductionQuantityLimits/>}
                    >
                        Product Class
                    </Button>
                </Link>
                <Link href="admin/crud/product-class" passHref>
                    <Button
                        as="a"
                        colorScheme=""
                        className="my-text"
                        width="full"
                        justifyContent="flex-start"
                        leftIcon={<MdProductionQuantityLimits/>}
                    >
                        Product Categories
                    </Button>
                </Link>
            </Box>
        </Flex>
    )
}

export default Admin