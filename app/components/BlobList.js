import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';

function mapStatetoProps(state) {
  return { ...state.reducer };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

@connect(mapStatetoProps, mapDispatchToProps)
class BlobList extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }
  componentDidMount() {
    this.props.getNodes([12.396, 34.670]);
  }
  updateDisplay() {
    // 12.396, 34.670

  }
  render() {
    if (!this.props.node.nearByNodes) {
      return <div> hang on!! bruh~</div>;
    }

    return (
      <div>
        {JSON.stringify(this.props.node.nearByNodes)}
      </div>
    );
  }
}

export default BlobList;
