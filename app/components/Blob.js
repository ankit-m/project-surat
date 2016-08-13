import React from 'react';
import { ListGroup, ListGroupItem, Button, Label } from 'react-bootstrap';

const styles = {
  icon: {
    borderRadius: '40px',
    margin: '2px',
  },
  list: {
    marginTop: '20px',
  },
  author: {
    margin: '8px',
  },
};

const Blob = (props) => {
  const a = 2;
  return (
    <ListGroup style={styles.list}>
      <ListGroupItem className="clearfix">
        <div className="col-md-9">
          {props.data}
        </div>
        <div className="pull-right">
          <small className="text-muted" style={styles.author} >{props.author}</small>
          <span style={styles.icon}>
            <Label bsStyle="warning"><small>{props.range} + 'm'</small></Label>
          </span>
          <span style={styles.icon}>
            <Label bsStyle="default">
              <span className="glyphicon glyphicon-lock" />
            </Label>
          </span>
          <Button bsStyle="danger" style={styles.icon} bsSize="xsmall">
            <span className="glyphicon glyphicon-remove" />
          </Button>
        </div>
      </ListGroupItem>
    </ListGroup>
  );
};

Blob.propTypes = {
  data: React.PropTypes.string.isRequired,
  range: React.PropTypes.number.isRequired,
  pass: React.PropTypes.number
}

export default Blob;
