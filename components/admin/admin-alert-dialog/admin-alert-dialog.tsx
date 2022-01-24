import { useRef } from "react"
import {
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogCloseButton,
    AlertDialogBody,
    AlertDialogFooter,
    Button,
    useToast,
} from "@chakra-ui/react"
import { createToastChakra } from "../../../helper/create-toast-chakra"
import { useRouter } from "next/router"
import { baseRequest } from "../../../helper/base-request"

type PropsAdminAlertDialog = {
    closeDialog : () => void
    isOpen : boolean
    id : number
}

const AdminAlertDialog = (props: PropsAdminAlertDialog) => {

    const { closeDialog, isOpen, id } = props
    const router = useRouter()
    const toast = useToast()
    const cancelRef = useRef(null)

    const handleClickConfirm = async () => {
        const response = await baseRequest({
            method:"DELETE",
            url:`/class/${id}`
        })
        console.log(id)
        createToastChakra({
            response:response,
            router:router,
            toast:toast,
            path:"/admin/crud/product-class"
        })
        closeDialog()
    }

    return(
        <AlertDialog
            motionPreset='slideInBottom'
            leastDestructiveRef={cancelRef}
            onClose={closeDialog}
            isOpen={isOpen}
            isCentered
        >
            <AlertDialogOverlay />
            <AlertDialogContent>
                <AlertDialogHeader>Delete Record?</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
                Are you sure you want to discard this record? the record will be deleted
            </AlertDialogBody>
                <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={closeDialog}>
                        No
                    </Button>
                    <Button colorScheme='red' ml={3} onClick={handleClickConfirm}>
                        Yes
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AdminAlertDialog