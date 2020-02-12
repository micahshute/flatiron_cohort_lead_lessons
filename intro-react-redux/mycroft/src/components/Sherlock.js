import React, { Component } from 'react'
import AddVillainForm from './AddVillainForm'
import AddMoriartyLocationForm from './AddMoriartyLocaitonForm'
import { addMoriartyLocation, addVillain } from '../actions'


import { connect } from 'react-redux'

class Sherlock extends Component{

    handleMoriartyAddition = ([location, time]) => {
        this.props.addMoriartyLocation({location, time})
    }

    handleAddVillain = ([name, dangerLevel, mo]) => {
        this.props.addVillain({name, dangerLevel, mo})
    }

    render(){
        return(
            <div>
                <h1>Sherlock</h1>
                <h3>Moriarty Spotting</h3>
                <AddMoriartyLocationForm
                    submitCallback={this.handleMoriartyAddition}
                />
                <h3>Villains</h3>
                <AddVillainForm 
                    submitCallback={this.handleAddVillain}
                />
            </div>
        
        
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    addMoriartyLocation: info => dispatch(addMoriartyLocation(info)),
    addVillain: info => dispatch(addVillain(info))
})

export default connect(null, mapDispatchToProps)(Sherlock)
