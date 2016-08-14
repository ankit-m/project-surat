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
  },
  form: {
    border: '0',
    backgroundColor: '#f5f5f5',
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
      data: '',
      pass: '',
      range: '',
      expire: '',
      owner: '',
    };
    this.toggleShowForm = this.toggleShowForm.bind(this);
    this.cancelForm = this.cancelForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.setData = this.setData.bind(this);
    this.setRange = this.setRange.bind(this);
    this.setPass = this.setPass.bind(this);
    this.setExpiry = this.setExpiry.bind(this);
    this.setOwner = this.setOwner.bind(this);
  }
  setData(e) { this.setState({ data: e.target.value }); }
  setPass(e) { this.setState({ pass: e.target.value }); }
  setRange(e) { this.setState({ range: e.target.value }); }
  setExpiry(e) { this.setState({ expire: e.target.value }); }
  setOwner(e) { this.setState({ owner: e.target.value }); }
  toggleShowForm() {
    this.setState({ showForm: true });
  }
  cancelForm() {
    this.clearForm();
    this.setState({ showForm: false });
  }
  submitForm() {
    const coords = this.props.location.coords;
    const isProtected = false;
    const password = '';
    this.props.saveNode({
      data: { type: 'txt', content: this.state.data },
      range: '',
      password,
      expiry: '',
      coords,
      owner: this.state.owner || 'Anonymous',
      isProtected,
    });
    this.setState({ showForm: false });
  }
  clearForm() {
    this.setState({
      data: '',
      owner: '',
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
        <ListGroup style={{ margin: '0 10px' }}>
          <ListGroupItem style={styles.form} className="clearfix">
            <FormGroup controlId="data">
              <FormControl componentClass="textarea" placeholder="Your message" value={this.state.data} onChange={this.setData} />
            </FormGroup>
            <Form inline>
              <FormGroup controlId="owner">
                <FormControl type="textarea" placeholder="Owner" value={this.state.owner} onChange={this.setOwner} />
              </FormGroup>
              <div className="clearfix pull-right">
                <Button onClick={this.cancelForm}>Cancel</Button>
                {'  '}
                <Button onClick={this.submitForm}>Done</Button>
              </div>
            </Form>
          </ListGroupItem>
        </ListGroup>
      </div>
    );
  }
}

NewBlob.propTypes = {
  saveNode: React.PropTypes.func,
  location: React.PropTypes.object,
};

export default NewBlob;
