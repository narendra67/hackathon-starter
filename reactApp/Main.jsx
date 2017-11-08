import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Venues from './Venues.jsx'
import Create from './Create.jsx'
import Update from './Update.jsx'

const Main = () => (



    <main>
        <Switch>
            <Route exact path='/' component={Venues}/>
            <Route path='/create_venue' component={Create}/>
            <Route path='/update_venue' component={Update}/>
        </Switch>
    </main>
)

export default Main