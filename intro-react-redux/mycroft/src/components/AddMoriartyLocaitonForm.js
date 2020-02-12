import React from 'react'
import Form from './Form'


export default function AddMoriartyLocationForm(props){

    return(
        <Form
            inputs={['Location', 'Time']}
            submitValue={'Add Spotting'}
            submitCallback={props.submitCallback}
        />
    )
}