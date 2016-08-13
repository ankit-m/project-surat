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
      // .then((dat) => {
      //   console.log(dat);
      // });
  }
  updateDisplay() {
    // 12.396, 34.670

  }
  render() {
    console.log(this.props.node);
    return (
      <div>
        asda
      </div>
    );
  }
}

export default BlobList;
