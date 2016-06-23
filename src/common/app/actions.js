
import { getComments } from '../../common/newsfeed/service';

export const ADD_COMMENTS = 'ADD_COMMENTS';
export const LOAD_COMMENTS = 'LOADING_COMMENTS';
export const SHOW_COMMENTS = 'SHOW_COMMENTS';

/**
 * Action dispatched to load the comments for a given message id
 * @param {String} msgId
 * @returns {{type: string, msgId: string}}
 */
export const loadingComments = (msgId) => {
    return {
        type: LOAD_COMMENTS,
        msgId
    };
};

/**
 * Action for adding newly fetched comments to the state
 * @param {String} msgId
 * @param {Object} comments
 * @returns {{type: String, msgId: String, comments: Object}}
 */
export const addComments = (msgId, comments) => {
    return {
        type: ADD_COMMENTS,
        msgId,
        comments
    };
};

/**
 * Action to trigger the display of comments
 * @param {String} msgId
 * @returns {{type: String, msgId: String}}
 */
export const showComments = (msgId) => {
    return {
        type: SHOW_COMMENTS,
        msgId
    };
};

/**
 * Action which checks wether the required message comments are available in the state and triggers
 * the action to request them if not
 * @param {String} msgId
 * @returns {function()}
 */
export function fetchCommentsIfNeeded (msgId) {
    return (dispatch, getState) => {
        if (shouldFetchComments(getState(), msgId)) {
            fetchComments(dispatch, msgId);
            return dispatch(loadingComments(msgId))
        } else {
            // Let the calling code know there's nothing to wait for.
            return dispatch(showComments(msgId));
        }
    };
}

/**
 * Checks if all the message comments are available on the state
 * @param state
 * @param msgId
 * @returns {boolean}
 */
function shouldFetchComments (state, msgId) {
    return !state
        .getIn(['entities', 'messages', msgId, 'comments'])
        .every(id => state.getIn(['entities', 'comments', id]));
}

/**
 * Fetches the comments for the remote server
 * @param dispatch
 * @param msgId
 */
export async function fetchComments (dispatch, msgId) {
    try {
        // request
        dispatch(addComments(msgId, await getComments(msgId)));
        dispatch(showComments(msgId));
    } catch (error) {
        console.error('error: ', error);
    }
}
