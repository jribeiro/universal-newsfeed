
import React, { PropTypes, Component } from 'react';
import Comment from './Comment';
import { connect } from 'react-redux';
import TimeAgo from 'react-timeago'

/**
 * Assigns the message entity to the properties
 * @param {Object} state 
 * @param {String} id Message id
 * @returns {Object}
 */
const mapStateToProps = (state, {id}) => {
    let message = state.getIn(['entities', 'messages', id]) || {};
    return {
        message
    };
};

export default class Message extends Component {

    static propTypes = {
        onClick: PropTypes.func.isRequired,
        message: PropTypes.shape({
            id: PropTypes.string.isRequired,
            subject: PropTypes.string.isRequired,
            body: PropTypes.string,
            posted_at: PropTypes.string,
            topics: PropTypes.array,
            tags: PropTypes.array,
            comments: PropTypes.array,
            visibleComments: PropTypes.array
        })
    };

    render (bla = {}) {
        const {
            onClick,
            message: {
                subject,
                body,
                posted_at,
                topics,
                tags,
                comments = [],
                showComments
            }
        } = this.props;
        const bodyHtml = {
            __html: body
        };

        let commentFragment = '';
        if (showComments) {
            commentFragment = comments.map(id =>
                <Comment
                    key={id}
                    id={id}
                />
            )
        } else if (comments.length > 0){
            commentFragment = <button onClick={onClick}>View Comments</button>;
        }

        return (<article>
            <h2>{subject}</h2>
            <TimeAgo date={posted_at} />
            <p dangerouslySetInnerHTML={bodyHtml}></p>
            {commentFragment}
        </article>);
    }
};

export default connect(
    mapStateToProps
)(Message);
