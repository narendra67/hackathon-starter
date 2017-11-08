import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import axios from 'axios';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

// import Venues from './Venues.jsx'
import VenueCreate from './Create.jsx'
import EditVenue from './Update.jsx'

class Venues extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            // sports:[]
        };
        this.updatePage = this.updatePage.bind(this);
        this.editVenue = this.editVenue.bind(this);
        this.deleteVenue = this.deleteVenue.bind(this);

    }

    componentDidMount() {
        this.updatePage()
    }


    updatePage(){
        axios.get(`/api/venueGet/`)
            .then(res => {
                const posts = res.data.values
                this.setState({posts:posts });
            });

    }
    // updateSports(){
    //     axios.get(`/api/venueGet/`)
    //         .then(res => {
    //             const posts = res.data.values
    //             this.setState({posts:posts });
    //         });
    // }

    editVenue(value){
        this.props.editVenue(value)
        // this.state.editValues ? this.setState({editValues:null}) :this.setState({editValues:value})
    }
    deleteVenue(id){
        axios.post(`/api/venueDelete/`+id)
            .then(res => {
                console.log(res.data)
                this.updatePage()
            });
    }
    editSport(ids){
        this.setState({sportValues:ids})
    }

    render() {
        var my = {
            padding: 10,
        }

        return (
            <div>
                {/*{this.state.editValues ? <EditVenue editValues={this.state.editValues} updatemethod={this.updatePage}/>: null}*/}
                {/*{this.state.editValues ? <AddSports editValues={this.state.editValues} updatemethod={this.updatePage}/>: null}*/}
                {/*{this.state.editValues ? <EditSports editValues={this.state.editValues} sportValues={this.state.sportValues} updatemethod={this.updatePage}/>: null}*/}


                <div >
                    {this.state.posts.map((venue, i) => <TableRow key = {i}
                                                                  data = {venue}
                                                                  EditVenue={this.editVenue}
                                                                  DeleteVenue={this.deleteVenue}
                                                                  EditSport={this.editSport}
                    />)}
                </div>
                {/*<div >*/}
                {/*{this.state.sports.map((sport, i) => <TableRow key = {i}*/}
                {/*data = {sport}*/}
                {/*EditVenue={this.editVenue}*/}
                {/*DeleteVenue={this.deleteVenue}*/}
                {/*/>)}*/}
                {/*</div>*/}

                {/*<VenueCreate updatemethod={this.updatePage}/>*/}



            </div>
        );
    }
}

class TableRow extends React.Component {
    constructor(props){
        super(props);
        this.sendEditData = this.sendEditData.bind(this);
        this.sendEditId = this.sendEditId.bind(this);
        this.sendSportData = this.sendSportData.bind(this);
    }

    sendEditData(){
        this.props.EditVenue(this.props.data);
    }

    sendEditId(){
        this.props.DeleteVenue(this.props.data._id);
    }
    sendSportData(){
        this.props.EditSport(this.props.data.sports.this._id);
    }

    render(){
        var my = {
            padding: 20,
            float: "left",
            border: " 1px solid black",
            width: "300px",
            margin: "5px"
        }
        // console.log(this.props.data)
        return(
            <div style={my}>
                {/*<div>{this.props.data._id}</div>*/}
                <div>Name: {this.props.data.name}</div>
                <div>email: {this.props.data.email}</div>
                <div>phone: {this.props.data.phone}</div>
                <div>sports: {this.props.data.sports.map((sport, j) =>
                    <span key={j}>
                        {/*sportId = {this.props.data.sports[j]._id}*/}

                        {/*type="submit" onClick={this.sendSportData}>*/}
                        {this.props.data.sports[j].name}
                        ,
                    </span>)}
                </div>

                {/*<div>sports: {this.props.data.sports[i].name}</div>*/}
                <Link to="/update_venue" onClick={this.sendEditData}>Update</Link>
                <Button type="submit" onClick={this.sendEditId}>Delete</Button>
            </div>
        )
    }
}

export default Venues