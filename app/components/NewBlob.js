import React from 'react';
import {
  ListGroup,
  ListGroupItem,
  Form,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';

const addStyle = {
  border: '0',
  textAlign: 'center',
  opacity: '0.3',
};

const formList = {
  border: '0',
  opacity: '0.3',
  backgroundColor: '#f0f0f0',
};

export class NewBlob extends React.Component {
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
      <div>
        <ListGroup>
          <ListGroupItem style={formList}>
            <FormGroup controlId="data">
              <FormControl componentClass="textarea" placeholder="Your Message" />
            </FormGroup>
            <Form inline>
              <FormGroup controlId="range">
                <FormControl type="number" placeholder="Range (metres)" />
              </FormGroup>
              {' '}
              <FormGroup controlId="pass">
                <FormControl type="number" placeholder="PIN" />
              </FormGroup>
              {' '}
              <FormGroup controlId="pass">
                <FormControl type="number" placeholder="Lifetime (minutes)" />
              </FormGroup>
            </Form>
          </ListGroupItem>
        </ListGroup>
        <div className="clearfix pull-right">
          <Button onClick={this.cancelForm}>Cancel</Button>
          {'  '}
          <Button onClick={this.submitForm}>Done</Button>
        </div>
      </div>
    );
  }
}

export default NewBlob;
