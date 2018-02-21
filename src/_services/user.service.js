import {authHeader} from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    reset,
    update,
};

function login(phone_number, pin) {

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({phone_number: phone_number, pin: pin})
    };

    return fetch('user/login', requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store customer details and jwt token in local storage to keep customer logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove customer from local storage to log customer out
    localStorage.removeItem('user');
}

function register(user) {

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    };

    return fetch('user/register', requestOptions).then(handleResponse);
}

function reset(user) {

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    };

    return fetch('user/recover', requestOptions).then(handleResponse);
}

function update(user) {

    const requestOptions = {
        method: 'PUT',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    };

    return fetch('/user' + user.id, requestOptions).then(handleResponse);
}

function profile(user) {

    const requestOptions = {
        method: 'GET',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    };

    return fetch('/user' + user.id, requestOptions).then(handleResponse);
}

function handleResponse(response) {

    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}