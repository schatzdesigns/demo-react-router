import {userConstants} from '../_constants';

export function register(state = {}, action) {

    switch (action.type) {

        case userConstants.REGISTER_REQUEST:
            return {register: true};

        case userConstants.REGISTER_SUCCESS:
            return {};

        case userConstants.REGISTER_FAILURE:
            return {};

        default:
            return state
    }
}
