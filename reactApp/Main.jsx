import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom'
import Venues from './Venues.jsx'
import Create from './Create.jsx'
import Update from './Update.jsx'

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {

            editValues:""
        };
        this.editVenue = this.editVenue.bind(this);

    }




    editVenue(value){
        // this.props.editVenue(value)
        this.state.editValues ? this.setState({editValues:null}) :this.setState({editValues:value})
    }



    render(){
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={() => (<Venues editVenue={this.editVenue} />)} />
                    <Route path='/create_venue' component={Create}/>

                    <Route path='/update_venue' component={() => (<Update editValues={this.state.editValues} />)} />
                </Switch>
            </main>

        )
    }
}





export default Main