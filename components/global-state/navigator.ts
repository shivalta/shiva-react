import { atom, RecoilState } from "recoil"

export type Navigator = {
    button?: React.ReactNode
    isOpenPopUp?: boolean
    renderPopUp?: React.ReactNode
    renderContent?: React.ReactNode
}

export const navigator: RecoilState<Navigator> = atom({
    key:"navigator",
    default:{}
})
