import { Alert, AlertIcon } from "@chakra-ui/react"

const AlertPaymentMethod = () => {
    return(
        <Alert status="error" className="my-text" fontSize="xs" borderRadius="lg" variant="solid" padding="2" my="4">
            <AlertIcon />
            Isi metode pembayaran dulu ya
        </Alert>
    )
}

export default AlertPaymentMethod