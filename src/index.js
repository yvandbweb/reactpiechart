import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';

import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'

const routing = (
        

        <div class="page-container">
            <Router>
                <div className="row1">                        
                <div class="react">A React Pie Chart generator App</div>
                    <ul>
                      <li className="tmp">
                        <Link to={`${process.env.PUBLIC_URL}/`}><u>Posts</u></Link>
                      </li>
                      <li  className="tmp">
                        <Link to={`${process.env.PUBLIC_URL}/users`}><u>Users</u></Link>
                      </li>
                    </ul>
                </div>                
                <Switch>
                  <Route exact path={`${process.env.PUBLIC_URL}/`} component={App} />
                </Switch>            
            </Router> 
            <footer className="fixed-bottom">
              <div className="footer-copyright text-center py-3">© 2020 Copyright:
                ydbweb.com
              </div>
            </footer>   
        </div>
     


)
ReactDOM.render(routing, document.getElementById('root'))

            /*
            <Switch>
              <Route exact path={`${process.env.PUBLIC_URL}/`} component={App} />
              <Route path={`${process.env.PUBLIC_URL}/users`} component={AppUser} />
            </Switch>
            */
