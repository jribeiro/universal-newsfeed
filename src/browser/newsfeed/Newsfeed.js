
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { fetchCommentsIfNeeded } from '../../common/app/actions';
import Message from './Message';

/**
 * Assigns the array of message ids to be displayed on the newsfeed
 * @param {Object} state
 * @returns {{messages: []}}
 */
const mapStateToProps = (state) => {
    return {
        messages: state.getIn(['result', 'messages'])
    };
};

/**
 * Actions to be used by this component
 * @param {Function} dispatch
 * @returns {{onShowCommentsClick: (function())}}
 */
const mapDispatchToProps = (dispatch) => {
    return {
        onShowCommentsClick: (id) => {
            dispatch(fetchCommentsIfNeeded(id))
        }
    };
};

class Newsfeed extends Component {

    static propTypes = {
        messages: PropTypes.object.isRequired,
        onShowCommentsClick: PropTypes.func.isRequired
    };

    render () {
        const { messages, onShowCommentsClick } = this.props;
        return(
            <section>
                {messages.map(id =>
                    <Message
                        key={id}
                        id={id}
                        onClick={() => onShowCommentsClick(id)}
                    />
                )}
            </section>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Newsfeed);
