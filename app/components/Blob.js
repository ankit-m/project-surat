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

class Blob extends React.Component {
  constructor(props) {
    super(props);
    this.deleteBlob = this.deleteBlob.bind(this);
  }
  deleteBlob(e) {
    this.props.deleteHandler(this.props.node.coords);
  }
  measure(coord1, coord2) {
    const lat1 = coord1[0];
    const lon1 = coord1[1];
    const lat2 = coord2[0];
    const lon2 = coord2[1];
    const RAD = 0.000008998719243599958;
    return parseInt(Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(lon1 - lon2, 2)) / RAD);
  }
  render() {
    return (
      <ListGroupItem className="clearfix">
        <div className="col-md-9">
          {this.props.node.data}
        </div>
        <div className="pull-right">
          <small className="text-muted" style={styles.author} >{this.props.node.owner}</small>
          <span style={styles.icon}>
            <Label bsStyle="warning">
              <small>{`${this.measure(this.props.node.coords, this.props.location.coords)} m`}</small>
            </Label>
          </span>
          {/*<span style={styles.icon}>
            <Label bsStyle="default">
              <span className="glyphicon glyphicon-lock" />
            </Label>
          </span>*/}
          <Button bsStyle="danger" style={styles.icon} bsSize="xsmall" onClick={this.deleteBlob}>
            <span className="glyphicon glyphicon-remove" />
          </Button>
        </div>
      </ListGroupItem>
    );
  }
}

Blob.propTypes = {
  node: React.PropTypes.object,
  deleteHandler: React.PropTypes.func,
  location: React.PropTypes.array,
};

export default Blob;
