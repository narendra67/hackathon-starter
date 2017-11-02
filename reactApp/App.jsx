import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        };
        this.updatePage = this.updatePage.bind(this);
        this.editVenue = this.editVenue.bind(this);

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
    editVenue(id){
        this.setState({editId:id})
    }

    render() {
        var my = {
            padding: 10,
        }

        return (
            <div>
                {/*<Header/>*/}
                <div>
                    <div >
                    {this.state.posts.map((venue, i) => <TableRow key = {i}
                                                                  data = {venue} EditVenue={this.editVenue}/>)}

                    </div>
                </div>
                <VenueCreate updatemethod={this.updatePage}/>
                <EditVenue editId={this.state.editId} updatemethod={this.updatePage}/>
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
        this.props.EditVenue(this.props.data._id);
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
                <button type="submit" onClick={this.sendEditId}>Update</button>
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
                <input type="text" value={this.state.email}
                       onChange = {this.updateStateEmail} />
                {/*<input type="text" value={this.state.phone}*/}
                       {/*onChange={this.updateStatePhone} />*/}
                <input type="submit" onClick={this.createVenue}/>
                {/*<input type="submit" onClick={this.props.updatemethod}/>*/}
            </div>
        )
    }
}

class EditVenue extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:"hyd",
            email:"",
            phone:9080706050
        };
        this.updateStateEmail = this.updateStateEmail.bind(this);
        this.updateVenue = this.updateVenue.bind(this);
    }
    updateVenue(e){
        var id=this.props.editId;
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

        return(
            <div>
                <input type="text" onChange = {this.updateStateEmail}/>

                <input type="submit" value="Update" onClick={this.updateVenue}/>

            </div>
        )
    }
}

export default App;