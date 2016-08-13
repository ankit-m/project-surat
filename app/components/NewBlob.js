import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const addStyle = {
  border: '0',
  textAlign: 'center',
  opacity: '0.3',
};

class NewBlob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
    };
    this.toggleShowForm = this.toggleShowForm.bind(this);
    this.cancelForm = this.cancelForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  toggleShowForm() {
    this.setState({ showForm: true });
  }
  cancelForm() {
    this.setState({ showForm: false });
  }
  submitForm() {
  }
  clearForm() {
  }
  render() {
    if (!this.state.showForm) {
      return (
        <ListGroup>
          <ListGroupItem style={addStyle}>
            <div onClick={this.toggleShowForm} style={{ cursor: 'pointer' }}>
              <span className="glyphicon glyphicon-plus-sign" />
              <br />
              Add New Blob
            </div>
          </ListGroupItem>
        </ListGroup>
      );
    }
    return (
      <ListGroup>
        <ListGroupItem style={addStyle}>
          add form HERE!
        </ListGroupItem>
      </ListGroup>
    );
  }
}

export default NewBlob;
