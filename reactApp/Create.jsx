import React, {Component} from 'react'

import axios from 'axios';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

import { Switch, Route } from 'react-router-dom'



class Create extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:"hyd",
            email:"",
            phone:9080706050
        };
        this.updateStateEmail = this.updateStateEmail.bind(this);
        this.createVenue = this.createVenue.bind(this);
    }
    createVenue(e){
        axios.post(`/api/venueCreate/`, this.state)
            .then(res => {
                this.props.updatemethod()
            });
    }

    updateStateEmail(e){
        this.setState({email:e.target.value})
        // debugger;
        // console.log(e.target.value);
        // console.log(this.state);
    }
    // updateStatePhone(e){
    //     this.setState({phone:e.target.value})
    //     // debugger;
    //     console.log(e.target.value);
    //     console.log(this.state);
    // }
    render(){
        return(
            <div>
                <TextField type="text" value={this.state.email}
                           onChange = {this.updateStateEmail} />
                {/*<input type="text" value={this.state.phone}*/}
                {/*onChange={this.updateStatePhone} />*/}
                <Button type="submit" onClick={this.createVenue}> Submit</Button>

            </div>
        )
    }
}

export default Create