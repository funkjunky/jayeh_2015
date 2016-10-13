import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'

import serializeForm from '../helpers/serializeForm.jsx';
import ArticleHeader from './ArticleHeader.jsx';
import { login } from '../actions/User.jsx';

//TODO: Watch for preventDefault here... because it isn't event.preventDefault... im not sure of this matters.
const Login = ({ login, push }) => (
    <form onSubmit={ (event) => { login(serializeForm(event.target)).then((user) => push('/user/'+user.username)); event.preventDefault(); }}>
        <input type="text" name="username" />
        <input type="password" name="password" />
        <input type="submit" value="Login" />
        <button type="button" onClick={ () => window.location = '/api/auth/google' } style={{backgroundImage: 'url("/dist/googlelogin.png")', width: 200, height: 40, backgroundSize: '100%', display: 'block'}} />
    </form>
);
//window.location.replace('/api/auth/google');

export default connect(null, { login, push })(Login);
