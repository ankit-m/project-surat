import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import Blob from './Blob';

const styles = {
  list: {
    marginTop: '20px',
  },
};

function mapStatetoProps(state) {
  return { ...state.reducer };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

@connect(mapStatetoProps, mapDispatchToProps)
class BlobList extends React.Component {
  render() {
    if (this.props.location.coords === null) {
      return <div className="text-center" style={styles.list}>getting your location ... </div>;
    }
    if (!this.props.node.nearByNodes) {
      return <div className="text-center" style={styles.list}>loading nearby nodes ... </div>;
    }
    const blobs = this.props.node.nearByNodes.map((node, key) => (
      <Blob node={node} key={key} deleteHandler={this.props.removeNode} location={this.props.location} />)
    );
    return (
      <ListGroup style={styles.list}>
        {blobs}
      </ListGroup>
    );
  }
}

BlobList.propTypes = {
  getNodes: React.PropTypes.func,
  node: React.PropTypes.object,
  removeNode: React.PropTypes.func,
  location: React.PropTypes.array,
};

export default BlobList;
