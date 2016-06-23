
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Assigns the comment object to the properties
 * @param {Object} state
 * @param {String} id Comment ID
 * @returns {Object}
 */
const mapStateToProps = (state, {id}) => {
    let comment = state.getIn(['entities', 'comments', id]) || {};
    return {
        comment
    };
};

export default class Comment extends Component {
    
    static propTypes = {
        id: PropTypes.string.isRequired,
        body: PropTypes.string,
        posted_at: PropTypes.string
    };
    
    render () {
        const { body, postedAt } = this.props.comment;
        const bodyHtml = {
            __html: body
        };
        return (
            <article>
                <p dangerouslySetInnerHTML={bodyHtml}></p>
                <time>{postedAt}</time>
            </article>
        );
    }
};

export default connect(
    mapStateToProps
)(Comment);
