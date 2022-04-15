import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Graph1 from './components/Graph1';
import Graph2 from './components/Graph2';
import * as serviceWorker from './serviceWorker';
import './index.css';

import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'

const routing = (


        <div>
            <Router>
                <ul className="ul1">
                  <li>
                    <Link to={`${process.env.PUBLIC_URL}/`}><u>Graph1</u></Link>
                  </li>
                  <li>
                    <Link to={`${process.env.PUBLIC_URL}/graph2`}><u>Graph2</u></Link>
                  </li>
                </ul>
                <Switch>
                  <Route exact path={`${process.env.PUBLIC_URL}/`} component={Graph1} />
                  <Route exact path={`${process.env.PUBLIC_URL}/graph2`} component={Graph2} />
                </Switch>
            </Router>
        </div>



)
ReactDOM.render(routing, document.getElementById('root'))
