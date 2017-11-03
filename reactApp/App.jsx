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
            clicked: false
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

    render() {
        var my = {
            padding: 10,
        }

        return (
            <div>
                {this.state.editValues ? <EditVenue editValues={this.state.editValues} updatemethod={this.updatePage}/>: null}

                <div>
                    <div >
                    {this.state.posts.map((venue, i) => <TableRow key = {i}
                                                                  data = {venue}
                                                                  EditVenue={this.editVenue}
                                                                  DeleteVenue={this.deleteVenue}
                    />)}
                    </div>
                </div>
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
    }

    sendEditData(){
        this.props.EditVenue(this.props.data);
    }

    sendEditId(){
        this.props.DeleteVenue(this.props.data._id);
    }

    render(){
        var my = {
            padding: 20,
            float: "left",
            border: " 1px solid black",
            width: "300px",
            margin: "5px"
        }
        return(
            <div style={my}>
                <div>{this.props.data._id}</div>
                <div>{this.props.data.name}</div>
                <div>{this.props.data.email}</div>
                <div>{this.props.data.phone}</div>
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
            phone:9087609877
        };
        this.updateStateEmail = this.updateStateEmail.bind(this);
        this.updateVenue = this.updateVenue.bind(this);
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

                <Button type="submit" onClick={this.updateVenue}>Update</Button>

            </div>
        )
    }
}


export default App;