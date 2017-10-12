import React, {Component} from 'react'
import {Router, Route} from 'react-router-dom'
import Header from './header'
import Dashboard from './dashboard'
import History from './history'

import createBrowserHistory from 'history/createBrowserHistory';
const customHistory = createBrowserHistory();

class App extends Component {
    render() {
        return (
            <div className="app">
                <Router history={customHistory}>
                    <div>
                        <Header/>
                        <Route path="/dashboard" component = {Dashboard}/>
                        <Route path="/" component = {Dashboard} exact/>
                        <Route path="/history" component = {History} exact/>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
