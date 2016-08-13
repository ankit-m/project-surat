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
  componentDidMount() {
    // getlocation here
    this.props.getNodes([12.396, 34.670]);
  }
  render() {
    if (!this.props.node.nearByNodes) {
      return <div>loading ... </div>;
    }
    const blobs = this.props.node.nearByNodes.map((node, key) => <Blob node={node} key={key} />);
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
};

export default BlobList;
