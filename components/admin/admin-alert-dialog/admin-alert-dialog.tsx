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
    pathDelete : string
}

const AdminAlertDialog = (props: PropsAdminAlertDialog) => {

    const { closeDialog, isOpen, pathDelete } = props
    const router = useRouter()
    const toast = useToast()
    const cancelRef = useRef(null)

    const handleClickConfirm = async () => {
        const response = await baseRequest({
            method:"DELETE",
            url:pathDelete
        })
        createToastChakra({
            response:response,
            router:router,
            toast:toast,
            isReload:true
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
            <AlertDialogOverlay/>
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