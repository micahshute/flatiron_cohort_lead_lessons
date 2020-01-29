import React from "react"
import { Card } from '../Styles'


export default function Pokemon(props){


    const handleClick = e => {
        props.buttonFunction(props.id)
    }

    return(
        <Card>
            <h1>{props.name}</h1>
            <h2>{props.type}</h2>
            <img src={props.spriteURL}/>
    <button onClick={handleClick} disabled={!props.buttonActionable}>{props.buttonAction}</button>
        </Card>
    )
}