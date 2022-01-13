import { UserLayout } from "./_app"
import DetailPayment from "../components/detail-payment/detail-payment"
import { Text, Flex, Badge, Divider } from "@chakra-ui/react"
import BlackScreen from "../components/navigator/black-screen"
import { useState } from "react"
import { RecordDetailPayment } from "../components/detail-payment/detail-payment"
import { BeliPulsa, generateDetailBeliPulsa } from "../components/global-state/pulsa"
import { BeliToken, generateDetailBeliToken } from "../components/global-state/token"
import { BeliPDAM, generateDetailBeliPDAM } from "../components/global-state/pdam"

type DataHistory = (BeliPulsa | BeliToken | BeliPDAM)[]

const dataHistory:DataHistory= [
    {
        id: "1234",
        noHandphone : "1213131",
        nameCategory: "pulsa",
        nameProduct : "Telkomsel Rp5.000",
        price : 5000,
        adminFee : 1000,
        date: "MBOH",
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
        id: "1234",
        noPLN : "1213131",
        nameCategory: "token",
        nameProduct : "Telkomsel Rp5.000",
        price : 5000,
        adminFee : 1000,
        date: "MBOH",
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

    const [detailTransaction, setDetailTransaction] = useState<RecordDetailPayment[]>()

    return(
        <>
            {detailTransaction?
                <BlackScreen
                    child={
                        <DetailPayment detailPayment={detailTransaction}/>
                    }
                />
                : null}
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
                dataHistory.map((history,index)=>{
                    let detailPayment:RecordDetailPayment[] = []
                    switch(history.nameCategory){
                        case "pulsa":
                            detailPayment = generateDetailBeliPulsa(history as BeliPulsa)
                        case "token":
                            detailPayment = generateDetailBeliToken(history as BeliToken)
                        case "pdam":
                            detailPayment = generateDetailBeliPDAM(history as BeliPDAM)
                    }
                    return(
                        <DetailPayment
                            detailPayment={detailPayment} key={history.id}
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
                                    <Divider my="4"/>
                                </>
                            }
                            bottomChild={
                                <Text onClick={(e)=>{
                                    setDetailTransaction(detailPayment)
                                }} className="my-text" color="base" fontSize="xs" fontWeight="bold" textAlign="right" mt="5">
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