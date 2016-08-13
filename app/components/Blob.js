import React from 'react';
import { ListGroup, ListGroupItem, Button, Label } from 'react-bootstrap';

const iconStyle = {
  borderRadius: '40px',
  margin: '2px',
};
// Take in arguments from Blobloader here!
const Blob = () => (
  <ListGroup style={{ marginTop: '20px' }}>
    <ListGroupItem className="clearfix">
      <div className="col-md-10">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </div>
      <div className="pull-right">
        <small className="text-muted" style={{ margin: '8px' }} >Kushan Joshi</small>
        <span style={iconStyle}>
          <Label bsStyle="warning"><small>100m</small></Label>
        </span>
        <span style={iconStyle}>
          <Label bsStyle="default">
            <span className="glyphicon glyphicon-lock" />
          </Label>
        </span>
        <Button bsStyle="danger" style={iconStyle} bsSize="xsmall">
          <span className="glyphicon glyphicon-remove" />
        </Button>
      </div>
    </ListGroupItem>
  </ListGroup>
);

export default Blob;
