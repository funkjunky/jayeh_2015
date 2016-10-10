import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'

import SerializeForm from '../helpers/serializeform.jsx';
import ArticleHeader from './ArticleHeader.jsx';
import { login } from '../actions/User.jsx';

var Login = ({ login, push }) => (
    <form onSubmit={ ({ target }) => login(target).then((user) => push('/user/'+user.username)) }>
        <input type="text" name="username" />
        <input type="password" name="password" />
        <input type="submit" value="Login" />
        <button type="button" onClick={ () => push('/api/auth/google') } style={{backgroundImage: 'url("/dist/googlelogin.png")', width: 200, height: 40, backgroundSize: '100%', display: 'block'}} />
    </form>
);
//window.location.replace('/api/auth/google');

export default connect(null, { login, push })(Login);
