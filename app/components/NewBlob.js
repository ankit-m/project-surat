import React from 'react';

class NewBlob extends React.Component {
  constructor(props) {
    super(props);
    this.state.showForm = false;
    this.onClickAdd = this.onClickAdd.bind(this);
  }
  onClickAdd() {
    this.setState({ showForm: true });
  }
  render() {
    return (<h3>hi</h3>);
  }
}

export default NewBlob;
