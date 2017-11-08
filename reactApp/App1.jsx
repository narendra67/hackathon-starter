import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

class App extends React.Component {
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
        this.state.editValues ? this.setState({editValues:null}) :this.setState({editValues:value})
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
                {this.state.editValues ? <EditVenue editValues={this.state.editValues} updatemethod={this.updatePage}/>: null}
                {this.state.editValues ? <AddSports editValues={this.state.editValues} updatemethod={this.updatePage}/>: null}
                {this.state.editValues ? <EditSports editValues={this.state.editValues} sportValues={this.state.sportValues} updatemethod={this.updatePage}/>: null}


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

                <VenueCreate updatemethod={this.updatePage}/>



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
        console.log(this.props.data)
        return(
            <div style={my}>t
                {/*<div>{this.props.data._id}</div>*/}
                <div>Name: {this.props.data.name}</div>
                <div>email: {this.props.data.email}</div>
                <div>phone: {this.props.data.phone}</div>
                <div>sports: {this.props.data.sports.map((sport, j) =>
                    <span>
                        {/*sportId = {this.props.data.sports[j]._id}*/}

                            {/*type="submit" onClick={this.sendSportData}>*/}
                        {this.props.data.sports[j].name}
                       ,
                    </span>)}
                </div>

                {/*<div>sports: {this.props.data.sports[i].name}</div>*/}
                <Button type="submit" onClick={this.sendEditData}>Update</Button>
                <Button type="submit" onClick={this.sendEditId}>Delete</Button>
            </div>
        )
    }
}

class VenueCreate extends React.Component {
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

class EditVenue extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            name:this.props.editValues ? this.props.editValues.name : "hyd",
            email:this.props.editValues ? this.props.editValues.email : "enter mail",
            phone:9087609877,
            // sports: [this.props.editValues ? this.props.editValues: "Enter a sport"]
        };
        this.updateStateEmail = this.updateStateEmail.bind(this);
        this.updateVenue = this.updateVenue.bind(this);
        // this.updateStateSports = this.updateStateSports.bind(this);

    }
    updateVenue(e){
        var id=this.props.editValues._id;

        axios.post(`/api/venueUpdate/`+id, this.state)
            .then(res => {
                console.log(res.data)
                this.props.updatemethod()
            });
    }

    updateStateEmail(e){
        this.setState({email:e.target.value})

    }

    // updateStateSports(e){
    //     this.setState({sports:e.target.value})
    //
    // }


    render(){
        var my = {
            padding: 20,

        }

        return(
            <div>
                <TextField
                    label="email"
                    id="email"
                    type="text"  value={this.state.email} onChange = {this.updateStateEmail}/>
                {/*<TextField label="sports" id="sports" type="text" onChange={this.updateStateSports}/>*/}

                <Button type="submit" onClick={this.updateVenue}>Update</Button>

            </div>
        )
    }
}

class AddSports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sports:[],
        }
        this.addSport= this.addSport.bind(this);
        this.updateStateSport= this.updateStateSport.bind(this);
    }

    addSport(e){
        var id=this.props.editValues._id;

        axios.post(`/api/addVenueSport/`+id, this.state)
            .then(res => {
                console.log(res.data)
                this.props.updatemethod()
            });
    }

    updateStateSport(e){
        this.setState({sports:[{name:e.target.value}]})

    }

    render(){

        return(
            <div>
                <TextField
                    label="name"
                    id="name"
                    type="text"  onChange = {this.updateStateSport}/>
                {/*<TextField label="sports" id="sports" type="text" onChange={this.updateStateSports}/>*/}

                <Button type="submit" onClick={this.addSport}>Add Sports</Button>

            </div>
        )
    }

}

/*
class EditSports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sports: [],
        }
        this.updateSport= this.updateSport.bind(this);
        this.updateStateSport= this.updateStateSport.bind(this);
    }

    updateSport(e){
        var id=this.props.editValues._id;
        var ids = this.props.sportValues

        axios.post(`/api/updateVenueSport/`+id+`/`+ids, this.state)
            .then(res => {
                console.log(res.data)
                this.props.updatemethod()
            });
    }

    updateStateSport(e){
        this.setState({sports:[{name:e.target.value}]})

    }

    render(){

        return(
            <div>
                <TextField
                    label="name"
                    id="name"
                    type="text"  onChange = {this.updateStateSport}/>
                {/!*<TextField label="sports" id="sports" type="text" onChange={this.updateStateSports}/>*!/}

                <Button type="submit" onClick={this.addSport}>Update Sports</Button>

            </div>
        )
    }

}
*/

export default App;



