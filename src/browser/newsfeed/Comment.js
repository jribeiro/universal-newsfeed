
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TimeAgo from 'react-timeago';

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

export class Comment extends Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        body: PropTypes.string,
        author: PropTypes.shape({
            display_name: PropTypes.string,
            avatar: PropTypes.string,
        }).isRequired,
        posted_at: PropTypes.string
    };

    render () {
        const { body, posted_at, author = {}} = this.props.comment;
        const bodyHtml = {
            __html: body
        };
        return (
            <div className="comment row">
                <aside className="avatar two columns">
                    <img src={author.avatar}/>
                    <p className="details">Posted <TimeAgo date={posted_at} /> by {author.display_name}</p>
                </aside>
                <p className="ten columns" dangerouslySetInnerHTML={bodyHtml}></p>
                <hr/>
            </div>
        );
    }
};

export default connect(
    mapStateToProps
)(Comment);
