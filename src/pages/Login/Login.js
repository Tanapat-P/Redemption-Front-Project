import React, { Component } from 'react';
import './Login.css';
import axios from '../../config/axios.js';
import LocalStorageService from '../../services/LocalStorageService';
import { notification } from 'antd';
import { withRouter } from 'react-router-dom';

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      formErrors: {
        username: '',
        password: '',
      },
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (formValid(this.state)) {
      axios
        .post('/users/login', { username: this.state.username, password: this.state.password })
        .then((res) => {
          notification.success({
            description: 'Login success.',
          });
          LocalStorageService.setToken(res.data.token);
          this.props.setRole(res.data.role);
          this.props.history.push('/home');
        })
        .catch((err) => {
          console.log(err);
          notification.error({
            description: 'Login failed.',
          });
        });
    } else {
      console.error('FORM INVALID - DISPLAY ERROR MESSAGE');
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case 'username':
        formErrors.username = value.length < 3 ? 'minimum 3 characaters required' : '';
        break;

      case 'password':
        formErrors.password = value.length < 6 ? 'minimum 6 characaters required' : '';
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Login Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="username">
              <label htmlFor="username">Username</label>
              <input
                className={formErrors.username.length > 0 ? 'error' : null}
                placeholder="Username"
                type="username"
                name="username"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.username.length > 0 && <span className="errorMessage">{formErrors.username}</span>}
            </div>

            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                className={formErrors.password.length > 0 ? 'error' : null}
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && <span className="errorMessage">{formErrors.password}</span>}
            </div>

            <div className="Login">
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
