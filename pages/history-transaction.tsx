import { UserLayout } from "./_app"
import DetailTransaction from "../components/user/transaction/detail-transaction/detail-transaction"
import { Text, Flex, Badge, Box, useToast, Icon } from "@chakra-ui/react"
import { RecordDetailTransaction } from "../components/user/transaction/detail-transaction/detail-transaction"
import { rupiahFormatter } from "../helper/rupiah-formatter"
import { blackScreen } from "../components/user/global-state/black-screen"
import { navigator as nav} from "../components/user/global-state/navigator"
import { useRecoilState, useSetRecoilState } from "recoil"
import { baseRequest, BaseResponse } from "../helper/base-request"
import { useEffect, useState } from "react"
import BeforeLogin from "../components/user/general/before-login/before-login"
import { User } from "../components/user/global-state/user"
import { MdOutlineFileCopy } from "react-icons/md"

const HistoryTransaction = () => {

    const [navigatorState, setterNavigatorState] = useRecoilState(nav)
    const setIsBlackScreenRender = useSetRecoilState(blackScreen)
    const [dataHistory, setDataHistory] = useState<BaseResponse<any>>()
    const [userPersisted, setUserPersisted] = useState<User | null>()

    const toast = useToast()

    const copyTextToClipboard = async (text:string) => {
        return await navigator.clipboard.writeText(text)
    }

    const handleCopyClick = (copyText:string) => {
        copyTextToClipboard(copyText)
          .then(() => {
            toast({
                description: "virtual akun berhasil disalin.",
                status: 'success',
                position: 'top'
            })
          })
          .catch((err) => {
            console.log(err)
          })
    }

    useEffect(()=>{
        if(localStorage.getItem("user-persist")){
            setUserPersisted(JSON.parse(localStorage.getItem("user-persist") || ""))
        }else{
            setUserPersisted(null)
        }
    },[])


    useEffect(()=>{

        const getDataHistory = async () =>{
            const userPersisted = JSON.parse(localStorage.getItem("user-persist") || "")
            const response = await baseRequest<any>({
                method:"GET",
                url:"/history",
                token:userPersisted?.data?.token
            })
            setDataHistory(response)
        }

        getDataHistory()

        return ()=>{
            setIsBlackScreenRender({
                isBlackScreenRender:false
            })
            setterNavigatorState({})
        }
    },[])

    if(userPersisted === null || userPersisted?.valid === false){
        return <BeforeLogin/>
    }

    if(dataHistory === undefined){
        return null
    }

    if(dataHistory.status === "error"){
        return <BeforeLogin/>
    }

    if(dataHistory.data.length === 0){
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
                    kamu belum punya riwayat transaksi
                </Text>
            </>
        )
    }

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
                Riwayat Transaksi
            </Text>
            {
                dataHistory?.data.map((history: any)=>{
                    const { id, status, total_price, detail_transaction, success_date_time,
                            pending_date_time, account_number, bank_code, expiration_payment } = history
                    const { admin_fee, price, name, detail_product_class_name, detail_unique_value,
                            detail_product_class_tax } = detail_transaction
                    let detailTransaction:RecordDetailTransaction[] = [
                        {name:"ID transaksi", value:id},
                        {name:"Nama produk", value:name},
                        {name:"Bank", value:bank_code},
                        {name:"Batas pembayaran", value:new Date(expiration_payment).toLocaleString()},
                        {name:"Biaya admin", value:rupiahFormatter(admin_fee,"Rp.")},
                        {name:"Biaya pajak", value:`${detail_product_class_tax}%`},
                    ]
                    switch(detail_product_class_name){
                        case "pulsa":
                            detailTransaction.push({name:"Harga produk",value:rupiahFormatter(price,"Rp.")})
                            break
                        case "token":
                            detailTransaction.push({name:"Harga produk",value:rupiahFormatter(price,"Rp.")})
                            break
                    }
                    detailTransaction.push({name:"Total pembayaran", value:rupiahFormatter(total_price,"Rp.")})
                    return(
                        <DetailTransaction
                            detailTransaction={detailTransaction} key={`history-${history.id}`}
                            topChild={
                                <>
                                    <Flex height="10" justifyContent="space-between">
                                        <Flex height="full" alignItems="center">
                                            <Text
                                                className="my-text"
                                                color="base"
                                                fontWeight="bold"
                                                textTransform="uppercase"
                                            >
                                                {detail_product_class_name}
                                            </Text>
                                            <Text
                                                className="my-text"
                                                fontSize="xs"
                                                ml="2"
                                            >
                                                {new Date(pending_date_time).toLocaleDateString()}
                                            </Text>
                                        </Flex>
                                        <Badge
                                            variant='solid' px="2" py="1"
                                            borderRadius="base" colorScheme={status==="bayar" ? "green" : "red"}
                                            alignSelf="center" textTransform="capitalize"
                                            className="my-text"
                                        >
                                            {status}
                                        </Badge>
                                    </Flex>
                                    {
                                        status === "pending" ? (
                                            <Flex flexWrap="wrap" my="5">
                                                <Text
                                                    w="50%"
                                                    fontWeight="bold"
                                                    className="my-text"
                                                    color="base"
                                                    fontSize="sm"
                                                >
                                                    Virtual akun
                                                </Text>
                                                <Flex w="50%" pl="2">
                                                    <Text
                                                        fontWeight="bold"
                                                        className="my-text"
                                                        fontSize="sm"
                                                    >
                                                        {account_number}
                                                    </Text>
                                                    <Flex ml="2" cursor="pointer" alignItems="center" onClick={()=>handleCopyClick(account_number)}>
                                                        <Text className="my-text" fontSize="sm" mx="1">salin</Text>
                                                        <Icon as={MdOutlineFileCopy}></Icon>
                                                    </Flex>
                                                </Flex>
                                            </Flex>
                                        ) : null
                                    }
                                    {
                                        status === "bayar" ? (
                                            <Flex flexWrap="wrap" my="5">
                                                <Text
                                                    w="50%"
                                                    fontWeight="bold"
                                                    className="my-text"
                                                    color="base"
                                                    fontSize="sm"
                                                >
                                                    Waktu pembayaran
                                                </Text>
                                                <Flex w="50%" pl="2">
                                                    <Text
                                                        fontWeight="bold"
                                                        className="my-text"
                                                        fontSize="sm"
                                                    >
                                                        {new Date(success_date_time).toLocaleString()}
                                                    </Text>
                                                </Flex>
                                            </Flex>
                                        ) : null
                                    }
                                    {
                                        detail_unique_value ? (
                                            <Flex flexWrap="wrap" my="5">
                                                <Text
                                                    w="50%"
                                                    fontWeight="bold"
                                                    className="my-text"
                                                    color="base"
                                                    fontSize="sm"
                                                >
                                                    Token listrik
                                                </Text>
                                                <Flex w="50%" pl="2">
                                                    <Text
                                                        fontWeight="bold"
                                                        className="my-text"
                                                        fontSize="sm"
                                                    >
                                                        {detail_unique_value}
                                                    </Text>
                                                </Flex>
                                            </Flex>
                                        ) : null
                                    }
                                    <Box
                                        height="0.1"
                                        width="full"
                                        background="gray.100"
                                        borderRadius="base"
                                        my="4"
                                    />
                                </>
                            }
                        />
                    )
                })
            }
        </>
    )
}

HistoryTransaction.getLayout = UserLayout

export default HistoryTransaction

