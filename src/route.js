import React from 'react';

const HomePage = React.lazy(() => import('./App/components/Homepage/index'));
const SignUp = React.lazy(() => import('./App/components/Authentication/SignUp'));
const SignIn = React.lazy(() => import('./App/components/Authentication/SignIn'));
const ResetPassword = React.lazy(() => import('./App/components/Authentication/ResetPassword'));

const route = [
    { path: '/', exact: true, name: 'HomePage', component: HomePage },
    { path: '/auth/register', exact: true, name: 'Register', component: SignUp },
    { path: '/auth/login', exact: true, name: 'Login', component: SignIn },
    { path: '/auth/reset-password', exact: true, name: 'ResetPassword', component: ResetPassword }
];

export default route;