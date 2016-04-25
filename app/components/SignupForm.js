import React        from 'react';
import TextField    from 'material-ui/TextField';
import Colors       from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import ActionLock   from 'material-ui/svg-icons/action/lock';
import Snackbar     from 'material-ui/Snackbar';

const styles = {
  errorStyle: {
    color: Colors.red500,
  },
  underlineStyle: {
    borderColor: Colors.blue700,
  },
};

const LoginForm = () => (
  <form ref='loginForm'>
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
      onClick={}
      icon={ActionLock}
    />
  </form>
);

export default LoginForm;
