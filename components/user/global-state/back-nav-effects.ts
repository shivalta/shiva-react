import { atom, RecoilState } from "recoil"

type BackNavEffects = {
    effects:()=>void
}

export const backNavEffects: RecoilState<BackNavEffects> = atom({
    key: "back-nav-effect",
    default: {effects:()=>{}}
})