import React from 'react';
import {
  ListGroup,
  ListGroupItem,
  Form,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';

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

function mapStatetoProps(state) {
  return { ...state.reducer };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

@connect(mapStatetoProps, mapDispatchToProps)
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
    this.clearForm = this.clearForm.bind(this);
    this.setData = this.setData.bind(this);
    this.setRange = this.setRange.bind(this);
    this.setPass = this.setPass.bind(this);
    this.setExpiry = this.setExpiry.bind(this);
  }
  setData(e) { this.setState({ data: e.target.value }); }
  setPass(e) { this.setState({ pass: e.target.value }); }
  setRange(e) { this.setState({ range: e.target.value }); }
  setExpiry(e) { this.setState({ expire: e.target.value }); }
  toggleShowForm() {
    this.setState({ showForm: true });
  }
  cancelForm() {
    this.clearForm();
    this.setState({ showForm: false });
  }
  submitForm() {
    const coords = [12.396, 34.670];
    const owner = 'Ankit Muchhala';
    const isProtected = false;
    const password = '';
    this.props.saveNode({
      data: this.state.data,
      range: this.state.range,
      password,
      expiry: this.state.expire,
      coords,
      owner,
      isProtected,
    });
    this.setState({ showForm: false });
  }
  clearForm() {
    this.setState({
      data: 'Your Message',
      pass: '',
      expire: '',
      range: '',
    });
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
              <FormControl componentClass="textarea" value={this.state.data} onChange={this.setData} />
            </FormGroup>
            <Form inline>
              <FormGroup controlId="range">
                <FormControl type="number" placeholder="Range (metres)" value={this.state.range} onChange={this.setRange} />
              </FormGroup>
              {' '}
              <FormGroup controlId="pass">
                <FormControl type="number" placeholder="PIN" value={this.state.pass} onChange={this.setPass} />
              </FormGroup>
              {' '}
              <FormGroup controlId="expire">
                <FormControl type="number" placeholder="Lifetime (minutes)" value={this.state.expire} onChange={this.setExpiry} />
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
  saveNode: React.PropTypes.func,
};

export default NewBlob;
