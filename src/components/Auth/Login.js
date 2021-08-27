import React from 'react';
import PropTypes from 'prop-types';

const Login = props => {
    return(
        <div className="login-container">
            <div className="login">
                <h2>Авторизация</h2>
                <p>Введите логин и пароль вашего аккаунта Github</p>
                <button onClick={() => props.authenticate()} className="github">Войти</button>
            </div>
        </div>
    )
}

Login.propTpes = {
    authenticate: PropTypes.func.isRequired
}

export default Login;