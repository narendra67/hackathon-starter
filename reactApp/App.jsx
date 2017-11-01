import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        axios.get(`/api/venueGet/`)
            .then(res => {
                console.log(res.data)
                console.log(res)

                const posts = res.data.values
                this.setState({posts:posts });
            });
    }

    render() {
        var my = {
            color:"red",
        }
        return (
            <div>
                {/*<Header/>*/}
                <table>
                    <tbody>
                    {this.state.posts.map((venue, i) => <TableRow key = {i}
                                                                  data = {venue} />)}

                    </tbody>
                </table>
            </div>
        {VenueCreate}
        );
    }
}

class TableRow extends React.Component {
    render(){
        return(
            <tr>
                <td>{this.props.data.name}</td>
                <td>{this.props.data.email}</td>
                <td>{this.props.data.phone}</td>
            </tr>
        )
    }
}

class VenueCreate extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name:"",
            email:"",
            phone:""
        };
        this.updateStateEmail = this.updateStateEmail.bind(this);

    }

    updateStateEmail(e){
        this.setState({email:e.target.value})
        debugger;
        console.log(e.target.value);
        console.log(this.state);
    }
    render(){
        return{
            <div>
             <input type="text" value={this.state.email}
             onChage = {this.updateStateEmail} />
            </div>
        }
    }
}

export default App;