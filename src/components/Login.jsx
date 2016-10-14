import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import Title from 'react-title-component';

import serializeFormData from '../helpers/serializeFormData.jsx';
import ArticleHeader from './ArticleHeader.jsx';
import { login } from '../actions/User.jsx';

const Login = ({ login, push }) => (
    <form onSubmit={ (event) => { login(serializeFormData(new FormData(event.target))).then((user) => push('/user/'+user.username)); event.preventDefault(); }}>
        <Title render={(prevTitle) => prevTitle + ' - login'} />
        <input type="text" name="username" />
        <input type="password" name="password" />
        <input type="submit" value="Login" />
        <button type="button" onClick={ () => window.location = '/api/auth/google' } style={{backgroundImage: 'url("/dist/googlelogin.png")', width: 200, height: 40, backgroundSize: '100%', display: 'block'}} />
    </form>
);

export default connect(null, { login, push })(Login);
