import {useState, useEffect} from "react"

const Nyoba = () => {
    const [coba, setCoba] = useState("coba")
    const [telo, setTelo] = useState((()=>{
        if(coba === "coba") {
            return "telo"
        }
    })())


    useEffect(()=>{
        console.log(coba)
        setTimeout(()=>{
            setCoba("a")
        },2000)
    })


    return(
        <div>{telo}</div>
    )
}

export default Nyoba