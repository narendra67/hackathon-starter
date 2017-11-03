import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            clicked: false
        };
        this.updatePage = this.updatePage.bind(this);
        this.editVenue = this.editVenue.bind(this);
        // this.handleClick = this.handleClick.bind(this);

    }

    componentDidMount() {
        this.updatePage()
    }


    updatePage(){
        axios.get(`/api/venueGet/`)
            .then(res => {
                // console.log(res.data)data
                console.log(res.data.values)
// debugger
                const posts = res.data.values
                this.setState({posts:posts });
            });

    }
    editVenue(value){
        this.state.editValues ? this.setState({editValues:null}) :this.setState({editValues:value})

    }

    // handleClick() {
    //     console.log("clicked")
    //     this.setState({
    //         clicked: true
    //     });
    // }

    render() {
        var my = {
            padding: 10,
        }

        return (
            <div>
                {this.state.editValues ? <EditVenue editValues={this.state.editValues} updatemethod={this.updatePage}/>: null}

                {/*<Header/>*/}
                <div>
                    <div >
                    {this.state.posts.map((venue, i) => <TableRow key = {i}
                                                                  data = {venue}
                                                                  EditVenue={this.editVenue}/>)}
                    </div>
                </div>
                <VenueCreate updatemethod={this.updatePage}/>
                {this.state.editValues ? <DeleteVenue editValues={this.state.editValues} updatemethod={this.updatePage}/>: null}

            </div>
        );
    }
}

class TableRow extends React.Component {
    constructor(props){
        super(props);
        this.sendEditId = this.sendEditId.bind(this);
    }

    sendEditId(){
        this.props.EditVenue(this.props.data);
    }

    render(){
        var my = {
            padding: 20,

        }
        return(
            <div style={my}>
                <div>{this.props.data._id}</div>
                <div>{this.props.data.name}</div>
                <div>{this.props.data.email}</div>
                <div>{this.props.data.phone}</div>
                <Button type="submit" onClick={this.sendEditId}>Update</Button>
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
                console.log(res.data)
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
                {/*<input type="submit" onClick={this.props.updatemethod}/>*/}
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
        console.log("=============");
        console.log(id);
        axios.post(`/api/venueUpdate/`+id, this.state)
            .then(res => {
                console.log(res.data)
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
        var my = {
            padding: 20,

        }
        // var val = this.props.editValues._id
    console.log(this.props.editValues.name)
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

class DeleteVenue extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
        this.deleteVenue = this.deleteVenue.bind(this);
    }

    deleteVenue(e){
        var id=this.props.editValues._id;
        console.log("=============");
        console.log(id);
        axios.post(`/api/venueDelete/`+id)
            .then(res => {
                console.log(res.data)
                this.props.updatemethod()
            });
    }

    render(){

        console.log(this.props.editValues.name)
        return(
            <div>

                <Button type="submit" onClick={this.deleteVenue}>Delete</Button>

            </div>
        )
    }

}

export default App;