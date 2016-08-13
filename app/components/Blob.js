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
  render() {
    return (
      <ListGroupItem className="clearfix">
        <div className="col-md-9">
          {this.props.node.data}
        </div>
        <div className="pull-right">
          <small className="text-muted" style={styles.author} >{this.props.node.owner}</small>
          <span style={styles.icon}>
            <Label bsStyle="warning"><small>{`${this.props.node.range} m`}</small></Label>
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
};

export default Blob;
