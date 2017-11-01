import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        };
        this.xyz = this.xyz.bind(this);

    }

    componentDidMount() {
        this.xyz()
    }


    xyz(){
        axios.get(`/api/venueGet/`)
            .then(res => {
                // console.log(res.data)data
                console.log(res.data.values)
// debugger
                const posts = res.data.values
                this.setState({posts:posts });
            });

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
                                                                  data = {venue} />)}

                    </div>
                </div>
                <VenueCreate updatemethod={this.xyz}/>
                {this.state.posts.map((venue, i) => <UpdateVenue updatemethod={this.xyz} key = {i}
                                                              data = {venue} />)}
            </div>
        );
    }
}

class TableRow extends React.Component {
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
                <button type="submit" onClick={}>Update</button>
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

class UpdateVenue extends React.Component{
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
        var id=this.props.data._id;
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
                <div>
                    <div style={my}>{this.props.data._id}</div>
                    <div style={my}>{this.props.data.name}</div>
                    <div style={my}>{this.props.data.email}</div>
                    <div style={my}>{this.props.data.phone}</div>

                </div>
                <input type="text" value={this.state.email}
                       onChange = {this.updateStateEmail} />
                <input type="submit" value="Update" onClick={this.createVenue}/>
                {/*<input type="text" value={this.state.phone}*/}
                {/*onChange={this.updateStatePhone} />*/}

                {/*<input type="submit" onClick={this.props.updatemethod}/>*/}
            </div>
        )
    }
}

export default App;