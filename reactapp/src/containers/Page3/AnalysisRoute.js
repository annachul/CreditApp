import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Analysis from './Analysis';

class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route path="/Analysis/" component={Analysis} />
            </Switch>
        )
    }
}

export default withRouter(Routes)