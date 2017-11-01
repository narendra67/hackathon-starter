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

export default App;