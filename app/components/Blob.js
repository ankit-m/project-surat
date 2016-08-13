import React from 'react';
import { ListGroupItem, Button, Label } from 'react-bootstrap';

const styles = {
  icon: {
    borderRadius: '40px',
    margin: '2px',
  },
  author: {
    margin: '8px',
  },
};

const Blob = (props) => (
  <ListGroupItem className="clearfix">
    <div className="col-md-9">
      {props.node.data}
    </div>
    <div className="pull-right">
      <small className="text-muted" style={styles.author} >{props.node.owner}</small>
      <span style={styles.icon}>
        <Label bsStyle="warning"><small>{`${props.node.range} m`}</small></Label>
      </span>
      {/*<span style={styles.icon}>
        <Label bsStyle="default">
          <span className="glyphicon glyphicon-lock" />
        </Label>
      </span>*/}
      <Button bsStyle="danger" style={styles.icon} bsSize="xsmall">
        <span className="glyphicon glyphicon-remove" />
      </Button>
    </div>
  </ListGroupItem>
);

Blob.propTypes = {
  node: React.PropTypes.object,
  deleteHandler: React.PropTypes.func,
};

export default Blob;
