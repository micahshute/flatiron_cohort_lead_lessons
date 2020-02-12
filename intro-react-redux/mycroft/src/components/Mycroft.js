import React from 'react'
import { connect } from 'react-redux'


function Mycroft(props){

    const renderVillains = () => {
        return props.villains.map(v => (
            <li>
                {v.name}; {v.dangerLevel}; {v.mo}
            </li>
        ))
    }

    const renderMoriartyLocations = () => {
        // console.log(props.poriarty)
        return props.moriartyLocations.map(v => (
            <li>
                {v.location}; {v.time}
            </li>
        ))
    }


    return(
        <>
        <h1>Mycroft</h1>
        <div>
            <h3>Villain List</h3>
            <ul>
                {renderVillains()}
            </ul>
            
        </div>
        <div>
            <h3>Moriarty Locations</h3>
            <ul>
                {renderMoriartyLocations()}
            </ul>
        </div>
        </>
    )
}


const mapStateToProps = ({villains, moriartyLocations}) => ({
    villains,
    moriartyLocations
})

export default connect(mapStateToProps)(Mycroft)