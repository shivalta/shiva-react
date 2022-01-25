import { AdminLayout } from "../../../_app"
import { Box, Table, Thead, Tbody, Tr, Th, Td, TableCaption, Button, useDisclosure, Text } from '@chakra-ui/react'
import { baseRequest, BaseResponse } from "../../../../helper/base-request"
import { useEffect, useState } from "react"
import { MdDelete, MdModeEdit, MdOutlineCreateNewFolder } from "react-icons/md"
import Link from "next/link"
import AdminAlertDialog from "../../../../components/admin/admin-alert-dialog/admin-alert-dialog"

type DataProductCategories = {
    id: number
    product_class_id: number
    name: string
    image: string
    tax: number
    slug: string
}

const ProductCategories = () => {

    const [dataProductCategories, setDataProductCategories] = useState<BaseResponse<DataProductCategories[]>>()
    const [idSelectedDelete, setIdSelectedDelete] = useState(0)
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(()=>{
        const getDataProductCategories = async () => {
            const dataProductCategories = await baseRequest<DataProductCategories[]>({
                method:"GET",
                url:"/categories"
            })
            setDataProductCategories(dataProductCategories)
        }
        getDataProductCategories()
    },[])

    if(dataProductCategories === undefined){
        return null
    }

    const listProductCategories = dataProductCategories.data

    return(
        <Box width="100%">
            <AdminAlertDialog pathDelete={`/categories/${idSelectedDelete}`}
            isOpen={isOpen} closeDialog={onClose}/>
            <Text as="h2" fontWeight="bold" className="my-text" color="base" fontSize="2xl" mb="10">
                Product Categories
            </Text>
            <Box width="100%" overflowX="scroll">
                <Table variant='simple'>
                    <TableCaption>Data of product categories</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Id</Th>
                            <Th>Product Class Id</Th>
                            <Th>Name</Th>
                            <Th>Image</Th>
                            <Th>Tax</Th>
                            <Th>Slug</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            listProductCategories?.map((productCategories)=>{
                                return(
                                    <Tr key={`product-class-${productCategories.id}`}>
                                        <Td>{productCategories.id}</Td>
                                        <Td>{productCategories.product_class_id}</Td>
                                        <Td>{productCategories.name}</Td>
                                        <Td>
                                            <Link href={productCategories.image} passHref>
                                                <Text as="a" target="_blank" rel="noopener noreferrer" color="blue.500">
                                                    {productCategories.image}
                                                </Text>
                                            </Link>
                                        </Td>
                                        <Td>{productCategories.tax}</Td>
                                        <Td>{productCategories.slug}</Td>
                                        <Td display="flex">
                                            <Link href={`/admin/crud/product-categories/edit/${productCategories.id}`} passHref>
                                                <Button as="a" colorScheme='blue' mr="2">
                                                    <MdModeEdit/>
                                                </Button>
                                            </Link>
                                            <Button onClick={()=>{
                                                onOpen()
                                                setIdSelectedDelete(productCategories.id)
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
            <Link href="/admin/crud/product-categories/create" passHref>
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

export default ProductCategories

ProductCategories.getLayout = AdminLayout