import { atom, RecoilState } from "recoil"

type BlackScreen = {
    isBlackScreenRender?: boolean
}

export const blackScreen: RecoilState<BlackScreen> = atom({
    key: "black-screen",
    default: {}
})