import React          from 'react';
import TextField      from 'material-ui/TextField';
import Colors         from 'material-ui/styles/colors';
import RaisedButton   from 'material-ui/RaisedButton';
import ActionLock     from 'material-ui/svg-icons/action/lock';
import Snackbar       from 'material-ui/Snackbar';

import {UserActions}  from '../actions'
import {connect}      from 'react-redux';
import {AppStyle}     from '../utils';

const styles = AppStyle;

const {loginUser, logoutAndRedirect, logout} = UserActions;


class LoginForm extends React.Component {

  componentWillMount() {
    console.trace('componentWillMount', this.props);
  }
  componentWillReceiveProps(nextProps) {
    console.trace('componentWillReceiveProps', this.props);
  }

  render() {
    return (<form ref='loginForm'>
      <h1>Login Here</h1>
      <p>
        <Link to='/signup'>New user? Signup Here</Link>
      </p>

      <TextField
        ref='email'
        hintText='enter email'
        floatingLabelText='Email'
        type='email'
        valueLink={this.linkState('email')}
      />
      <br />
      <TextField
        ref='password'
        hintText='enter password'
        floatingLabelText='Password'
        type='password'
        valueLink={this.linkState('password')}
      />
      <br />
      <RaisedButton
        label="Login"
        labelPosition="before"
        primary={true}
        onClick={() => loginUser.bind(this)(this.ref.email.value, this.ref.password.value)}
        icon={ActionLock}
      />
    </form>)
  }

}

const mapStateToProps = (state) => ({
  'token': state.auth.token,
  'user': state.auth.userName,
  'isAuthenticated': state.auth.token ? true : false,
});

export default connect(mapStateToProps)(LoginForm);
