import { AdminLayout } from "../../../_app"
import { Box, Table, Thead, Tbody, Tr, Th, Td, TableCaption, Button, useDisclosure, Text } from '@chakra-ui/react'
import { baseRequest, BaseResponse } from "../../../../helper/base-request"
import { useEffect, useState } from "react"
import { MdDelete, MdModeEdit, MdOutlineCreateNewFolder } from "react-icons/md"
import Link from "next/link"
import AdminAlertDialog from "../../../../components/admin/admin-alert-dialog/admin-alert-dialog"

type DataProductClass = {
    id: number
    name: string
    is_pasca: boolean
    image: string
    slug: string
}

const ProductClass = () => {

    const [dataProductClass, setDataProductClass] = useState<BaseResponse<DataProductClass[]>>()
    const [idSelectedDelete, setIdSelectedDelete] = useState(0)
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(()=>{
        const getDataProductClass = async () => {
            const dataProductClass = await baseRequest<DataProductClass[]>({
                method:"GET",
                url:"/class"
            })
            setDataProductClass(dataProductClass)
        }
        getDataProductClass()
    },[])

    if(dataProductClass === undefined){
        return null
    }

    const listProductClass = dataProductClass.data

    return(
        <Box width="100%">
            <AdminAlertDialog isOpen={isOpen} closeDialog={onClose} id={idSelectedDelete}/>
            <Text as="h2" fontWeight="bold" className="my-text" color="base" fontSize="2xl" mb="10">
                Product Class
            </Text>
            <Box width="100%" overflowX="scroll">
                <Table variant='simple'>
                    <TableCaption>Data of product class</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Is Pasca</Th>
                            <Th>Image</Th>
                            <Th>Slug</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            listProductClass.map((productClass)=>{
                                return(
                                    <Tr key={`product-class-${productClass.id}`}>
                                        <Td>{productClass.name}</Td>
                                        <Td>{productClass.is_pasca? "true" : "false"}</Td>
                                        <Td>
                                            <Link href={productClass.image} passHref>
                                                <Text as="a" target="_blank" rel="noopener noreferrer" color="blue.500">
                                                    {productClass.image}
                                                </Text>
                                            </Link>
                                        </Td>
                                        <Td>{productClass.slug}</Td>
                                        <Td display="flex">
                                            <Link href={`/admin/crud/product-class/edit/${productClass.id}`} passHref>
                                                <Button as="a" colorScheme='blue' mr="2">
                                                    <MdModeEdit/>
                                                </Button>
                                            </Link>
                                            <Button onClick={()=>{
                                                onOpen()
                                                setIdSelectedDelete(productClass.id)
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
            <Link href="/admin/crud/product-class/create" passHref>
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

export default ProductClass

ProductClass.getLayout = AdminLayout