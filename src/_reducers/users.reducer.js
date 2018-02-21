import {userConstants} from '../_constants';

export function users(state = {}, action) {

    switch (action.type) {

        case userConstants.GET_USERS_REQUEST:
            return {
                loading: true
            };

        case userConstants.GET_USERS_SUCCESS:
            return {
                user: action.user
            };

        case userConstants.GET_USERS_FAILURE:
            return {
                error: action.error
            };

        default:
            return state
    }
}