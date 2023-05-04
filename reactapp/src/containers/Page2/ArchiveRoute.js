import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Archive from './Archive';

class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route path="/Archive/" component={Archive} />
            </Switch>
        )
    }
}

export default withRouter(Routes)