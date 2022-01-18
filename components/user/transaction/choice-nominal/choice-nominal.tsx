import { Text, Flex } from '@chakra-ui/react'

export type DataNominal = {
    name:string
    price:number
    adminFee:number
}

export type ListDataNominal = {
    logo?:string
    data: DataNominal[]
}

type PropsChoiceNominal = {
    title: string
    dataNominal : DataNominal[]
    handleClickNominal: (arg: DataNominal)=>void
    render?:()=>React.ReactNode
}

const ChoiceNominal = (props:PropsChoiceNominal)=>{

    const {title, dataNominal, handleClickNominal, render} = props

    return(
        <>
            <Text as="h3" className="my-text" color="base" fontWeight="bold" mt="5">
                {title}
            </Text>
            {render? render() : null}
            {
                dataNominal.map(({name,price,adminFee})=>{
                    return(
                        <Flex onClick={()=>handleClickNominal({name,price,adminFee})} key={name}
                            as="a" justify="space-between" alignItems="center" rounded="xl" shadow="base"
                            px="3" py="5" my="3" tabIndex={0} cursor="pointer"
                        >
                            <Text fontWeight="bold" className="my-text">{name}</Text>
                            <Text fontWeight="semibold" className="my-text" fontSize="xl" color="base_second">Rp.{price}</Text>
                        </Flex>
                    )
                })
            }
        </>
    )
}

export default ChoiceNominal