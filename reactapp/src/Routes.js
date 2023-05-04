import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import AddPayment from './containers/Page1/AddPayment';
import Archive from './containers/Page2/Archive';
import Analysis from './containers/Page3/Analysis';
 
export default class Routes extends Component {
    render() {
        return (
            <div>
                <Switch>
                     <Route path="/AddPayment/" component={AddPayment} />
                     <Route path="/Archive/" component={Archive} />
                     <Route path="/Analysis/" component={Analysis} />
                </Switch>                
            </div>
        )
    }
}
