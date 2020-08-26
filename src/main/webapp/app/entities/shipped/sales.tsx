import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './sales.reducer';
import { ISales } from 'app/shared/model/sales.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { forEach } from 'lodash';

export interface ISalesProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Sales = (props: ISalesProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { salesList, match, loading } = props;

  const salesList1 = [];

  salesList.forEach(element => ((element.state.toString()) === 'SHIPPED') && salesList1.push(element));

  return (

    <div>
      <h2 id="sales-heading">
        <div className="btn group">
          <Link to={`/state`} className="btn btn-primary jh-create-entity" id="jh-create-entity">
            &nbsp;
            Encargados
          </Link>
        </div>
        <div className="btn group">
          <Link to={`/shipped`} className="btn btn-primary  jh-create-entity" id="jh-create-entity">
            &nbsp;
            Enviados
          </Link>
        </div>
        <div className="btn group">
          <Link to={`/delivered`} className="btn btn-primary  jh-create-entity" id="jh-create-entity">
            &nbsp;
            Entregados
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {salesList1 && salesList1.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  ID
                </th>
                <th>
                  Nombre
                </th>
                <th>
                  Estado
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {salesList1.map((sales, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`product/${sales.product.id}`} color="link" size="sm">
                      {sales.product.id}
                    </Button>
                  </td>
                  <td>{sales.product ? <Link to={`product/${sales.product.id}`}>{sales.product.name}</Link> : ''}</td>
                  <td>
                    {sales.state}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${sales.id}/edit`} color="info" size="sm">
                        <span className="d-none d-md-inline">
                          Entregar
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
             ))
              }
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="testApp.sales.home.notFound">No Sales found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ sales }: IRootState) => ({
  salesList: sales.entities,
  loading: sales.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Sales);
