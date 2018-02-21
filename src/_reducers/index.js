import {combineReducers} from 'redux';

import {login} from './auth.login.reducer';
import {register} from './auth.register.reducer';
import {reset} from './auth.reset.reducer';
import {alert} from './alert.reducer';

const rootReducer = combineReducers({
    login,
    register,
    reset,
    alert
});

export default rootReducer;