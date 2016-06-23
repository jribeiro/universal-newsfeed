
import {SHOW_COMMENTS, LOAD_COMMENTS, ADD_COMMENTS, ADD_MESSAGES} from './actions';

/**
 * Actions mapping. action: fn
 */
const actions = {
    [ADD_COMMENTS]: setData,
    [SHOW_COMMENTS]: showComments,
    [LOAD_COMMENTS]: loadComments
};

/**
 * Merges the comments fetched with the state
 * @param state
 * @param comments
 * @returns {*}
 */
export function setData (state, { comments }) {
    return state.mergeDeep({
        entities: {
            comments
        }
    });
}

export function loadComments (state, { msgId }) {
    return state.setIn(['entities', 'messages', msgId, 'isLoading'], true);
}

export function showComments (state, { msgId }) {
    return state.setIn(['entities', 'messages', msgId, 'showComments'], true);
}

/**
 * Application reducer. Calculates state mutation based on an action. PURE FUNCTION.
 * @param {Object} state Application state
 * @param {Object} action Action which is trigerring the application state change
 * @returns {Object} New state
 */
export default function (state = {}, action) {
    return actions[action.type] ? actions[action.type](state, action) : state;
}
