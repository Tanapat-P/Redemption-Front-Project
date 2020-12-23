import React, { Component } from 'react';
import './Register.css';
import axios from '../../config/axios.js';
import { notification } from 'antd';
import { FaThinkPeaks } from 'react-icons/fa';
import { withRouter } from 'react-router-dom';

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

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
    console.log(this.props);
    this.state = {
      firstName: null,
      lastName: null,
      username: null,
      email: null,
      password: null,
      formErrors: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
      },
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (formValid(this.state)) {
      axios
        .post('/users/register', {
          username: this.state.username,
          password: this.state.password,
          firstname: this.state.firstName,
          surname: this.state.lastName,
          email: this.state.email,
        })
        .then((res) => {
          notification.success({
            description: 'Signup successfully',
          });
          this.props.history.push('/login');
        })
        .catch((err) => {
          console.log(err);
          notification.error({
            description: 'Something went wrong.',
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
      case 'firstname':
        formErrors.firstName = value.length < 3 ? 'minimum 3 characaters required' : '';
        break;
      case 'surname':
        formErrors.lastName = value.length < 3 ? 'minimum 3 characaters required' : '';
        break;
      case 'username':
        formErrors.username = value.length < 3 ? 'minimum 3 characaters required' : '';
        break;
      case 'email':
        formErrors.email = emailRegex.test(value) ? '' : 'invalid email address';
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
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                className={formErrors.firstName.length > 0 ? 'error' : null}
                placeholder="First Name"
                type="text"
                name="firstName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.firstName.length > 0 && <span className="errorMessage">{formErrors.firstName}</span>}
            </div>

            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                className={formErrors.lastName.length > 0 ? 'error' : null}
                placeholder="Last Name"
                type="text"
                name="lastName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.lastName.length > 0 && <span className="errorMessage">{formErrors.lastName}</span>}
            </div>

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

            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={formErrors.email.length > 0 ? 'error' : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && <span className="errorMessage">{formErrors.email}</span>}
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

            <div className="createAccount">
              <button type="submit">Create Account</button>
              <small>Already Have an Account?</small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
