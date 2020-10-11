import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const Dashboard = React.lazy(() => import('./App/components/Dashboard'));
const Profile = React.lazy(() => import('./App/components/Profile'));

const routes = [
    { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/profile', exact: true, name: 'Profile', component: Profile },
];

export default routes;