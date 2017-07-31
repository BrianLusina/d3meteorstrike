import React, {Component} from 'react';
import logo from '../images/logo.svg';
import Map from './Map';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <Map/>
            </div>
        );
    }
}

export default App;