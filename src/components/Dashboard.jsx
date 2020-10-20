import React,{useEffect} from 'react'
import axios from 'axios'

export default function Dashboard(){
    useEffect(() => {
        axios
    .get('https://market-price-api.herokuapp.com/sauti/developer')
    .then((res)=>{
        console.log(res)
    })
    .catch((err)=>{
        console.log(err)
    })
    }, [])
    
    return(
        <h1> Working </h1>
    )
}