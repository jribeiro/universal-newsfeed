
import fetch from 'isomorphic-fetch';
import { Message, Comment } from './records';
import { getNormalizedData } from './schemas';
import { Map, List } from 'immutable';

let data;

export function toImmutable ({ result: { messages: msgIds }, entities: { messages, comments} }) {
    return Map({
        result: Map({
            messages: List(msgIds)
        }),
        entities: Map({
            messages: toImmutableMessages (msgIds, messages),
            comments: toImmutableComments (comments)
        })
    });
}

export function toImmutableMessages (msgIds, messages) {
    return Map(msgIds.map(id => [id, new Message(messages[id])]));
}

export function toImmutableComments (comments) {
    return Map(Object.keys(comments).map(id => [id, new Comment(comments[id])]))
}

/**
 *
 *
 * @note there's no assumptions on the data volatility or other update mechanist so we just poll the server for each request
 * @param logger
 */
export async function getMessages ({ logger = console }) {
    if (!data) {
        try {
            // request
            const response = await fetch('https://s3-eu-west-1.amazonaws.com/streetlife-coding-challenge/newsfeed.json');
            // parsing
            data = toImmutable(getNormalizedData(await response.json()));
        } catch (error) {
            logger.error('error: ', error);
        }
    }
    return data;
}

export async function getCommentsFromCache ({ logger = console, params: { msgId } }) {
    if (!data) {
        await getMessages(logger);
    }

    const comments = data.getIn(['entities', 'messages', msgId, 'comments']) || [];
    return Map(comments
        .map(id => [id, data.getIn(['entities', 'comments', id])])
    );
}

export async function getComments (msgId) {
    try {
        // request
        const response = await fetch(`/message/${msgId}/comments`);
        // parsing
        return toImmutableComments(await response.json());
    } catch (error) {
        logger.error('error: ', error);
    }
    return Map({});
}
