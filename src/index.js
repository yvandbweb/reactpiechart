import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Graph1 from './components/Graph1';
import Graph2 from './components/Graph2';
import * as serviceWorker from './serviceWorker';
import './index.css';

import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'

const routing = (


        <div className="page-container">
            <Router>
                <div className="row1">
                <div className="react">A React Pie Chart generator</div>
                <ul>
                  <li className="tmp">
                    <Link to={`${process.env.PUBLIC_URL}/`}><u>Graph1</u></Link>
                  </li>
                  <li  className="tmp">
                    <Link to={`${process.env.PUBLIC_URL}/graph2`}><u>Graph2</u></Link>
                  </li>
                </ul>
                </div>
                <div className="row centered">
                <Switch>
                  <Route exact path={`${process.env.PUBLIC_URL}/`} component={Graph1} />
                  <Route exact path={`${process.env.PUBLIC_URL}/graph2`} component={Graph2} />
                </Switch>
                </div>
            </Router>    
        </div>



)
ReactDOM.render(routing, document.getElementById('root'))
