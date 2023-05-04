import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import AddPayment from './AddPayment';

class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route path="/AddPayment/" component={AddPayment} />
            </Switch>
        )
    }
}

export default withRouter(Routes)