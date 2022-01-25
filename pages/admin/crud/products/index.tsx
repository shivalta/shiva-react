import { AdminLayout } from "../../../_app"
import { Box, Table, Thead, Tbody, Tr, Th, Td, TableCaption, Button, useDisclosure, Text } from '@chakra-ui/react'
import { baseRequest, BaseResponse } from "../../../../helper/base-request"
import { useEffect, useState } from "react"
import { MdDelete, MdModeEdit, MdOutlineCreateNewFolder } from "react-icons/md"
import Link from "next/link"
import AdminAlertDialog from "../../../../components/admin/admin-alert-dialog/admin-alert-dialog"

type DataProducts = {
    id: number
    product_class: {
        id: number,
        name: string,
        is_pasca: boolean,
        image: string
    },
    product_categories: {
        id: number
        name: string
        tax: number
    }
    sku: string
    name: string
    admin_fee: number
    stock: number
    price: number
    is_active: boolean
}

const Products = () => {

    const [dataProducts, setDataProducts] = useState<BaseResponse<DataProducts[]>>()
    const [idSelectedDelete, setIdSelectedDelete] = useState(0)
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(()=>{
        const getDataProductClass = async () => {
            const dataProducts = await baseRequest<DataProducts[]>({
                method:"GET",
                url:"/products"
            })
            setDataProducts(dataProducts)
        }
        getDataProductClass()
    },[])

    if(dataProducts === undefined){
        return null
    }

    const listProducts = dataProducts.data

    return(
        <Box width="100%">
            <AdminAlertDialog pathDelete={`/products/${idSelectedDelete}`}
            isOpen={isOpen} closeDialog={onClose}/>
            <Text as="h2" fontWeight="bold" className="my-text" color="base" fontSize="2xl" mb="10">
                Product Class
            </Text>
            <Box width="100%" overflowX="scroll">
                <Table variant='simple'>
                    <TableCaption>Data of products</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Id</Th>
                            <Th>Product Class Id</Th>
                            <Th>Product Categories Id</Th>
                            <Th>SKU</Th>
                            <Th>Name</Th>
                            <Th>Admin Fee</Th>
                            <Th>Stock</Th>
                            <Th>Price</Th>
                            <Th>Is Active</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            listProducts?.map((products)=>{
                                return(
                                    <Tr key={`product-class-${products.id}`}>
                                        <Td>{products.id}</Td>
                                        <Td>{products.product_class.id}</Td>
                                        <Td>{products.product_categories.id}</Td>
                                        <Td>{products.sku}</Td>
                                        <Td>{products.name}</Td>
                                        <Td>{products.admin_fee}</Td>
                                        <Td>{products.stock}</Td>
                                        <Td>{products.price}</Td>
                                        <Td>{products.is_active? "true" : "false"}</Td>
                                        <Td display="flex">
                                            <Link href={`/admin/crud/products/edit/${products.id}`} passHref>
                                                <Button as="a" colorScheme='blue' mr="2">
                                                    <MdModeEdit/>
                                                </Button>
                                            </Link>
                                            <Button onClick={()=>{
                                                onOpen()
                                                setIdSelectedDelete(products.id)
                                            }} colorScheme='red' mx="2"
                                            >
                                                <MdDelete/>
                                            </Button>
                                        </Td>
                                    </Tr>
                                )
                            })
                        }
                    </Tbody>
                </Table>
            </Box>
            <Link href="/admin/crud/products/create" passHref>
                <Button
                    fontSize="xs"
                    bg="base"
                    color="white"
                    width="48"
                    height="10"
                    _hover={{bg:"base"}}
                    mt="10"
                    display="block"
                    ml="auto"
                    leftIcon={<MdOutlineCreateNewFolder/>}
                    >
                        Create
                </Button>
            </Link>
        </Box>
    )
}

export default Products

Products.getLayout = AdminLayout