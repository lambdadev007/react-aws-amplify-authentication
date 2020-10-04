import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import('./App/components/Dashboard'));

const routes = [
    { path: '/dashboard', exact: true, name: 'Dashboard', component: DashboardDefault },
];

export default routes;