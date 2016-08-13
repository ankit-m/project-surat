import React from 'react';
import {
  ListGroup,
  ListGroupItem,
  Form,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';


const styles = {
  add: {
    border: '0',
    textAlign: 'center',
    opacity: '0.3',
  },
  form: {
    border: '0',
    opacity: '0.3',
    backgroundColor: '#f0f0f0',
  },
};

export class NewBlob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      data: 'Your Message',
      pass: '',
      range: '',
      expire: '',
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
    this.props.handler(
      this.state.data,
      this.state.range,
      this.state.pass,
      this.state.expire
    );
  }
  clearForm() {
  }
  render() {
    if (!this.state.showForm) {
      return (
        <ListGroup>
          <ListGroupItem style={styles.add}>
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
          <ListGroupItem style={styles.form}>
            <FormGroup controlId="data">
              <FormControl componentClass="textarea" defaultValue={this.state.data} />
            </FormGroup>
            <Form inline>
              <FormGroup controlId="range">
                <FormControl type="number" placeholder="Range (metres)" defaultValue={this.state.range} />
              </FormGroup>
              {' '}
              <FormGroup controlId="pass">
                <FormControl type="number" placeholder="PIN" defaultValue={this.state.pass} />
              </FormGroup>
              {' '}
              <FormGroup controlId="expire">
                <FormControl type="number" placeholder="Lifetime (minutes)" defaultValue={this.state.expire} />
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

NewBlob.propTypes = {
  handler: React.PropTypes.func.isRequired,
};

export default NewBlob;
