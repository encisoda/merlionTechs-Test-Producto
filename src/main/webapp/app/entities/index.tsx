import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Product from './product';
import Sales from './sales';
import State from './state';
import Shipped from './shipped';
import Delivered from './delivered';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}product`} component={Product} />
      <ErrorBoundaryRoute path={`${match.url}sales`} component={Sales} />
      <ErrorBoundaryRoute path={`${match.url}state`} component={State} />
      <ErrorBoundaryRoute path={`${match.url}shipped`} component={Shipped} />
      <ErrorBoundaryRoute path={`${match.url}delivered`} component={Delivered} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
