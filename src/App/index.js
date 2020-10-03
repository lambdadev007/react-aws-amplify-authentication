import React, { Suspense, createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

import '../../node_modules/font-awesome/scss/font-awesome.scss';

import Loader from './layout/Loader'
import Aux from "../hoc/_Aux";
import ScrollToTop from './layout/ScrollToTop';
import routes from "../route";
import { Auth, Hub } from 'aws-amplify';
import {connect} from 'react-redux';

const AdminLayout = Loadable({
    loader: () => import('./layout/AdminLayout'),
    loading: Loader
});

export const CognitoAuthUserContext = createContext(undefined);

const App = props => {
    let [user, setUser] = useState(undefined);

    const menu = routes.map((route, index) => {
        return (route.component) ? (
            <Route
                key={index}
                path={route.path}
                exact={route.exact}
                name={route.name}
                render={props => (
                    <route.component {...props} />
                )} />
        ) : (null);
    });

    console.log('[props]', props);

    useEffect(() => {
        const updateUser = async (authState) => {
            try {
                const user = await Auth.currentAuthenticatedUser();
                setUser(user);
            } catch (error) {
                setUser(undefined);
            }
        };
        Hub.listen('auth', updateUser); // listen for login/signup events

        updateUser(); // check manually the first time because we won't get a Hub event
        return () => Hub.remove('auth', updateUser); // cleanup
    }, []);

    useEffect(() => {
        console.log('[user]', user);
    }, [user]);

    return (
        <CognitoAuthUserContext.Provider value={user}>
            <Aux>
                <ScrollToTop>
                    <Suspense fallback={<Loader/>}>
                        <Router>
                            <Switch>
                                {menu}
                                {
                                    user ? (
                                        <Route path="/" component={AdminLayout} />
                                    ) : <Redirect from="/" to={props.defaultAuthPath} />
                                }
                            </Switch>
                        </Router>
                    </Suspense>
                </ScrollToTop>
            </Aux>
        </CognitoAuthUserContext.Provider>
    );
};

const mapStateToProps = state => {
    return {
        defaultPath: state.defaultPath,
        defaultAuthPath: state.defaultAuthPath,
        isFullScreen: state.isFullScreen,
        collapseMenu: state.collapseMenu,
        configBlock: state.configBlock,
        layout: state.layout
    }
};

export default connect(mapStateToProps) (App);
