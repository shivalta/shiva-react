import { UserLayout } from "./_app"
import DetailTransaction from "../components/user/transaction/detail-transaction/detail-transaction"
import { Text, Flex, Badge, Box } from "@chakra-ui/react"
import PopUp from "../components/user/general/navigator/pop-up"
import { RecordDetailTransaction } from "../components/user/transaction/detail-transaction/detail-transaction"
import { BeliPulsa, generateDetailBeliPulsa } from "../components/user/global-state/pulsa"
import { BeliToken, generateDetailBeliToken } from "../components/user/global-state/token"
import { rupiahFormatter } from "../helper/rupiah-formatter"
import { blackScreen } from "../components/user/global-state/black-screen"
import { navigator } from "../components/user/global-state/navigator"
import { useRecoilState, useSetRecoilState } from "recoil"
import { useEffect } from "react"
import { BeliPDAM, generateDetailBeliPDAM } from "../components/user/global-state/pdam"

type DataHistoryTransaction = (BeliPulsa | BeliToken | BeliPDAM)[]

const dataHistory:DataHistoryTransaction= [
    {
        id: "1234",
        noHandphone : "1213131",
        nameCategory: "pulsa",
        nameProduct : "Telkomsel Rp5.000",
        price : 5000,
        adminFee : 1000,
        date: "2021-06-02",
        status: true,
        total: 6000,
        virtualAccount: "23232323232",
        paymentMethod: {
            id:"1",
            name:"mandiri",
            logo:"any"
        }
    },
    {
        id: "12345",
        noPLN : "1213131",
        nameCategory: "token",
        nameProduct : "Telkomsel Rp5.000",
        price : 5000,
        adminFee : 1000,
        date: "2021-06-02",
        status: true,
        total: 6000,
        virtualAccount: "23232323232",
        paymentMethod: {
            id:"1",
            name:"mandiri",
            logo:"any"
        }
    }
]

const HistoryTransaction = () => {

    const [navigatorState, setterNavigatorState] = useRecoilState(navigator)
    const setIsBlackScreenRender = useSetRecoilState(blackScreen)

    useEffect(()=>{
        return ()=>{
            setIsBlackScreenRender({
                isBlackScreenRender:false
            })
            setterNavigatorState({})
        }
    },[])

    const handleClick = (detailServiceState:RecordDetailTransaction[])=>{
        setIsBlackScreenRender({
            isBlackScreenRender: true
        })
        setterNavigatorState({
            ...navigatorState,
            isOpenPopUp: true,
            renderPopUp:
                <PopUp
                    title={"Detail Pembayaran"}
                    render={<DetailTransaction detailTransaction={detailServiceState}/>}
                />
        })
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
                dataHistory.map((history)=>{
                    let detailTransaction:RecordDetailTransaction[] = []
                    let generalDetailTransaction:RecordDetailTransaction[] = [
                        {name:"ID transaksi", value:history.id!},
                        {name:"Nama produk", value:history.nameProduct!},
                        {name:"Total pembayaran", value:rupiahFormatter(history.total!, "Rp.")},
                    ]
                    switch(history.nameCategory){
                        case "pulsa":
                            detailTransaction = generateDetailBeliPulsa(history as BeliPulsa)
                            break
                        case "token":
                            detailTransaction = generateDetailBeliToken(history as BeliToken)
                            break
                        case "pdam":
                            detailTransaction = generateDetailBeliPDAM(history as BeliPDAM)
                            break
                    }
                    return(
                        <DetailTransaction
                            detailTransaction={generalDetailTransaction} key={history.id}
                            topChild={
                                <>
                                    <Flex height="10" justifyContent="space-between">
                                        <Flex height="full" alignItems="center">
                                            <Text
                                                className="my-text"
                                                color="base"
                                                fontWeight="bold"
                                            >
                                                {history.nameCategory}
                                            </Text>
                                            <Text
                                                className="my-text"
                                                fontSize="xs"
                                                ml="2"
                                            >
                                                {history.date}
                                            </Text>
                                        </Flex>
                                        <Badge
                                            variant='solid' px="2" py="1"
                                            borderRadius="base" colorScheme='green'
                                            alignSelf="center" textTransform="capitalize"
                                            className="my-text"
                                        >
                                            Berhasil
                                        </Badge>
                                    </Flex>
                                    <Box
                                        height="0.1"
                                        width="full"
                                        background="gray.100"
                                        borderRadius="base"
                                        my="4"
                                    />
                                </>
                            }
                            bottomChild={
                                <Text onClick={()=>handleClick(detailTransaction)} className="my-text" color="base" fontSize="xs" fontWeight="bold" textAlign="right" mt="5">
                                    Detail
                                </Text>
                            }
                        />
                    )
                })
            }
        </>
    )
}

export default HistoryTransaction

HistoryTransaction.getLayout = UserLayout