
import { Schema, arrayOf, normalize } from 'normalizr';

export const messageSchema = new Schema('messages');
export const messageCommentsSchema = new Schema('comments');

messageSchema.define({
    comments: arrayOf(messageCommentsSchema)
});

export const getNormalizedData = (data) => {

    return normalize(data, {
        messages: arrayOf(messageSchema)
    });
};
