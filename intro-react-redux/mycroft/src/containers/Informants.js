import React, { Component } from 'react'

import { 
    BrowserRouter as Router,
    Link,
    Route, 
    Switch,
    useRouteMatch
  } from 'react-router-dom'
  


import Sherlock from '../components/Sherlock'
import Watson from '../components/Watson'
import Lestrade from '../components/Lestrade'
import EncyclopediaBrown from '../components/EncyclopediaBrown'

export default function Informants(props){

    const {path, url} = useRouteMatch()

    return(
        <Router>
            <div>

            
                <Link to={`${url}/sherlock`}>Sherlock</Link><br/>
                <Link to={`${url}/watson`}>Watson</Link><br/>
                <Link to={`${url}/lestrade`}>Lestrade</Link><br/>
                <Link to={`${url}/ebrown`}>Encyclopedia Brown</Link><br/>

                <Switch>
                <Route path={`${path}/sherlock`}>
                    <Sherlock/>
                </Route>
                <Route path={`${path}/watson`}>
                    <Watson />
                </Route>
                <Route path={`${path}/lestrade`}>
                    <Lestrade />
                </Route>
                <Route path={`${path}/ebrown`}>
                    <EncyclopediaBrown />
                </Route>
                </Switch>
            </div>
        </Router>
    )

}