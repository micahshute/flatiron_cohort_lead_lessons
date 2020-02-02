import React, { useState } from "react"
import img from '../assets/pokeball.png'
import { Card } from '../Styles'


export default function Pokemon(props){

    const [ imgLoaded, setImgLoaded ] = useState(false)

    const handleClick = e => {
        props.buttonFunction(props.id)
    }

    const imgHasLoaded = e => {
        setImgLoaded(true)
    }

    return(
        <Card>
            <h1>{props.name}</h1>
            <h2>{props.type}</h2>
            <img src={props.spriteURL} onLoad={imgHasLoaded} style={imgLoaded ? {} : {display: "none"}}/>
            <img src={img} style={imgLoaded ? {display: "none"} : {width: '95px', height: '95px'}}/>
             <button onClick={handleClick} disabled={!props.buttonActionable}>{props.buttonAction}</button>
        </Card>
    )
}