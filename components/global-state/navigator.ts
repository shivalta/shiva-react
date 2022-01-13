import { atom, RecoilState } from "recoil"

export type Navigator = {
    button?: React.ReactNode
    isOpenPopUP?: boolean
    renderPopUp?: React.ReactNode
}

export const navigator: RecoilState<Navigator> = atom({
    key:"navigator",
    default:{}
})
