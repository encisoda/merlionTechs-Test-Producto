import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IProduct } from 'app/shared/model/product.model';
import { getEntities as getProducts } from 'app/entities/product/product.reducer';
import { getEntity, updateEntity, createEntity, reset } from './sales.reducer';
import { ISales } from 'app/shared/model/sales.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISalesUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SalesUpdate = (props: ISalesUpdateProps) => {
  const [productId, setProductId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { salesEntity, products, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/shipped');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getProducts();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...salesEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <Modal isOpen toggle={handleClose}>
        <ModalHeader toggle={handleClose}>
          Confirmar operación de entrega
        </ModalHeader>
        <ModalBody>
      <Row className="justify-content-center">

          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : salesEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <AvInput id="sales-id" type="hidden" className="form-control" name="id" required readOnly />
                  <p>¿Está seguro de que desea entregar el producto?</p>
                </AvGroup>
              ) : null}
              <AvGroup>
                <AvInput
                  id="sales-state"
                  type="hidden"
                  className="form-control"
                  name="state"
                  value='DELIVERED'
                >
                </AvInput>
              </AvGroup>
              <AvGroup>
                <AvInput id="sales-product" type="hidden" className="form-control" name="product.id">
                  <option value="" key="0" />
                  {products
                    ? products.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <ModalFooter>
              <Button color="secondary" onClick={handleClose}>
                <FontAwesomeIcon icon="ban" />
                &nbsp;
                <Translate contentKey="entity.action.cancel">Cancel</Translate>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                Entregar
              </Button>
              </ModalFooter>
            </AvForm>
          )}
      </Row>
      </ModalBody>
    </Modal>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  products: storeState.product.entities,
  salesEntity: storeState.sales.entity,
  loading: storeState.sales.loading,
  updating: storeState.sales.updating,
  updateSuccess: storeState.sales.updateSuccess,
});

const mapDispatchToProps = {
  getProducts,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SalesUpdate);
