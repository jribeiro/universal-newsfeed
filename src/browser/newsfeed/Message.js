
import React, { PropTypes, Component } from 'react';
import Comment from './Comment';
import { connect } from 'react-redux';
import TimeAgo from 'react-timeago';

/**
 * Assigns the message entity to the properties
 * @param {Object} state
 * @param {String} id Message id
 * @returns {Object}
 */
export const mapStateToProps = (state, {id}) => {
    let message = state.getIn(['entities', 'messages', id]) || {};
    return {
        message
    };
};

export class Message extends Component {

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
            visibleComments: PropTypes.array,
            author: PropTypes.shape({
                display_name: PropTypes.string,
                avatar: PropTypes.string,
            }).isRequired,
        })
    };

    render (bla = {}) {
        const {
            onClick,
            message: {
                id,
                subject,
                body,
                posted_at,
                topics,
                tags,
                comments = [],
                showComments,
                author
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
            commentFragment = <a className="view-comments" onClick={onClick}>View {comments.length} Comments</a>;
        }

        return (
            <article>
                <img className="banner" src={`http://lorempixel.com/1000/600/people/${id}`}/>
                <h2>{subject}</h2>
                <p className="details">Posted <TimeAgo date={posted_at} /> by {author.display_name}</p>
                <div className="content" dangerouslySetInnerHTML={bodyHtml}></div>
                {commentFragment}
            </article>
        );
    }
};

export default connect(
    mapStateToProps
)(Message);
