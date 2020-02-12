import React from 'react'
import Form from './Form'

export default function addVillainForm(props){

    return(
        <Form 
            inputs={['Name', 'Danger Level', 'M.O.']}
            submitValue={'Add Villain'}
            submitCallback={props.submitCallback}
        />
    )
}